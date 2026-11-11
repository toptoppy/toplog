'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { api } from '@/lib/api'
import MediaVaultDrawer from './MediaVaultDrawer'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
  Loader2,
  Globe,
  Maximize2,
  Minimize2,
  Eye,
  Edit3,
  FolderOpen,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Target,
  Check,
} from 'lucide-react'

interface TipTapEditorProps {
  content: string
  onChange: (html: string, json: string) => void
  placeholder?: string
  onImageUpload?: () => void
  embedded?: boolean
  blogId?: number
  onWordCountChange?: (words: number, minutes: number) => void
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Write your story...',
  onImageUpload,
  embedded = false,
  blogId,
  onWordCountChange,
}: TipTapEditorProps) {
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showVaultDrawer, setShowVaultDrawer] = useState(false)
  const [isZenMode, setIsZenMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [wordCount, setWordCount] = useState(0)
  const [readingMinutes, setReadingMinutes] = useState(1)

  // Word Count Goal State
  const [wordGoal, setWordGoal] = useState<number>(0)
  const [customGoalInput, setCustomGoalInput] = useState('')
  const [showGoalMenu, setShowGoalMenu] = useState(false)
  const goalMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const savedGoal = localStorage.getItem('toplog_word_goal')
      if (savedGoal) {
        setWordGoal(Number(savedGoal) || 0)
      }
    } catch {}
  }, [])

  const setAndSaveGoal = (target: number) => {
    setWordGoal(target)
    try {
      if (target > 0) {
        localStorage.setItem('toplog_word_goal', String(target))
      } else {
        localStorage.removeItem('toplog_word_goal')
      }
    } catch {}
    setShowGoalMenu(false)
  }

  const percent = wordGoal > 0 ? Math.min(100, Math.round((wordCount / wordGoal) * 100)) : 0
  const isGoalReached = wordGoal > 0 && wordCount >= wordGoal

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (goalMenuRef.current && !goalMenuRef.current.contains(e.target as Node)) {
        setShowGoalMenu(false)
      }
    }
    if (showGoalMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showGoalMenu])

  // Floating Bubble Menu State
  const [bubblePos, setBubblePos] = useState<{ top: number; left: number } | null>(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [isImageSelected, setIsImageSelected] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<any>(null)

  const uploadAndInsertImage = async (file: File) => {
    if (!blogId) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          editorRef.current?.chain().focus().setImage({ src: reader.result, alt: file.name }).run()
        }
      }
      reader.readAsDataURL(file)
      return
    }

    setUploadingImage(true)
    try {
      const res = await api.media.upload(blogId, file)
      editorRef.current?.chain().focus().setImage({ src: res.url, alt: file.name }).run()
    } catch (err: any) {
      alert(err.message || 'Image upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || [])
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile()
            if (file) {
              event.preventDefault()
              uploadAndInsertImage(file)
              return true
            }
          }
        }
        return false
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0]
          if (file.type.indexOf('image') === 0) {
            event.preventDefault()
            uploadAndInsertImage(file)
            return true
          }
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const json = JSON.stringify(editor.getJSON())
      onChange(html, json)

      const text = editor.getText()
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      const minutes = Math.max(1, Math.ceil(words / 200))
      setWordCount(words)
      setReadingMinutes(minutes)
      onWordCountChange?.(words, minutes)
    },
  })

  useEffect(() => {
    editorRef.current = editor
    if (editor) {
      const text = editor.getText()
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      const minutes = Math.max(1, Math.ceil(words / 200))
      setWordCount(words)
      setReadingMinutes(minutes)
      onWordCountChange?.(words, minutes)
    }
  }, [editor, onWordCountChange])

  // Track selection for the floating bubble menu
  useEffect(() => {
    if (!editor) return

    const updateBubble = () => {
      const { from, to, empty } = editor.state.selection
      const hasImageActive = editor.isActive('image')

      if (empty && !hasImageActive) {
        setIsTextSelected(false)
        setIsImageSelected(false)
        setBubblePos(null)
        return
      }

      const { view } = editor
      const start = view.coordsAtPos(from)
      const end = view.coordsAtPos(to)

      // Center the menu above selection
      const left = (start.left + end.right) / 2
      const top = Math.min(start.top, end.top) - 10

      setBubblePos({ top, left })
      setIsTextSelected(!hasImageActive && !empty)
      setIsImageSelected(hasImageActive)
    }

    editor.on('selectionUpdate', updateBubble)

    return () => {
      editor.off('selectionUpdate', updateBubble)
    }
  }, [editor])

  // Zen Mode Keyboard Shortcuts: Esc to exit, Cmd+Shift+F to toggle
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false)
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        setIsZenMode((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZenMode])

  if (!editor) {
    return (
      <div className="flex h-64 items-center justify-center border border-zinc-200 rounded-xl bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
      </div>
    )
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImageByUrl = () => {
    const url = window.prompt('Enter Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadAndInsertImage(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageClick = () => {
    if (onImageUpload) {
      onImageUpload()
    } else if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      addImageByUrl()
    }
  }

  // Floating Selection Bubble Menu
  const floatingBubbleMenu =
    bubblePos && activeTab === 'edit' ? (
      isImageSelected ? (
        <div
          data-bubble-menu
          style={{
            position: 'fixed',
            top: `${bubblePos.top}px`,
            left: `${bubblePos.left}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="z-50 flex items-center gap-0.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1 text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 select-none"
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().updateAttributes('image', { class: 'mr-auto text-left' }).run()
            }}
            className="rounded p-1.5 hover:bg-zinc-800 transition text-zinc-300 hover:text-white"
            title="Align Left"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().updateAttributes('image', { class: 'mx-auto block text-center' }).run()
            }}
            className="rounded p-1.5 hover:bg-zinc-800 transition text-zinc-300 hover:text-white"
            title="Align Center"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().updateAttributes('image', { class: 'ml-auto text-right' }).run()
            }}
            className="rounded p-1.5 hover:bg-zinc-800 transition text-zinc-300 hover:text-white"
            title="Align Right"
          >
            <AlignRight className="h-3.5 w-3.5" />
          </button>
          <div className="h-3.5 w-px bg-zinc-700 mx-0.5" />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteSelection().run()
            }}
            className="rounded p-1.5 hover:bg-red-950/80 transition text-red-400 hover:text-red-300"
            title="Delete Image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : isTextSelected ? (
        <div
          data-bubble-menu
          style={{
            position: 'fixed',
            top: `${bubblePos.top}px`,
            left: `${bubblePos.left}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="z-50 flex items-center gap-0.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1 text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 select-none"
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBold().run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('bold') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Bold (Cmd+B)"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleItalic().run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('italic') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Italic (Cmd+I)"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleStrike().run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('strike') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleCode().run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('code') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </button>

          <div className="h-3.5 w-px bg-zinc-700 mx-0.5" />

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('heading', { level: 2 }) ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Heading 2"
          >
            <Heading2 className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('heading', { level: 3 }) ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Heading 3"
          >
            <Heading3 className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBlockquote().run()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('blockquote') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Quote"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              setLink()
            }}
            className={`rounded p-1.5 hover:bg-zinc-800 transition ${
              editor.isActive('link') ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'
            }`}
            title="Link"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null
    ) : null

  const toolbarContent = (
    <div className="flex flex-wrap items-center justify-between gap-1 border-b border-zinc-200/80 bg-zinc-50/70 p-2 text-zinc-600">
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('bold') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Bold (Cmd+B)"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('italic') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Italic (Cmd+I)"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('strike') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('code') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-zinc-200 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-zinc-200 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('bulletList') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('orderedList') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('blockquote') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
            editor.isActive('link') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
          }`}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <button
          type="button"
          disabled={uploadingImage}
          onClick={handleImageClick}
          className="rounded p-1.5 hover:bg-zinc-200/80 transition flex items-center gap-1 disabled:opacity-50"
          title="Upload Image"
        >
          {uploadingImage ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={addImageByUrl}
          className="rounded p-1.5 hover:bg-zinc-200/80 transition"
          title="Insert Image via URL"
        >
          <Globe className="h-4 w-4 text-zinc-500" />
        </button>

        {blogId && (
          <button
            type="button"
            onClick={() => setShowVaultDrawer(true)}
            className="rounded p-1.5 hover:bg-zinc-200/80 transition flex items-center gap-1 text-zinc-700 hover:text-blue-600"
            title="Open Media Vault"
          >
            <FolderOpen className="h-4 w-4 text-blue-600" />
            <span className="hidden md:inline text-xs font-medium">Vault</span>
          </button>
        )}

        <div className="h-4 w-px bg-zinc-200 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="rounded p-1.5 hover:bg-zinc-200/80 transition disabled:opacity-30"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="rounded p-1.5 hover:bg-zinc-200/80 transition disabled:opacity-30"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Right Toolbar Controls: Word count, Goal tracker, Preview toggle, Zen mode */}
      <div className="flex items-center gap-2">
        <div className="relative" ref={goalMenuRef}>
          <button
            type="button"
            onClick={() => setShowGoalMenu(!showGoalMenu)}
            className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded-md border transition ${
              wordGoal > 0
                ? isGoalReached
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-indigo-200 bg-indigo-50/60 text-indigo-700'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
            }`}
            title="Word count & writing goals"
          >
            {wordGoal > 0 ? (
              <>
                <div className="relative flex items-center justify-center h-3.5 w-3.5">
                  <svg className="h-3.5 w-3.5 -rotate-90" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-200" />
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke={isGoalReached ? '#10B981' : '#6366F1'}
                      strokeWidth="2.5"
                      strokeDasharray={50.26}
                      strokeDashoffset={50.26 - (50.26 * Math.min(100, percent)) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
                <span>
                  {wordCount}/{wordGoal} w ({percent}%)
                </span>
                {isGoalReached && <Check className="h-3 w-3 text-emerald-600" />}
              </>
            ) : (
              <>
                <Target className="h-3 w-3 text-zinc-400" />
                <span>{wordCount} words · {readingMinutes} min</span>
              </>
            )}
          </button>

          {/* Goal Popover */}
          {showGoalMenu && (
            <div className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-indigo-600" />
                  Writing Goal
                </span>
                {wordGoal > 0 && (
                  <button
                    type="button"
                    onClick={() => setAndSaveGoal(0)}
                    className="text-[10px] text-zinc-400 hover:text-red-600 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="py-2.5">
                <p className="text-[11px] text-zinc-500 mb-2">Preset targets:</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[300, 500, 1000, 1500, 2000, 3000].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAndSaveGoal(t)}
                      className={`text-[11px] py-1 px-1.5 rounded border transition text-center font-mono ${
                        wordGoal === t
                          ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-900'
                          : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      {t.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="Custom target"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(e.target.value)}
                  className="w-full text-xs rounded border border-zinc-200 px-2 py-1 font-mono focus:border-zinc-900 focus:outline-none"
                  min="50"
                  max="100000"
                />
                <button
                  type="button"
                  disabled={!customGoalInput || Number(customGoalInput) <= 0}
                  onClick={() => {
                    const n = Number(customGoalInput)
                    if (n > 0) {
                      setAndSaveGoal(n)
                      setCustomGoalInput('')
                    }
                  }}
                  className="rounded bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-40"
                >
                  Set
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-medium transition ${
              activeTab === 'edit'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Edit3 className="h-3 w-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-medium transition ${
              activeTab === 'preview'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Eye className="h-3 w-3" />
            <span>Preview</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsZenMode(!isZenMode)}
          className={`rounded-lg border p-1.5 transition ${
            isZenMode
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
          title={isZenMode ? 'Exit Zen Mode (Esc)' : 'Zen Focus Mode (Cmd+Shift+F)'}
        >
          {isZenMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )

  const uploadBanner = uploadingImage && (
    <div className="flex items-center gap-2 bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs text-blue-700 font-medium animate-pulse">
      <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600 shrink-0" />
      <span>Uploading asset to TopLog Media Vault...</span>
    </div>
  )

  const mediaVaultDrawer = (
    <MediaVaultDrawer
      isOpen={showVaultDrawer}
      onClose={() => setShowVaultDrawer(false)}
      blogId={blogId}
      onInsertImage={(url, alt) => {
        editor.chain().focus().setImage({ src: url, alt }).run()
      }}
    />
  )

  const contentRenderer = activeTab === 'preview' ? (
    <div className="prose max-w-none text-zinc-900 leading-relaxed font-serif text-lg py-4">
      <div
        dangerouslySetInnerHTML={{
          __html: editor.getHTML() || '<p class="text-zinc-400 italic">No content to preview.</p>',
        }}
      />
    </div>
  ) : (
    <EditorContent editor={editor} />
  )

  // Fullscreen Zen Mode Portal
  if (isZenMode) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto animate-in fade-in duration-200">
        {floatingBubbleMenu}
        {uploadBanner}
        {/* Floating Zen Header Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200/80 bg-white/90 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsZenMode(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition shadow-xs"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Exit Zen Mode</span>
              <kbd className="rounded border border-zinc-300 bg-white px-1 font-mono text-[10px] text-zinc-500">
                Esc
              </kbd>
            </button>
            {wordGoal > 0 ? (
              <span className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md border ${
                isGoalReached
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-indigo-200 bg-indigo-50/60 text-indigo-700'
              }`}>
                <div className="relative flex items-center justify-center h-3.5 w-3.5">
                  <svg className="h-3.5 w-3.5 -rotate-90" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-200" />
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke={isGoalReached ? '#10B981' : '#6366F1'}
                      strokeWidth="2.5"
                      strokeDasharray={50.26}
                      strokeDashoffset={50.26 - (50.26 * Math.min(100, percent)) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
                <span>
                  {wordCount} / {wordGoal} words ({percent}%)
                </span>
                {isGoalReached && <Check className="h-3.5 w-3.5 text-emerald-600" />}
              </span>
            ) : (
              <span className="font-mono text-xs text-zinc-400">
                {wordCount} words · {readingMinutes} min read
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                  activeTab === 'edit'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Edit3 className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                  activeTab === 'preview'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Eye className="h-3 w-3" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Zen Writing Canvas */}
        <div className="mx-auto max-w-3xl w-full px-6 py-12 flex-1">
          {toolbarContent}
          <div className="mt-6 min-h-[70vh] pb-32">
            {contentRenderer}
          </div>
        </div>
        {mediaVaultDrawer}
      </div>
    )
  }

  if (embedded) {
    return (
      <div className="w-full flex flex-col">
        {floatingBubbleMenu}
        {uploadBanner}
        {toolbarContent}
        <div className="p-6 min-h-[460px]">
          {contentRenderer}
        </div>
        {mediaVaultDrawer}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-200/90 bg-white shadow-xs overflow-hidden focus-within:border-zinc-300">
      {floatingBubbleMenu}
      {uploadBanner}
      {toolbarContent}
      <div className="p-6 min-h-[420px]">
        {contentRenderer}
      </div>
      {mediaVaultDrawer}
    </div>
  )
}
