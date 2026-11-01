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
  embedded?: boolean
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Write your story...',
  onImageUpload,
  embedded = false,
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

  const toolbarContent = (
    <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200/80 bg-zinc-50/70 p-2 text-zinc-600">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
          editor.isActive('bold') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
        }`}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded p-1.5 hover:bg-zinc-200/80 transition ${
          editor.isActive('italic') ? 'bg-zinc-200 text-zinc-900 font-bold' : ''
        }`}
        title="Italic"
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

      <div className="h-4 w-px bg-zinc-200 mx-1"></div>

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

      <button
        type="button"
        onClick={onImageUpload || addImageByUrl}
        className="rounded p-1.5 hover:bg-zinc-200/80 transition"
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </button>

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
  )

  if (embedded) {
    return (
      <div className="w-full flex flex-col">
        {toolbarContent}
        <div className="p-6 min-h-[460px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-200/90 bg-white shadow-sm overflow-hidden focus-within:border-zinc-300">
      {toolbarContent}
      <div className="p-6 min-h-[420px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
