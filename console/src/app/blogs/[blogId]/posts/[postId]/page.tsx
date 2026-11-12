'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, Post, PostStatus, PostVariant, PostRevision, AiStatus } from '@/lib/types'
import { SUPPORTED_LANGUAGES, isLanguageSupported, getLanguageOption } from '@/lib/constants'
import TipTapEditor from '@/components/editor/TipTapEditor'
import PostSettingsDrawer from '@/components/posts/PostSettingsDrawer'
import AddLanguageModal from '@/components/posts/AddLanguageModal'
import AiTranslateModal from '@/components/posts/AiTranslateModal'
import SendNewsletterModal from '@/components/posts/SendNewsletterModal'
import SchedulePostModal from '@/components/posts/SchedulePostModal'
import PostRevisionsModal from '@/components/posts/PostRevisionsModal'
import SeoPreviewModal from '@/components/posts/SeoPreviewModal'
import KeyboardShortcutsModal from '@/components/posts/KeyboardShortcutsModal'
import PublishChecklistPopover from '@/components/posts/PublishChecklistPopover'
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
  Command,
  CheckSquare,
  FileDown,
  Columns,
  Copy,
  Check,
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
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)
  const [showSeoPreviewModal, setShowSeoPreviewModal] = useState(false)

  // Add Variant Modal State
  const [showAddLangModal, setShowAddLangModal] = useState(false)
  const [newLangCode, setNewLangCode] = useState('')
  const [isSplitMode, setIsSplitMode] = useState(false)
  const [copiedSource, setCopiedSource] = useState(false)

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

  // Scheduling & Publishing Date State
  const [scheduledAt, setScheduledAt] = useState<string | null>(null)
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleDateTime, setScheduleDateTime] = useState('')

  // Revision History State
  const [showRevisionsModal, setShowRevisionsModal] = useState(false)
  const [revisions, setRevisions] = useState<PostRevision[]>([])
  const [loadingRevisions, setLoadingRevisions] = useState(false)
  const [selectedRevision, setSelectedRevision] = useState<PostRevision | null>(null)
  const [restoringRevision, setRestoringRevision] = useState(false)

  // Auto-Save & Writing Metrics State
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'unsaved' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [savedTimeAgo, setSavedTimeAgo] = useState<string>('')
  const [wordCount, setWordCount] = useState(0)
  const [readingMinutes, setReadingMinutes] = useState(1)
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const [showChecklistPopover, setShowChecklistPopover] = useState(false)

  // Live Relative Time Elapsed Ticker (every 5 seconds)
  useEffect(() => {
    const updateAgo = () => {
      if (!lastSavedAt) {
        setSavedTimeAgo('')
        return
      }
      const diffSeconds = Math.floor((Date.now() - lastSavedAt.getTime()) / 1000)
      if (diffSeconds < 10) {
        setSavedTimeAgo('just now')
      } else if (diffSeconds < 60) {
        setSavedTimeAgo(`${diffSeconds}s ago`)
      } else if (diffSeconds < 3600) {
        const mins = Math.floor(diffSeconds / 60)
        setSavedTimeAgo(`${mins}m ago`)
      } else {
        setSavedTimeAgo(lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      }
    }

    updateAgo()
    const interval = setInterval(updateAgo, 5000)
    return () => clearInterval(interval)
  }, [lastSavedAt])

  const isInitialMountRef = useRef(true)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

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
      setCanonicalUrl(p.canonicalUrl || '')

      // Check query params for active language or add language request
      const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const requestedLang = searchParams?.get('lang')
      const addLang = searchParams?.get('addLang')

      // Select requested, default, or first variant
      const targetVariant =
        (requestedLang ? p.variants.find((v) => v.languageCode === requestedLang) : null) ||
        p.variants.find((v) => v.languageCode === b.defaultLanguage) ||
        p.variants[0]

      if (targetVariant) {
        selectVariant(targetVariant)
      } else {
        setTimeout(() => {
          isInitialMountRef.current = false
        }, 500)
      }

      if (addLang && !p.variants.some((v) => v.languageCode === addLang)) {
        setShowAddLangModal(true)
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
    isInitialMountRef.current = true
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }
    setActiveLang(variant.languageCode)
    setTitle(variant.title)
    setSlug(variant.slug)
    setDescription(variant.description || '')
    setContentHtml(variant.contentHtml || '')
    setContentJson(variant.contentJson || '{}')
    setStatus(variant.status)
    setScheduledAt(variant.scheduledAt || null)
    setPublishedAt(variant.publishedAt || null)
    setAutoSaveStatus('idle')

    setTimeout(() => {
      isInitialMountRef.current = false
    }, 500)
  }

  // Live Auto-Save Debounce Effect (2.5s debounce)
  useEffect(() => {
    if (isInitialMountRef.current || loading || !post) return

    setAutoSaveStatus('unsaved')

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      setAutoSaveStatus('saving')
      try {
        await api.posts.updateVariant(blogId, postId, activeLang, {
          title,
          slug,
          description,
          contentHtml,
          contentJson,
          status,
          scheduledAt: status === 'SCHEDULED' ? (scheduledAt || undefined) : undefined,
          publishedAt: publishedAt || undefined,
        })
        setAutoSaveStatus('saved')
        setLastSavedAt(new Date())
      } catch (err: any) {
        console.error('Auto-save error:', err)
        setAutoSaveStatus('error')
      }
    }, 2500)

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [title, slug, description, contentHtml, contentJson])

  // Keyboard Shortcuts: Cmd+S / Ctrl+S to save draft, ? to show cheat sheet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's' && !e.shiftKey) {
        e.preventDefault()
        handleSaveVariant('DRAFT')
      }

      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement
        const isInputField =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          Boolean(target.closest('.ProseMirror'))
        if (!isInputField) {
          e.preventDefault()
          setShowShortcutsModal((prev) => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [blogId, postId, activeLang, title, slug, description, contentHtml, contentJson, isFeatured, isPage, featuredImageUrl, canonicalUrl, scheduledAt, status])

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

  const handleExportMarkdown = () => {
    const postTags = post?.tags?.map((t) => `"${t.name}"`).join(', ') || ''
    const frontmatter = [
      '---',
      `title: "${(title || '').replace(/"/g, '\\"')}"`,
      `slug: "${slug || ''}"`,
      `language: "${activeLang}"`,
      `status: "${status}"`,
      `published_at: ${publishedAt ? `"${publishedAt}"` : 'null'}`,
      description ? `description: "${description.replace(/"/g, '\\"')}"` : null,
      featuredImageUrl ? `featured_image: "${featuredImageUrl}"` : null,
      `tags: [${postTags}]`,
      '---',
      '',
      contentHtml || '',
    ]
      .filter((line) => line !== null)
      .join('\n')

    const blob = new Blob([frontmatter], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${slug || 'article'}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSaveVariant = async (overrideStatus?: PostStatus, overrideScheduledAt?: string) => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }
    setError('')
    setMessage('')
    setSaving(true)
    setAutoSaveStatus('saving')

    const nextStatus = overrideStatus || status
    const nextScheduledAt =
      nextStatus === 'DRAFT'
        ? undefined
        : overrideScheduledAt !== undefined
        ? overrideScheduledAt
        : scheduledAt

    try {
      // 1. Update Post Metadata
      await api.posts.updateBase(blogId, postId, {
        isFeatured,
        isPage,
        featuredImageUrl: featuredImageUrl || undefined,
        canonicalUrl: canonicalUrl ? canonicalUrl.trim() : null,
      })

      // 2. Upsert Variant
      await api.posts.updateVariant(blogId, postId, activeLang, {
        title,
        slug,
        description,
        contentHtml,
        contentJson,
        status: nextStatus,
        scheduledAt: nextStatus === 'SCHEDULED' ? (nextScheduledAt || undefined) : undefined,
        publishedAt: publishedAt || undefined,
      })

      setStatus(nextStatus)
      if (nextStatus === 'SCHEDULED' && nextScheduledAt) {
        setScheduledAt(nextScheduledAt)
      } else if (nextStatus !== 'SCHEDULED') {
        setScheduledAt(null)
      }

      setMessage(
        nextStatus === 'SCHEDULED'
          ? `Post scheduled for publication on ${new Date(nextScheduledAt!).toLocaleString()}!`
          : nextStatus === 'PUBLISHED'
          ? 'Post published successfully!'
          : 'Draft saved successfully!'
      )

      setAutoSaveStatus('saved')
      setLastSavedAt(new Date())

      // Refresh post
      const refreshedPost = await api.posts.get(blogId, postId)
      setPost(refreshedPost)
    } catch (err: any) {
      setAutoSaveStatus('error')
      setError(err.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleAddLanguageVariant = () => {
    const lang = newLangCode.trim().toLowerCase()
    if (!lang) return

    if (!isLanguageSupported(lang)) {
      alert(`Language '${lang}' is not supported. Supported: ${SUPPORTED_LANGUAGES.map((l) => l.code).join(', ')}`)
      return
    }

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
  const counterpartVariant = post.variants.find((v) => v.languageCode !== activeLang)

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

            {/* Live Auto-Save Status Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono border bg-white border-zinc-200 shadow-2xs">
              {autoSaveStatus === 'saving' ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-blue-600 font-medium">Auto-saving...</span>
                </>
              ) : autoSaveStatus === 'saved' ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-600 font-medium" title={lastSavedAt ? `Saved at ${lastSavedAt.toLocaleTimeString()}` : 'Saved'}>
                    Saved {savedTimeAgo || 'just now'}
                  </span>
                </>
              ) : autoSaveStatus === 'unsaved' ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-amber-700">Unsaved changes</span>
                </>
              ) : autoSaveStatus === 'error' ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-red-600">Auto-save error</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                  <span className="text-zinc-500">Draft clean</span>
                </>
              )}
            </div>

            {/* Metrics Telemetry */}
            <span className="hidden md:inline-flex items-center font-mono text-[11px] text-zinc-400">
              {wordCount} words · {readingMinutes} min read
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
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
            title="Export this post as Markdown (.md) with YAML frontmatter"
          >
            <FileDown className="h-3.5 w-3.5 text-zinc-400" />
            <span>Export .md</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSeoPreviewModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition shadow-sm"
            title="Preview Google search snippet and social share cards"
          >
            <Globe className="h-3.5 w-3.5 text-purple-600" />
            <span>SEO & Social</span>
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

          {/* Keyboard Shortcuts Button */}
          <button
            type="button"
            onClick={() => setShowShortcutsModal(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition"
            title="Keyboard shortcuts (?)"
          >
            <Command className="h-3.5 w-3.5" />
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

          {status === 'SCHEDULED' && (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveVariant('DRAFT')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm hover:bg-amber-100 disabled:opacity-50 transition"
              title="Cancel schedule and revert back to draft"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-600" />
              <span>Revert to Draft</span>
            </button>
          )}

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

          {/* Pre-flight Checklist Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowChecklistPopover(!showChecklistPopover)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 transition"
              title="Publishing pre-flight checklist"
            >
              <CheckSquare className="h-3.5 w-3.5 text-zinc-400" />
              <span>Pre-flight</span>
            </button>

            {showChecklistPopover && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <PublishChecklistPopover
                  title={title}
                  slug={slug}
                  contentHtml={contentHtml}
                  wordCount={wordCount}
                  description={description}
                  featuredImageUrl={featuredImageUrl}
                  onOpenSettings={() => {
                    setShowChecklistPopover(false)
                    setShowSettingsSidebar(true)
                  }}
                  onOpenSeo={() => {
                    setShowChecklistPopover(false)
                    setShowSeoPreviewModal(true)
                  }}
                />
              </div>
            )}
          </div>

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
            Language:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const v = post.variants.find((item) => item.languageCode === lang.code)
            const active = activeLang === lang.code

            if (v) {
              return (
                <button
                  key={lang.code}
                  onClick={() => selectVariant(v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all ${
                    active
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                  title={`${lang.nativeName} (${lang.label}) - ${v.status}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.code}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      v.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </button>
              )
            }

            // Not yet added: quick-add / prompt
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setNewLangCode(lang.code)
                  setShowAddLangModal(true)
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-all border border-dashed border-zinc-300"
                title={`Click to add ${lang.nativeName} (${lang.label}) variant`}
              >
                <span className="text-base opacity-60">{lang.flag}</span>
                <span className="uppercase">{lang.code}</span>
                <Plus className="h-3 w-3 text-zinc-400" />
              </button>
            )
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {post.variants.length > 1 && counterpartVariant && (
            <button
              type="button"
              onClick={() => setIsSplitMode(!isSplitMode)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition border ${
                isSplitMode
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:text-zinc-900'
              }`}
              title="Toggle Split-Screen Translation Workbench"
            >
              <Columns className="h-3.5 w-3.5" />
              <span>{isSplitMode ? 'Exit Split View' : 'Split Translation View'}</span>
            </button>
          )}

          {/* Action button if any supported language is missing */}
          {SUPPORTED_LANGUAGES.some((l) => !post.variants.some((v) => v.languageCode === l.code)) && (
            <button
              onClick={() => {
                const missing = SUPPORTED_LANGUAGES.find((l) => !post.variants.some((v) => v.languageCode === l.code))
                if (missing) {
                  setNewLangCode(missing.code)
                  setTargetAiLang(missing.code)
                }
                setShowAddLangModal(true)
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-dashed border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition"
            >
              <Plus className="h-3 w-3" />
              <span>Add Counterpart Draft</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Area - Full Page Width with Perfectly Aligned Box Edges */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Split Workbench: Read-Only Reference Panel on the Left */}
        {isSplitMode && counterpartVariant && (
          <div className="flex-1 min-w-0 w-full rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{getLanguageOption(counterpartVariant.languageCode).flag}</span>
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-tight">
                  {getLanguageOption(counterpartVariant.languageCode).label} ({counterpartVariant.languageCode.toUpperCase()}) Reference
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-600 font-medium">
                  {counterpartVariant.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${counterpartVariant.title}\n\n${counterpartVariant.description || ''}\n\n${counterpartVariant.contentHtml.replace(/<[^>]*>/g, '')}`
                  )
                  setCopiedSource(true)
                  setTimeout(() => setCopiedSource(false), 2000)
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition"
                title="Copy reference text to clipboard"
              >
                {copiedSource ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedSource ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="p-6 border-b border-zinc-100 bg-zinc-50/20">
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 leading-snug">
                {counterpartVariant.title}
              </h2>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-200/60 text-xs font-mono text-zinc-400">
                <span>/{counterpartVariant.slug}</span>
                <span>&bull;</span>
                <span>{counterpartVariant.wordCount} words</span>
              </div>
              {counterpartVariant.description && (
                <p className="mt-3 text-xs text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-200/70 leading-relaxed">
                  {counterpartVariant.description}
                </p>
              )}
            </div>

            <div className="p-6 max-h-[calc(100vh-280px)] overflow-y-auto prose prose-zinc prose-sm bg-white">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    counterpartVariant.contentHtml ||
                    '<p class="text-zinc-400 italic">No content in reference variant.</p>',
                }}
              />
            </div>
          </div>
        )}

        {/* Unified Editor Card - Left/Right Side */}
        <div className="flex-1 min-w-0 w-full rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
          {isSplitMode && (
            <div className="px-5 py-3 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{getLanguageOption(activeLang).flag}</span>
                <span className="text-xs font-bold uppercase tracking-tight">
                  Editing: {getLanguageOption(activeLang).nativeName} ({activeLang.toUpperCase()})
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                  {status}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {autoSaveStatus === 'saved' ? 'Saved' : autoSaveStatus === 'saving' ? 'Saving...' : ''}
              </span>
            </div>
          )}
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
            blogId={blogId}
            onWordCountChange={(words, minutes) => {
              setWordCount(words)
              setReadingMinutes(minutes)
            }}
            onChange={(html, json) => {
              setContentHtml(html)
              setContentJson(json)
            }}
          />
        </div>

        {/* Post Settings Drawer - Right Side (Aligns Side-to-Side Flush) */}
        <PostSettingsDrawer
          isOpen={showSettingsSidebar}
          onClose={() => setShowSettingsSidebar(false)}
          featuredImageUrl={featuredImageUrl}
          setFeaturedImageUrl={setFeaturedImageUrl}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          activeLang={activeLang}
          description={description}
          setDescription={setDescription}
          handleGenerateSeo={handleGenerateSeo}
          generatingSeo={generatingSeo}
          seoSuggestions={seoSuggestions}
          setSeoSuggestions={setSeoSuggestions}
          setTitle={setTitle}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
          isPage={isPage}
          setIsPage={setIsPage}
          handleDeletePost={handleDeletePost}
          onOpenSeoPreview={() => setShowSeoPreviewModal(true)}
          canonicalUrl={canonicalUrl}
          setCanonicalUrl={setCanonicalUrl}
          publishedAt={publishedAt}
          setPublishedAt={setPublishedAt}
          scheduledAt={scheduledAt}
          postStatus={status}
        />
      </div>

      {/* Modals */}
      <SeoPreviewModal
        isOpen={showSeoPreviewModal}
        onClose={() => setShowSeoPreviewModal(false)}
        blogId={blogId}
        postId={postId}
        blogTitle={blog?.title || ''}
        subdomain={blog?.subdomain || ''}
        customDomain={blog?.customDomain}
        activeLang={activeLang}
        title={title}
        setTitle={setTitle}
        slug={slug}
        setSlug={setSlug}
        description={description}
        setDescription={setDescription}
        featuredImageUrl={featuredImageUrl}
        setFeaturedImageUrl={setFeaturedImageUrl}
        canonicalUrl={canonicalUrl}
        setCanonicalUrl={setCanonicalUrl}
        handleGenerateSeo={handleGenerateSeo}
        generatingSeo={generatingSeo}
      />
      <AddLanguageModal
        isOpen={showAddLangModal}
        onClose={() => setShowAddLangModal(false)}
        newLangCode={newLangCode}
        setNewLangCode={setNewLangCode}
        onAdd={handleAddLanguageVariant}
        existingLanguages={post?.variants?.map((v) => v.languageCode) || []}
      />

      <AiTranslateModal
        isOpen={showAiTranslateModal}
        onClose={() => setShowAiTranslateModal(false)}
        activeLang={activeLang}
        aiStatus={aiStatus}
        targetAiLang={targetAiLang}
        setTargetAiLang={setTargetAiLang}
        translating={translating}
        onTranslate={handleAiTranslate}
        existingLanguages={post?.variants?.map((v) => v.languageCode) || []}
      />

      <SendNewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        activeLang={activeLang}
        title={title}
        newsletterSubject={newsletterSubject}
        setNewsletterSubject={setNewsletterSubject}
        sendingNewsletter={sendingNewsletter}
        onSend={handleSendNewsletter}
      />

      <SchedulePostModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        scheduleDateTime={scheduleDateTime}
        setScheduleDateTime={setScheduleDateTime}
        onConfirm={() => {
          const newIso = new Date(scheduleDateTime).toISOString()
          setScheduledAt(newIso)
          setShowScheduleModal(false)
          handleSaveVariant('SCHEDULED', newIso)
        }}
      />

      <PostRevisionsModal
        isOpen={showRevisionsModal}
        onClose={() => setShowRevisionsModal(false)}
        activeLang={activeLang}
        loadingRevisions={loadingRevisions}
        revisions={revisions}
        selectedRevision={selectedRevision}
        setSelectedRevision={setSelectedRevision}
        restoringRevision={restoringRevision}
        onRestore={handleRestoreRevision}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </div>
  )
}
