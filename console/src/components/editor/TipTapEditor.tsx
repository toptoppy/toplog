'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
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
} from 'lucide-react'

interface TipTapEditorProps {
  content: string
  onChange: (html: string, json: string) => void
  placeholder?: string
  onImageUpload?: () => void
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Write your story...',
  onImageUpload,
}: TipTapEditorProps) {
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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const json = JSON.stringify(editor.getJSON())
      onChange(html, json)
    },
  })

  if (!editor) {
    return (
      <div className="flex h-64 items-center justify-center border border-slate-200 rounded-xl bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden focus-within:border-slate-300">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/70 p-2 text-slate-600">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('bold') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('italic') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('strike') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('code') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('bulletList') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('orderedList') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('blockquote') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1"></div>

        <button
          type="button"
          onClick={setLink}
          className={`rounded p-1.5 hover:bg-slate-200 transition ${
            editor.isActive('link') ? 'bg-slate-200 text-blue-600 font-bold' : ''
          }`}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onImageUpload || addImageByUrl}
          className="rounded p-1.5 hover:bg-slate-200 transition"
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="rounded p-1.5 hover:bg-slate-200 transition disabled:opacity-30"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="rounded p-1.5 hover:bg-slate-200 transition disabled:opacity-30"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Main Editing Area */}
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
