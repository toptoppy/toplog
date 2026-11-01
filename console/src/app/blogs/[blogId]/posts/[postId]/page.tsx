'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, Post, PostStatus, PostVariant, PostRevision, AiStatus } from '@/lib/types'
import TipTapEditor from '@/components/editor/TipTapEditor'
import {
  ChevronLeft,
  Save,
  Send,
  Plus,
  ExternalLink,
  Trash2,
  Globe,
  Star,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Sparkles,
  Mail,
  Clock,
  History,
  RotateCcw,
  X,
  ArrowRight,
} from 'lucide-react'

export default function PostStudioPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const postId = Number(params.postId)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [blog, setBlog] = useState<Blog | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  // Active Variant State
  const [activeLang, setActiveLang] = useState<string>('en')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [contentJson, setContentJson] = useState('{}')
  const [status, setStatus] = useState<PostStatus>('DRAFT')

  // Base Post Settings State
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPage, setIsPage] = useState(false)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)

  // Add Variant Modal State
  const [showAddLangModal, setShowAddLangModal] = useState(false)
  const [newLangCode, setNewLangCode] = useState('')

  // AI Assistant State
  const [aiStatus, setAiStatus] = useState<AiStatus | null>(null)
  const [showAiTranslateModal, setShowAiTranslateModal] = useState(false)
  const [targetAiLang, setTargetAiLang] = useState('')
  const [translating, setTranslating] = useState(false)
  const [generatingSeo, setGeneratingSeo] = useState(false)
  const [seoSuggestions, setSeoSuggestions] = useState<{
    titles: string[]
    metaDescription: string
    tags: string[]
  } | null>(null)

  // Newsletter Dispatch State
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [newsletterSubject, setNewsletterSubject] = useState('')
  const [sendingNewsletter, setSendingNewsletter] = useState(false)

  // Scheduling State
  const [scheduledAt, setScheduledAt] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleDateTime, setScheduleDateTime] = useState('')

  // Revision History State
  const [showRevisionsModal, setShowRevisionsModal] = useState(false)
  const [revisions, setRevisions] = useState<PostRevision[]>([])
  const [loadingRevisions, setLoadingRevisions] = useState(false)
  const [selectedRevision, setSelectedRevision] = useState<PostRevision | null>(null)
  const [restoringRevision, setRestoringRevision] = useState(false)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPostData = async () => {
    try {
      const [b, p] = await Promise.all([
        api.blogs.get(blogId),
        api.posts.get(blogId, postId),
      ])
      setBlog(b)
      setPost(p)
      setIsFeatured(p.isFeatured)
      setIsPage(p.isPage)
      setFeaturedImageUrl(p.featuredImageUrl || '')

      // Select default or first variant
      const defaultVariant =
        p.variants.find((v) => v.languageCode === b.defaultLanguage) ||
        p.variants[0]

      if (defaultVariant) {
        selectVariant(defaultVariant)
      }

      api.ai.status(blogId).then(setAiStatus).catch(console.error)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPostData()
  }, [blogId, postId])

  const selectVariant = (variant: PostVariant) => {
    setActiveLang(variant.languageCode)
    setTitle(variant.title)
    setSlug(variant.slug)
    setDescription(variant.description || '')
    setContentHtml(variant.contentHtml || '')
    setContentJson(variant.contentJson || '{}')
    setStatus(variant.status)
    setScheduledAt(variant.scheduledAt || null)
  }

  const loadRevisions = async () => {
    setLoadingRevisions(true)
    try {
      const list = await api.revisions.list(blogId, postId, activeLang)
      setRevisions(list)
      setSelectedRevision(list[0] || null)
    } catch (err: any) {
      setError(err.message || 'Failed to load revisions')
    } finally {
      setLoadingRevisions(false)
    }
  }

  const handleRestoreRevision = async () => {
    if (!selectedRevision) return
    if (!confirm(`Restore revision from ${new Date(selectedRevision.createdAt).toLocaleString()}? This will replace your current editor content.`)) {
      return
    }

    setRestoringRevision(true)
    setError('')
    try {
      const restored = await api.revisions.restore(blogId, postId, activeLang, selectedRevision.id)
      selectVariant(restored)
      setShowRevisionsModal(false)
      setMessage(`Restored revision snapshot successfully!`)
    } catch (err: any) {
      setError(err.message || 'Failed to restore revision')
    } finally {
      setRestoringRevision(false)
    }
  }

  const handleSaveVariant = async (overrideStatus?: PostStatus) => {
    setError('')
    setMessage('')
    setSaving(true)

    const nextStatus = overrideStatus || status

    try {
      // 1. Update Post Metadata
      await api.posts.updateBase(blogId, postId, {
        isFeatured,
        isPage,
        featuredImageUrl: featuredImageUrl || undefined,
      })

      // 2. Upsert Variant
      await api.posts.updateVariant(blogId, postId, activeLang, {
        title,
        slug,
        description,
        contentHtml,
        contentJson,
        status: nextStatus,
        scheduledAt: nextStatus === 'SCHEDULED' ? scheduledAt : undefined,
      })

      setStatus(nextStatus)
      setMessage('Post saved successfully!')

      // Refresh post
      const refreshedPost = await api.posts.get(blogId, postId)
      setPost(refreshedPost)
    } catch (err: any) {
      setError(err.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleAddLanguageVariant = () => {
    const lang = newLangCode.trim().toLowerCase()
    if (!lang) return

    if (post?.variants.some((v) => v.languageCode === lang)) {
      alert(`Variant for '${lang.toUpperCase()}' already exists.`)
      return
    }

    setActiveLang(lang)
    setTitle(`${title} (${lang.toUpperCase()})`)
    setSlug(`${slug}-${lang}`)
    setStatus('DRAFT')
    setShowAddLangModal(false)
    setNewLangCode('')
  }

  const handleAiTranslate = async () => {
    const target = targetAiLang.trim().toLowerCase()
    if (!target) return

    if (post?.variants.some((v) => v.languageCode === target)) {
      alert(`Variant for '${target.toUpperCase()}' already exists. Select it from the tabs above.`)
      return
    }

    setError('')
    setMessage('')
    setTranslating(true)

    try {
      const translatedVariant = await api.ai.translate(blogId, postId, {
        sourceLanguage: activeLang,
        targetLanguage: target,
      })

      setShowAiTranslateModal(false)
      setTargetAiLang('')
      setMessage(`AI successfully translated post to ${target.toUpperCase()}!`)

      const refreshedPost = await api.posts.get(blogId, postId)
      setPost(refreshedPost)
      selectVariant(translatedVariant)
    } catch (err: any) {
      setError(err.message || 'AI translation failed. Please verify AI_API_KEY.')
    } finally {
      setTranslating(false)
    }
  }

  const handleGenerateSeo = async () => {
    setError('')
    setMessage('')
    setGeneratingSeo(true)

    try {
      const seo = await api.ai.generateSeo(blogId, postId, {
        languageCode: activeLang,
      })

      setSeoSuggestions(seo)
      if (seo.metaDescription) {
        setDescription(seo.metaDescription)
        setMessage('AI generated meta description and title suggestions!')
      }
    } catch (err: any) {
      setError(err.message || 'AI SEO generation failed. Please verify AI_API_KEY.')
    } finally {
      setGeneratingSeo(false)
    }
  }

  const handleSendNewsletter = async () => {
    setSendingNewsletter(true)
    setError('')
    setMessage('')
    try {
      const res = await api.newsletters.sendForPost(blogId, postId, {
        subject: newsletterSubject.trim() || undefined,
      })
      setShowNewsletterModal(false)
      setMessage(res.message)
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch newsletter')
    } finally {
      setSendingNewsletter(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const res = await api.media.upload(blogId, file)
      setFeaturedImageUrl(res.url)
      setMessage('Image uploaded successfully!')
    } catch (err: any) {
      setError(err.message || 'Image upload failed')
    }
  }

  const getPublicUrl = () => {
    if (!blog || typeof window === 'undefined') return '#'
    if (blog.customDomain) return `https://${blog.customDomain}/${slug}`
    const host = window.location.hostname
    const proto = window.location.protocol
    const parts = host.split('.')
    let base = 'localhost'
    if (parts.length > 1 && !host.endsWith('localhost')) {
      base = parts.slice(1).join('.')
    }
    return `${proto}//${blog.subdomain}.${base}/${slug}`
  }

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to permanently delete this post and all its translations?')) return

    try {
      await api.posts.delete(blogId, postId)
      router.push(`/blogs/${blogId}/posts`)
    } catch (err: any) {
      alert(err.message || 'Failed to delete post')
    }
  }

  if (loading || !post || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
          <span className="text-xs font-mono text-zinc-400">Loading editor studio...</span>
        </div>
      </div>
    )
  }

  const livePostUrl = getPublicUrl()

  return (
    <div className="w-full p-8 space-y-6">
      {/* Top Header Bar - Full Width & Aligned */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-zinc-200/80">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/blogs/${blogId}/posts`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition shrink-0"
            title="Back to Posts"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium ${
                status === 'PUBLISHED'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : status === 'SCHEDULED'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === 'PUBLISHED'
                    ? 'bg-emerald-500'
                    : status === 'SCHEDULED'
                    ? 'bg-purple-500'
                    : 'bg-zinc-400'
                }`}
              />
              {status}
            </span>

            {status === 'SCHEDULED' && scheduledAt && (
              <span className="text-[11px] text-purple-600 font-mono">
                Due: {new Date(scheduledAt).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls - Right Aligned */}
        <div className="flex flex-wrap items-center gap-2">
          {status === 'PUBLISHED' && (
            <a
              href={livePostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition"
            >
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
              <span>Live Post</span>
              <ExternalLink className="h-3 w-3 text-zinc-400" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setShowAiTranslateModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition shadow-sm"
            title="Auto-translate to another language with AI"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>AI Translate</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowRevisionsModal(true)
              loadRevisions()
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
            title="Version history and snapshot rollbacks"
          >
            <History className="h-3.5 w-3.5 text-zinc-400" />
            <span>History</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSettingsSidebar(!showSettingsSidebar)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
              showSettingsSidebar
                ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
            }`}
            title="Toggle Post Settings"
          >
            <SettingsIcon className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveVariant('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:opacity-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-zinc-400" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => {
              const d = new Date()
              d.setHours(d.getHours() + 1)
              d.setMinutes(0, 0, 0)
              const isoLocal = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
              setScheduleDateTime(isoLocal)
              setShowScheduleModal(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-sm hover:bg-purple-100 disabled:opacity-50 transition"
          >
            <Clock className="h-3.5 w-3.5 text-purple-600" />
            <span>{status === 'SCHEDULED' ? 'Reschedule' : 'Schedule'}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveVariant('PUBLISHED')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black disabled:opacity-50 transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{status === 'PUBLISHED' ? 'Update Published' : 'Publish'}</span>
          </button>

          {status === 'PUBLISHED' && (
            <button
              type="button"
              onClick={() => {
                setNewsletterSubject(title)
                setShowNewsletterModal(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm hover:bg-blue-100 transition"
              title="Send newsletter campaign to subscribers"
            >
              <Mail className="h-3.5 w-3.5 text-blue-600" />
              <span>Newsletter</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3.5 text-xs font-mono text-red-600 border border-red-200">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg bg-emerald-50 p-3.5 text-xs font-mono text-emerald-700 border border-emerald-200">
          {message}
        </div>
      )}

      {/* Language / Variant Bar - Aligned Width */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center p-1 rounded-lg bg-zinc-100 border border-zinc-200/80 gap-1 overflow-x-auto">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 px-2">
            Lang:
          </span>
          {post.variants.map((v) => {
            const active = activeLang === v.languageCode
            return (
              <button
                key={v.languageCode}
                onClick={() => selectVariant(v)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
                  active
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span>{v.languageCode}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    v.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddLangModal(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-dashed border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition"
          >
            <Plus className="h-3 w-3" />
            <span>Add Translation</span>
          </button>
        </div>
      </div>

      {/* Main Studio Area - Full Page Width with Perfectly Aligned Box Edges */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Unified Editor Card - Left Side (Aligns Side-to-Side Flush) */}
        <div className="flex-1 min-w-0 w-full rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Post Header: Title & URL Slug integrated into the box */}
          <div className="p-6 border-b border-zinc-100">
            <input
              type="text"
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:outline-none"
            />

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 text-xs">
              <span className="font-mono text-zinc-400">/{slug}</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                placeholder="post-slug"
                className="flex-1 font-mono text-xs text-zinc-700 bg-transparent focus:outline-none focus:underline"
              />
            </div>
          </div>

          {/* TipTap Rich Editor embedded inside the aligned container */}
          <TipTapEditor
            key={activeLang}
            content={contentHtml}
            embedded={true}
            onChange={(html, json) => {
              setContentHtml(html)
              setContentJson(json)
            }}
          />
        </div>

        {/* Post Settings Drawer - Right Side (Aligns Side-to-Side Flush) */}
        {showSettingsSidebar && (
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
                Post Settings
              </h3>
              <button
                onClick={() => setShowSettingsSidebar(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500 mb-1.5">
                Featured Cover Image
              </label>
              {featuredImageUrl ? (
                <div className="relative group mb-2 rounded-lg overflow-hidden border border-zinc-200">
                  <img
                    src={featuredImageUrl}
                    alt="Featured"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    onClick={() => setFeaturedImageUrl('')}
                    className="absolute top-2 right-2 rounded-md bg-black/60 p-1 text-white hover:bg-black transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... or upload"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition"
                  title="Upload image from device"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Meta Description / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500">
                  Meta Description ({activeLang.toUpperCase()})
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSeo}
                  disabled={generatingSeo}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-800 disabled:opacity-50"
                >
                  <Sparkles className="h-3 w-3 text-purple-600" />
                  {generatingSeo ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="SEO summary and article excerpt..."
                className="w-full rounded-lg border border-zinc-200 p-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            {/* AI SEO Suggestions */}
            {seoSuggestions && (
              <div className="rounded-lg bg-purple-50/80 border border-purple-200/80 p-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-purple-950">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" /> AI Suggestions
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeoSuggestions(null)}
                    className="text-zinc-400 hover:text-zinc-600 text-[10px]"
                  >
                    Dismiss
                  </button>
                </div>
                {seoSuggestions.titles && seoSuggestions.titles.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 block mb-1">
                      Alternative Titles (Click to Apply)
                    </span>
                    <div className="space-y-1">
                      {seoSuggestions.titles.map((altTitle, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTitle(altTitle)}
                          className="w-full text-left text-xs text-zinc-800 bg-white hover:bg-purple-50 border border-zinc-200 hover:border-purple-300 rounded px-2 py-1 transition truncate block"
                          title={altTitle}
                        >
                          {altTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {seoSuggestions.tags && seoSuggestions.tags.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 block mb-1">
                      Suggested Tags
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {seoSuggestions.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Visibility & Flags */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-100">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="text-xs font-medium text-zinc-700 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Featured Article
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPage}
                  onChange={(e) => setIsPage(e.target.checked)}
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="text-xs font-medium text-zinc-700">Static Page (No dates)</span>
              </label>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleDeletePost}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Post</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Add Language Modal */}
      {showAddLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Add Language Variant</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Create a localized translation for this post.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                ISO Language Code
              </label>
              <input
                type="text"
                autoFocus
                maxLength={5}
                placeholder="e.g. es, fr, de, th, ja"
                value={newLangCode}
                onChange={(e) => setNewLangCode(e.target.value.toLowerCase())}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs font-mono uppercase text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setShowAddLangModal(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddLanguageVariant}
                className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Translate Modal */}
      {showAiTranslateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl bg-purple-100 p-2 text-purple-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">AI Auto-Translate</h3>
                <p className="text-xs text-zinc-500">
                  Translate from <strong>{activeLang.toUpperCase()}</strong> into another language.
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  {aiStatus?.configured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      {aiStatus.provider}: {aiStatus.model}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Requires OPENROUTER_API_KEY
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                  Target Language Code (e.g. th, ja, fr, de, es, zh)
                </label>
                <input
                  type="text"
                  autoFocus
                  maxLength={5}
                  value={targetAiLang}
                  onChange={(e) => setTargetAiLang(e.target.value.toLowerCase())}
                  placeholder="e.g. th, ja, fr, de"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs uppercase font-mono font-medium text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  disabled={translating}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] font-mono text-zinc-400 mr-1">Quick pick:</span>
                {['th', 'ja', 'es', 'fr', 'de', 'zh'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setTargetAiLang(code)}
                    disabled={translating}
                    className={`rounded px-2 py-0.5 text-xs font-mono font-semibold uppercase border transition ${
                      targetAiLang === code
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-600 space-y-1.5">
                <p className="font-semibold text-zinc-800">Localization process:</p>
                <ul className="list-disc list-inside space-y-1 text-zinc-500">
                  <li>AI translates title, slug, and rich-text content</li>
                  <li>HTML structure, formatting, code blocks, and media links are preserved</li>
                  <li>A new <strong>{targetAiLang ? targetAiLang.toUpperCase() : '...'}</strong> variant will be created as a Draft</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setShowAiTranslateModal(false)}
                disabled={translating}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAiTranslate}
                disabled={translating || !targetAiLang.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span>{translating ? 'Translating with AI...' : 'Translate & Create Variant'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">Dispatch Newsletter</h3>
                <p className="text-xs text-zinc-500">
                  Broadcast this post to your active subscribers.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                Email Subject
              </label>
              <input
                type="text"
                required
                value={newsletterSubject}
                onChange={(e) => setNewsletterSubject(e.target.value)}
                placeholder="Subject line for email..."
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-600 space-y-1">
              <span className="font-semibold text-zinc-800">Campaign details:</span>
              <p>• Language Variant: <strong>{activeLang.toUpperCase()}</strong></p>
              <p>• Title: <strong>{title}</strong></p>
              <p>• Readers will receive a link to read the full story on your blog.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setShowNewsletterModal(false)}
                disabled={sendingNewsletter}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendNewsletter}
                disabled={sendingNewsletter || !newsletterSubject.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{sendingNewsletter ? 'Dispatching...' : 'Dispatch Campaign Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Schedule Publication</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Select date and time to automatically publish this article variant.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                Target Publish Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setScheduledAt(new Date(scheduleDateTime).toISOString())
                  setShowScheduleModal(false)
                  handleSaveVariant('SCHEDULED')
                }}
                className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revisions History Modal */}
      {showRevisionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-zinc-600" />
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                  Version History ({activeLang.toUpperCase()})
                </h3>
              </div>
              <button
                onClick={() => setShowRevisionsModal(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {loadingRevisions ? (
                <div className="py-12 text-center text-xs font-mono text-zinc-400">
                  Loading snapshots...
                </div>
              ) : revisions.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  No historical snapshots recorded yet for this language variant.
                </div>
              ) : (
                revisions.map((rev) => {
                  const isSelected = selectedRevision?.id === rev.id
                  return (
                    <div
                      key={rev.id}
                      onClick={() => setSelectedRevision(rev)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        isSelected
                          ? 'border-zinc-900 bg-zinc-50 shadow-sm'
                          : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-900 text-xs">
                          {rev.title || 'Untitled Snapshot'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {new Date(rev.createdAt).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500">
                        <span className="font-mono text-zinc-400">/{rev.slug}</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                {selectedRevision ? `Snapshot #${selectedRevision.id}` : 'Select a snapshot'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRevisionsModal(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={!selectedRevision || restoringRevision}
                  onClick={handleRestoreRevision}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{restoringRevision ? 'Restoring...' : 'Restore This Snapshot'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
