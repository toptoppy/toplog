'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostListItem } from '@/lib/types'
import BulkActionsBar from '@/components/posts/BulkActionsBar'
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  FileText,
  Star,
  Clock,
  CheckCircle2,
  FileEdit,
  Sparkles,
  Copy,
} from 'lucide-react'

export default function PostsListPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [publicUrl, setPublicUrl] = useState('')
  const [runningScheduler, setRunningScheduler] = useState(false)
  const [schedulerMessage, setSchedulerMessage] = useState<string | null>(null)

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isBatchProcessing, setIsBatchProcessing] = useState(false)
  const [batchMessage, setBatchMessage] = useState<string | null>(null)
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null)
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null)

  const fetchPosts = async () => {
    try {
      const [b, p] = await Promise.all([
        api.blogs.get(blogId),
        api.posts.list(blogId),
      ])
      setBlog(b)
      setPosts(p)

      if (typeof window !== 'undefined') {
        if (b.customDomain) {
          setPublicUrl(`https://${b.customDomain}`)
        } else {
          const host = window.location.hostname
          const proto = window.location.protocol
          const parts = host.split('.')
          let base = 'localhost'
          if (parts.length > 1 && !host.endsWith('localhost')) {
            base = parts.slice(1).join('.')
          }
          setPublicUrl(`${proto}//${b.subdomain}.${base}`)
        }
      }
    } catch (err) {
      console.error('Failed to load posts', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [blogId])

  const handleDelete = async (postId: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title || 'Untitled'}"?`)) return

    try {
      await api.posts.delete(blogId, postId)
      setPosts((prev) => prev.filter((p) => p.id !== postId))
    } catch (err: any) {
      alert(err.message || 'Failed to delete post')
    }
  }

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      (p.variant?.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.variant?.slug || '').toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'ALL' || p.variant?.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Esc key clears selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedIds.length > 0) {
        setSelectedIds([])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds])

  // Indeterminate state for Select All checkbox
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      const isIndeterminate =
        selectedIds.length > 0 && selectedIds.length < filteredPosts.length
      selectAllCheckboxRef.current.indeterminate = isIndeterminate
    }
  }, [selectedIds, filteredPosts])

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredPosts.length && filteredPosts.length > 0) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPosts.map((p) => p.id))
    }
  }

  const handleToggleSelectOne = (
    id: number,
    index: number,
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    if (e.shiftKey && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index)
      const end = Math.max(lastSelectedIndex, index)
      const rangeIds = filteredPosts.slice(start, end + 1).map((p) => p.id)
      setSelectedIds((prev) => Array.from(new Set([...prev, ...rangeIds])))
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }
    setLastSelectedIndex(index)
  }

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedIds.length} posts? This cannot be undone.`
      )
    )
      return
    setIsBatchProcessing(true)
    setBatchMessage(`Deleting ${selectedIds.length} posts...`)
    try {
      await Promise.allSettled(
        selectedIds.map((id) => api.posts.delete(blogId, id))
      )
      setSelectedIds([])
      await fetchPosts()
    } catch (err: any) {
      alert(err.message || 'Bulk delete failed')
    } finally {
      setIsBatchProcessing(false)
      setBatchMessage(null)
    }
  }

  const handleBulkStatusChange = async (status: 'PUBLISHED' | 'DRAFT') => {
    setIsBatchProcessing(true)
    setBatchMessage(`Setting ${selectedIds.length} posts to ${status}...`)
    try {
      const targetPosts = posts.filter(
        (p) => selectedIds.includes(p.id) && p.variant
      )
      await Promise.allSettled(
        targetPosts.map((p) => {
          if (!p.variant) return Promise.resolve()
          return api.posts.updateVariant(blogId, p.id, p.variant.languageCode, {
            title: p.variant.title,
            slug: p.variant.slug,
            description: p.variant.description || undefined,
            contentJson: p.variant.contentJson,
            contentHtml: p.variant.contentHtml,
            status,
          })
        })
      )
      setSelectedIds([])
      await fetchPosts()
    } catch (err: any) {
      alert(err.message || 'Bulk status update failed')
    } finally {
      setIsBatchProcessing(false)
      setBatchMessage(null)
    }
  }

  const handleBulkToggleFeatured = async (isFeatured: boolean) => {
    setIsBatchProcessing(true)
    setBatchMessage(
      `${isFeatured ? 'Featuring' : 'Unfeaturing'} ${selectedIds.length} posts...`
    )
    try {
      await Promise.allSettled(
        selectedIds.map((id) =>
          api.posts.updateBase(blogId, id, { isFeatured })
        )
      )
      setSelectedIds([])
      await fetchPosts()
    } catch (err: any) {
      alert(err.message || 'Bulk update failed')
    } finally {
      setIsBatchProcessing(false)
      setBatchMessage(null)
    }
  }

  const handleDuplicateOne = async (id: number, title: string) => {
    try {
      await api.posts.duplicate(blogId, id)
      await fetchPosts()
    } catch (err: any) {
      alert(err.message || `Failed to duplicate "${title}"`)
    }
  }

  const handleBulkDuplicate = async () => {
    setIsBatchProcessing(true)
    setBatchMessage(`Duplicating ${selectedIds.length} posts...`)
    try {
      await Promise.allSettled(
        selectedIds.map((id) => api.posts.duplicate(blogId, id))
      )
      setSelectedIds([])
      await fetchPosts()
    } catch (err: any) {
      alert(err.message || 'Bulk duplicate failed')
    } finally {
      setIsBatchProcessing(false)
      setBatchMessage(null)
    }
  }

  const handleBulkExport = () => {
    const selectedPosts = posts.filter((p) => selectedIds.includes(p.id))
    for (const post of selectedPosts) {
      if (!post.variant) continue
      const postTags = post.tags?.map((t) => `"${t.name}"`).join(', ') || ''
      const frontmatter = [
        '---',
        `title: "${(post.variant.title || '').replace(/"/g, '\\"')}"`,
        `slug: "${post.variant.slug || ''}"`,
        `language: "${post.variant.languageCode}"`,
        `status: "${post.variant.status}"`,
        `published_at: ${post.variant.publishedAt ? `"${post.variant.publishedAt}"` : 'null'}`,
        post.variant.description ? `description: "${post.variant.description.replace(/"/g, '\\"')}"` : null,
        post.featuredImageUrl ? `featured_image: "${post.featuredImageUrl}"` : null,
        `tags: [${postTags}]`,
        '---',
        '',
        post.variant.contentHtml || '',
      ]
        .filter((l) => l !== null)
        .join('\n')

      const blob = new Blob([frontmatter], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${post.variant.slug || `post-${post.id}`}.md`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  if (loading || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
          <span className="text-xs font-mono text-zinc-400">Loading articles...</span>
        </div>
      </div>
    )
  }

  const counts = {
    ALL: posts.length,
    PUBLISHED: posts.filter((p) => p.variant?.status === 'PUBLISHED').length,
    SCHEDULED: posts.filter((p) => p.variant?.status === 'SCHEDULED').length,
    DRAFT: posts.filter((p) => p.variant?.status === 'DRAFT').length,
  }

  return (
    <div className="w-full p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Posts</h1>
            <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2 py-0.5 text-xs font-mono font-medium text-zinc-600">
              {posts.length}
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Write, localize, schedule, and publish articles across your publication.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {counts.SCHEDULED > 0 && (
            <button
              type="button"
              disabled={runningScheduler}
              onClick={async () => {
                setRunningScheduler(true)
                setSchedulerMessage(null)
                try {
                  const res = await api.posts.runScheduler(blogId)
                  setSchedulerMessage(res.message)
                  await fetchPosts()
                } catch (err: any) {
                  setSchedulerMessage(err.message || 'Scheduler check failed')
                } finally {
                  setRunningScheduler(false)
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-semibold text-purple-700 shadow-sm hover:bg-purple-100 disabled:opacity-50 transition"
              title="Immediately check and publish any scheduled posts that have reached their target time"
            >
              <Clock className={`h-3.5 w-3.5 ${runningScheduler ? 'animate-spin' : ''}`} />
              <span>{runningScheduler ? 'Checking...' : 'Check Due Posts'}</span>
            </button>
          )}
          <Link
            href={`/blogs/${blogId}/posts/new`}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {schedulerMessage && (
        <div className="rounded-lg bg-purple-50 p-3 text-xs font-mono text-purple-700 border border-purple-200 flex items-center justify-between">
          <span>{schedulerMessage}</span>
          <button
            type="button"
            onClick={() => setSchedulerMessage(null)}
            className="text-purple-400 hover:text-purple-700 ml-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        {/* Segmented Filter Control - Linear Style */}
        <div className="inline-flex items-center p-1 rounded-lg bg-zinc-100 border border-zinc-200/80 self-start sm:self-auto overflow-x-auto">
          {(['ALL', 'PUBLISHED', 'SCHEDULED', 'DRAFT'] as const).map((s) => {
            const active = statusFilter === s
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  active
                    ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span>{s}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-zinc-100 text-zinc-700' : 'text-zinc-400'
                  }`}
                >
                  {counts[s]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-zinc-900">No posts found</p>
            <p className="text-xs text-zinc-500 mt-1">
              {search || statusFilter !== 'ALL'
                ? 'Try adjusting your filters or search keywords.'
                : 'Get started by composing your first article.'}
            </p>
            {!search && statusFilter === 'ALL' && (
              <Link
                href={`/blogs/${blogId}/posts/new`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Write Post</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50/75 border-b border-zinc-100 text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="w-10 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      ref={selectAllCheckboxRef}
                      checked={
                        filteredPosts.length > 0 &&
                        selectedIds.length === filteredPosts.length
                      }
                      onChange={handleToggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      title={
                        selectedIds.length === filteredPosts.length
                          ? 'Deselect all'
                          : 'Select all visible posts'
                      }
                    />
                  </th>
                  <th className="px-4 py-3">Title & Slug</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredPosts.map((p, index) => {
                  const isSelected = selectedIds.includes(p.id)
                  const title = p.variant?.title || 'Untitled'
                  const slug = p.variant?.slug || ''
                  const status = p.variant?.status || 'DRAFT'
                  const lang = p.variant?.languageCode || blog.defaultLanguage
                  const livePostUrl = publicUrl ? `${publicUrl}/${slug}` : null

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-zinc-50/80 transition group ${
                        isSelected ? 'bg-blue-50/40 hover:bg-blue-50/60' : ''
                      }`}
                    >
                      <td className="w-10 px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onClick={(e) => handleToggleSelectOne(p.id, index, e)}
                          onChange={() => {}} // Controlled by onClick to support Shift-click
                          className="h-3.5 w-3.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          aria-label={`Select ${title}`}
                        />
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          {p.isFeatured && (
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                          <div>
                            <Link
                              href={`/blogs/${blogId}/posts/${p.id}`}
                              className="font-medium text-zinc-900 hover:text-blue-600 text-sm transition"
                            >
                              {title}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-mono text-zinc-400">/{slug}</span>
                              <span className="text-zinc-300">&bull;</span>
                              <span className="text-[10px] font-mono text-zinc-500">
                                {p.variant?.readingTimeMinutes || 1} min read ({p.variant?.wordCount || 0} words)
                              </span>
                            </div>
                            {p.tags && p.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {p.tags.map((t) => {
                                  const tagColor = t.color || '#64748B'
                                  return (
                                    <span
                                      key={t.id}
                                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium"
                                      style={{
                                        backgroundColor: `${tagColor}15`,
                                        color: tagColor,
                                        border: `1px solid ${tagColor}40`,
                                      }}
                                    >
                                      <span
                                        className="h-1 w-1 rounded-full"
                                        style={{ backgroundColor: tagColor }}
                                      />
                                      #{t.name}
                                    </span>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
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
                          {status === 'PUBLISHED' && p.variant?.publishedAt && (
                            <span className="text-[10px] font-mono text-zinc-400">
                              {new Date(p.variant.publishedAt).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                          {status === 'SCHEDULED' && p.variant?.scheduledAt && (
                            <span className="text-[10px] font-mono text-purple-600">
                              {new Date(p.variant.scheduledAt).toLocaleString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded bg-zinc-100 border border-zinc-200/80 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-700 uppercase">
                          {lang}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-zinc-500 text-xs">
                        {new Date(p.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {status === 'PUBLISHED' && livePostUrl && (
                            <a
                              href={livePostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition"
                              title="View Live"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/blogs/${blogId}/posts/${p.id}`}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition"
                            title="Edit Post"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDuplicateOne(p.id, title)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition"
                            title="Duplicate as Draft"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, title)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition"
                            title="Delete Post"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedIds.length}
        isProcessing={isBatchProcessing}
        processingMessage={batchMessage}
        onClear={() => setSelectedIds([])}
        onDelete={handleBulkDelete}
        onStatusChange={handleBulkStatusChange}
        onToggleFeatured={handleBulkToggleFeatured}
        onDuplicate={handleBulkDuplicate}
        onExport={handleBulkExport}
      />
    </div>
  )
}
