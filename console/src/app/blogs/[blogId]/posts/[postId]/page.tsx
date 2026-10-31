'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, Post, PostStatus, PostVariant, PostRevision } from '@/lib/types'
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
  Bot,
  Mail,
  Clock,
  Calendar,
  History,
  RotateCcw,
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

      // Select initial variant
      const defaultVariant =
        p.variants.find((v) => v.languageCode === b.defaultLanguage) ||
        p.variants[0]

      if (defaultVariant) {
        selectVariant(defaultVariant)
      } else {
        setActiveLang(b.defaultLanguage)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPostData()
  }, [blogId, postId])

  const selectVariant = (v: PostVariant) => {
    setActiveLang(v.languageCode)
    setTitle(v.title)
    setSlug(v.slug)
    setDescription(v.description || '')
    setContentHtml(v.contentHtml || '')
    setContentJson(v.contentJson || '{}')
    setStatus(v.status)
    setScheduledAt(v.scheduledAt || null)
  }

  const handleSaveVariant = async (newStatus?: PostStatus, targetScheduleDate?: string | null) => {
    if (!title.trim()) {
      setError('Title cannot be empty')
      return
    }
    if (!slug.trim()) {
      setError('Slug cannot be empty')
      return
    }

    const targetStatus = newStatus || status
    setError('')
    setMessage('')
    setSaving(true)

    try {
      // 1. Update Base post settings if changed
      await api.posts.updateBase(blogId, postId, {
        isFeatured,
        isPage,
        featuredImageUrl: featuredImageUrl.trim() ? featuredImageUrl.trim() : null,
      })

      const finalScheduledAt = targetScheduleDate !== undefined
        ? targetScheduleDate
        : (targetStatus === 'SCHEDULED' ? scheduledAt : null)

      // 2. Save active language variant
      const updatedVariant = await api.posts.updateVariant(
        blogId,
        postId,
        activeLang,
        {
          title,
          slug,
          description,
          contentHtml,
          contentJson,
          status: targetStatus,
          scheduledAt: finalScheduledAt,
        }
      )

      setStatus(targetStatus)
      setScheduledAt(finalScheduledAt)
      setMessage(
        targetStatus === 'PUBLISHED'
          ? 'Variant published successfully!'
          : targetStatus === 'SCHEDULED'
          ? `Post scheduled for ${new Date(finalScheduledAt!).toLocaleString()}!`
          : 'Draft saved!'
      )

      // Refresh post variants
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

      // Refresh post & switch to new variant
      const refreshedPost = await api.posts.get(blogId, postId)
      setPost(refreshedPost)
      selectVariant(translatedVariant)
    } catch (err: any) {
      setError(err.message || 'AI translation failed')
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
      setError(err.message || 'AI SEO generation failed')
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

  const loadRevisions = async () => {
    setLoadingRevisions(true)
    try {
      const list = await api.revisions.list(blogId, postId, activeLang)
      setRevisions(list)
      if (list.length > 0) {
        setSelectedRevision(list[0])
      } else {
        setSelectedRevision(null)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load revisions')
    } finally {
      setLoadingRevisions(false)
    }
  }

  const handleRestoreRevision = async (rev: PostRevision) => {
    if (!confirm(`Rollback to version from ${new Date(rev.createdAt).toLocaleString()}? Current unsaved changes in editor will be overwritten.`)) {
      return
    }
    setRestoringRevision(true)
    setError('')
    setMessage('')
    try {
      await api.revisions.restore(blogId, postId, activeLang, rev.id)
      setTitle(rev.title)
      setSlug(rev.slug)
      setDescription(rev.description || '')
      setContentHtml(rev.contentHtml)
      setContentJson(rev.contentJson || '{}')
      setStatus(rev.status)
      setShowRevisionsModal(false)
      setMessage(`Successfully restored revision from ${new Date(rev.createdAt).toLocaleString()}!`)

      const refreshed = await api.posts.get(blogId, postId)
      setPost(refreshed)
    } catch (err: any) {
      setError(err.message || 'Failed to restore revision')
    } finally {
      setRestoringRevision(false)
    }
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  const publicUrl = `http://${blog.subdomain}.localhost/${slug}`

  return (
    <div className="p-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href={`/blogs/${blogId}/posts`}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition"
            title="Back to Posts"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase ${
                status === 'PUBLISHED'
                  ? 'bg-emerald-50 text-emerald-700'
                  : status === 'SCHEDULED'
                  ? 'bg-purple-50 text-purple-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {status}
            </span>
            {status === 'SCHEDULED' && scheduledAt && (
              <span className="text-xs text-purple-600 font-mono">
                Due: {new Date(scheduledAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status === 'PUBLISHED' && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              View Live
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setShowAiTranslateModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition shadow-sm"
            title="Auto-translate to another language with AI"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            AI Translate
          </button>

          <button
            type="button"
            onClick={() => {
              setShowRevisionsModal(true)
              loadRevisions()
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            title="Version history and snapshot rollbacks"
          >
            <History className="h-3.5 w-3.5 text-slate-500" />
            History
          </button>

          <button
            type="button"
            onClick={() => setShowSettingsSidebar(!showSettingsSidebar)}
            className={`rounded-lg p-2 transition border ${
              showSettingsSidebar
                ? 'bg-slate-100 border-slate-300 text-slate-900'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            title="Post Settings"
          >
            <SettingsIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveVariant('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Save className="h-4 w-4 text-slate-500" />
            Save Draft
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-300 bg-purple-50 px-3.5 py-2 text-sm font-semibold text-purple-700 shadow-sm hover:bg-purple-100 disabled:opacity-50 transition"
          >
            <Clock className="h-4 w-4 text-purple-600" />
            {status === 'SCHEDULED' ? 'Reschedule' : 'Schedule'}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveVariant('PUBLISHED')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="h-4 w-4" />
            {status === 'PUBLISHED' ? 'Update Published' : 'Publish'}
          </button>

          {status === 'PUBLISHED' && (
            <button
              type="button"
              onClick={() => {
                setNewsletterSubject(title)
                setShowNewsletterModal(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 transition"
              title="Send newsletter campaign to subscribers"
            >
              <Mail className="h-4 w-4 text-indigo-600" />
              Send Newsletter
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 border border-emerald-200">
          {message}
        </div>
      )}

      {/* Variant / Language Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6 pb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase mr-2">Language:</span>
        {post.variants.map((v) => (
          <button
            key={v.languageCode}
            onClick={() => selectVariant(v)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition ${
              activeLang === v.languageCode
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {v.languageCode}
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                v.status === 'PUBLISHED' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
          </button>
        ))}

        <button
          onClick={() => setShowAddLangModal(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:border-slate-400 hover:text-slate-800 transition ml-2"
        >
          <Plus className="h-3 w-3" />
          Add Translation
        </button>

        <button
          onClick={() => setShowAiTranslateModal(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition ml-1"
        >
          <Sparkles className="h-3 w-3 text-indigo-500" />
          AI Auto-Translate
        </button>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Editor Area (Left 2 cols) */}
        <div className={showSettingsSidebar ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <input
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-3xl font-extrabold text-slate-900 placeholder:text-slate-300 focus:outline-none mb-4"
          />

          <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-medium text-slate-400">Slug: /</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="post-slug"
              className="w-full rounded border border-slate-200 px-2 py-0.5 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <TipTapEditor
            key={activeLang}
            content={contentHtml}
            onChange={(html, json) => {
              setContentHtml(html)
              setContentJson(json)
            }}
          />
        </div>

        {/* Post Settings Drawer (Right col) */}
        {showSettingsSidebar && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5 h-fit">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Post Settings
            </h3>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                Featured Image
              </label>
              {featuredImageUrl ? (
                <div className="relative group mb-2 rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={featuredImageUrl}
                    alt="Featured"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    onClick={() => setFeaturedImageUrl('')}
                    className="absolute top-2 right-2 rounded bg-black/60 p-1 text-white hover:bg-black"
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
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-blue-600 focus:outline-none"
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
                  className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  title="Upload from device"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Meta Description / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  Meta Description ({activeLang.toUpperCase()})
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSeo}
                  disabled={generatingSeo}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                >
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                  {generatingSeo ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="SEO description and post excerpt..."
                className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* AI SEO Suggestions */}
            {seoSuggestions && (
              <div className="rounded-lg bg-indigo-50/70 border border-indigo-100 p-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-950">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> AI Suggestions
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeoSuggestions(null)}
                    className="text-slate-400 hover:text-slate-600 text-[10px]"
                  >
                    Dismiss
                  </button>
                </div>
                {seoSuggestions.titles && seoSuggestions.titles.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                      Alternative Titles (click to use)
                    </span>
                    <div className="space-y-1">
                      {seoSuggestions.titles.map((altTitle, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTitle(altTitle)}
                          className="w-full text-left text-xs text-slate-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded px-2 py-1 transition truncate block"
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
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                      Suggested Tags
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {seoSuggestions.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-800"
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
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" /> Featured Post
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPage}
                  onChange={(e) => setIsPage(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Static Page</span>
              </label>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDeletePost}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Post
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Translation Modal */}
      {showAddLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Add Language Translation</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create a new localized variant for this post.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Language Code (e.g. es, fr, de, ja)
              </label>
              <input
                type="text"
                autoFocus
                maxLength={5}
                value={newLangCode}
                onChange={(e) => setNewLangCode(e.target.value.toLowerCase())}
                placeholder="es"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddLangModal(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddLanguageVariant}
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-700"
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Translate Modal */}
      {showAiTranslateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">AI Auto-Translate</h3>
                <p className="text-xs text-slate-500">
                  Translate from <strong>{activeLang.toUpperCase()}</strong> to another language.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Target Language Code (e.g. fr, de, it, pt, ja, zh)
                </label>
                <input
                  type="text"
                  autoFocus
                  maxLength={5}
                  value={targetAiLang}
                  onChange={(e) => setTargetAiLang(e.target.value.toLowerCase())}
                  placeholder="e.g. fr, de, ja"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase font-mono font-medium focus:border-indigo-600 focus:outline-none"
                  disabled={translating}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-slate-400 mr-1">Quick pick:</span>
                {['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setTargetAiLang(code)}
                    disabled={translating}
                    className={`rounded px-2.5 py-0.5 text-xs font-semibold uppercase border transition ${
                      targetAiLang === code
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-slate-800">What will happen:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>AI translates title, slug, and rich-text content</li>
                  <li>HTML structure, formatting, code blocks, and media links are preserved</li>
                  <li>A new <strong>{targetAiLang ? targetAiLang.toUpperCase() : '...'}</strong> variant will be created as a Draft</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAiTranslateModal(false)}
                disabled={translating}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAiTranslate}
                disabled={translating || !targetAiLang.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {translating ? 'Translating with AI...' : 'Translate & Create Variant'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Dispatch Newsletter</h3>
                <p className="text-xs text-slate-500">
                  Send this published post to all your active email subscribers.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Email Subject
              </label>
              <input
                type="text"
                required
                value={newsletterSubject}
                onChange={(e) => setNewsletterSubject(e.target.value)}
                placeholder="Subject line for email..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800">Campaign details:</span>
              <p>• Language Variant: <strong>{activeLang.toUpperCase()}</strong></p>
              <p>• Title: <strong>{title}</strong></p>
              <p>• Readers will receive a link to read the full story on your blog.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowNewsletterModal(false)}
                disabled={sendingNewsletter}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendNewsletter}
                disabled={sendingNewsletter || !newsletterSubject.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                {sendingNewsletter ? 'Dispatching...' : 'Dispatch Campaign Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Schedule Publication</h3>
                <p className="text-xs text-slate-500">
                  Select the target date and time when this post should go live.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                Target Publication Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 font-mono"
              />
              <p className="text-xs text-slate-400 mt-2">
                The post status will transition to PUBLISHED and dispatch webhooks automatically when this timestamp is reached.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!scheduleDateTime || saving}
                onClick={async () => {
                  const targetIso = new Date(scheduleDateTime).toISOString()
                  setShowScheduleModal(false)
                  await handleSaveVariant('SCHEDULED', targetIso)
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700 disabled:opacity-50 transition"
              >
                <Calendar className="h-4 w-4" />
                Schedule Publication
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Revision History Modal */}
      {showRevisionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <History className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    Revision History
                    <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-xs font-mono font-semibold text-slate-700 uppercase">
                      {activeLang}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Snapshots are saved automatically every time you update this post variant.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRevisionsModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Content Area: Split View */}
            <div className="flex-1 flex overflow-hidden min-h-[420px]">
              {/* Left Column: Revision List */}
              <div className="w-80 border-r border-slate-100 overflow-y-auto p-3 space-y-2 bg-slate-50/30">
                {loadingRevisions ? (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mb-2" />
                    <span className="text-xs">Loading revisions...</span>
                  </div>
                ) : revisions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No past revisions recorded yet for this language variant. Edits will be snapshotted when you click Save.
                  </div>
                ) : (
                  revisions.map((rev, idx) => {
                    const isSelected = selectedRevision?.id === rev.id
                    const dateFormatted = new Date(rev.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })

                    return (
                      <div
                        key={rev.id}
                        onClick={() => setSelectedRevision(rev)}
                        className={`cursor-pointer rounded-xl p-3 border text-left transition ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-900 font-mono">
                            {dateFormatted}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                              rev.status === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rev.status === 'SCHEDULED'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium truncate mb-1">
                          {rev.title || 'Untitled'}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{rev.createdByName || 'Editor'}</span>
                          <span>{rev.wordCount} words</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Right Column: Preview of Selected Revision */}
              <div className="flex-1 flex flex-col overflow-y-auto p-6 bg-white">
                {selectedRevision ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-semibold uppercase text-slate-400">Snapshot from</span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {new Date(selectedRevision.createdAt).toLocaleString()}
                        </h4>
                        <p className="text-xs text-slate-500">
                          By {selectedRevision.createdByName || 'Author'} • {selectedRevision.wordCount} words • Status: {selectedRevision.status}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={restoringRevision}
                        onClick={() => handleRestoreRevision(selectedRevision)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
                      >
                        <RotateCcw className={`h-3.5 w-3.5 ${restoringRevision ? 'animate-spin' : ''}`} />
                        {restoringRevision ? 'Restoring...' : 'Rollback to This Version'}
                      </button>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">Title & Slug</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedRevision.title}</h3>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">/{selectedRevision.slug}</p>
                    </div>

                    {selectedRevision.description && (
                      <div>
                        <span className="text-[11px] font-semibold uppercase text-slate-400">Description / Excerpt</span>
                        <p className="text-xs text-slate-600 mt-0.5 italic">{selectedRevision.description}</p>
                      </div>
                    )}

                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">Snapshot Content Preview</span>
                      <div
                        className="mt-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4 max-h-72 overflow-y-auto text-sm text-slate-800 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedRevision.contentHtml }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
                    Select a revision on the left to preview its contents and rollback.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowRevisionsModal(false)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
