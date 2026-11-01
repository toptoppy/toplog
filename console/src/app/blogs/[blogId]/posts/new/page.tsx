'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostStatus } from '@/lib/types'
import TipTapEditor from '@/components/editor/TipTapEditor'
import { ChevronLeft, Save, Send, Star } from 'lucide-react'

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
    <div className="w-full p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/80">
        <Link
          href={`/blogs/${blogId}/posts`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Posts</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:opacity-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-zinc-400" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('PUBLISHED')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black disabled:opacity-50 transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Publish Post</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3.5 text-xs font-mono text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Unified Editor Card - Aligned Side to Side */}
      <div className="w-full rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Title Input */}
        <div className="p-6 border-b border-zinc-100">
          <input
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full bg-transparent text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:outline-none"
          />

          {/* Slug & Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-zinc-100 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-zinc-400">
              <span>Slug: /</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                placeholder="my-post-url"
                className="font-mono text-xs text-zinc-800 bg-transparent focus:outline-none focus:underline"
              />
            </div>

            <div className="flex items-center gap-1.5 font-mono text-zinc-400">
              <span>Lang:</span>
              <input
                type="text"
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value.toLowerCase())}
                className="w-10 rounded border border-zinc-200 px-1.5 py-0.5 text-xs font-mono uppercase font-semibold text-zinc-800 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer ml-auto select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <span className="text-xs font-medium text-zinc-700 flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> Featured Post
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isPage}
                onChange={(e) => setIsPage(e.target.checked)}
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <span className="text-xs font-medium text-zinc-700">Static Page</span>
            </label>
          </div>
        </div>

        {/* TipTap Rich Text Editor embedded flush */}
        <TipTapEditor
          content={contentHtml}
          embedded={true}
          onChange={(html, json) => {
            setContentHtml(html)
            setContentJson(json)
          }}
        />
      </div>
    </div>
  )
}
