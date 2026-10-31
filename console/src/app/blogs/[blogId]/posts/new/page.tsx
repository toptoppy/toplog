'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostStatus } from '@/lib/types'
import TipTapEditor from '@/components/editor/TipTapEditor'
import { ChevronLeft, Save, Send } from 'lucide-react'

export default function NewPostPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const router = useRouter()

  const [blog, setBlog] = useState<Blog | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [languageCode, setLanguageCode] = useState('en')
  const [description, setDescription] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [contentJson, setContentJson] = useState('{}')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPage, setIsPage] = useState(false)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.blogs.get(blogId).then((b) => {
      setBlog(b)
      setLanguageCode(b.defaultLanguage)
    })
  }, [blogId])

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      )
    }
  }

  const handleSave = async (status: PostStatus) => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!slug.trim()) {
      setError('Slug is required')
      return
    }

    setError('')
    setSaving(true)

    try {
      const created = await api.posts.create(blogId, {
        title,
        slug,
        languageCode,
        description,
        contentHtml,
        contentJson,
        isFeatured,
        isPage,
        featuredImageUrl: featuredImageUrl || undefined,
        status,
      })
      router.push(`/blogs/${blogId}/posts/${created.id}`)
    } catch (err: any) {
      setError(err.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <Link
          href={`/blogs/${blogId}/posts`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Posts
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Save className="h-4 w-4 text-slate-500" />
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('PUBLISHED')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="h-4 w-4" />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Main Post Title Input */}
      <input
        type="text"
        placeholder="Post Title..."
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full bg-transparent text-3xl font-extrabold text-slate-900 placeholder:text-slate-300 focus:outline-none mb-4"
      />

      {/* Slug & Metadata Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-400">Slug: /</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            placeholder="my-post-url"
            className="rounded border border-slate-200 px-2 py-0.5 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-400">Lang:</span>
          <input
            type="text"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value.toLowerCase())}
            className="w-12 rounded border border-slate-200 px-2 py-0.5 text-xs font-mono font-medium text-slate-800 uppercase focus:outline-none focus:border-blue-500"
          />
        </div>

        <label className="flex items-center gap-1.5 cursor-pointer ml-auto">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-medium text-slate-700">Featured Post</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isPage}
            onChange={(e) => setIsPage(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-medium text-slate-700">Static Page</span>
        </label>
      </div>

      {/* TipTap Rich Text Editor */}
      <TipTapEditor
        content={contentHtml}
        onChange={(html, json) => {
          setContentHtml(html)
          setContentJson(json)
        }}
      />
    </div>
  )
}
