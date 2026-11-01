'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostListItem } from '@/lib/types'
import {
  FileText,
  Plus,
  Globe,
  CheckCircle2,
  FileEdit,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Settings,
} from 'lucide-react'

export default function BlogOverviewPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [publicUrl, setPublicUrl] = useState('')

  useEffect(() => {
    async function loadData() {
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
        console.error('Failed to load overview data', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [blogId])

  if (loading || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
          <span className="text-xs font-mono text-zinc-400">Loading overview...</span>
        </div>
      </div>
    )
  }

  const publishedCount = posts.filter((p) => p.variant?.status === 'PUBLISHED').length
  const draftCount = posts.filter((p) => p.variant?.status === 'DRAFT').length
  const scheduledCount = posts.filter((p) => p.variant?.status === 'SCHEDULED').length
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-mono font-medium text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {blog.subdomain}
            </span>
            {blog.customDomain && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono font-medium text-blue-700">
                <Globe className="h-3 w-3" />
                {blog.customDomain}
              </span>
            )}
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              {blog.defaultLanguage}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{blog.title}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {blog.description || 'Manage content, analytics, and publication settings'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              <span>Visit Site</span>
            </a>
          )}
          <Link
            href={`/blogs/${blogId}/settings`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition"
          >
            <Settings className="h-3.5 w-3.5 text-zinc-400" />
            <span>Settings</span>
          </Link>
          <Link
            href={`/blogs/${blogId}/posts/new`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards - Linear Style */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Posts */}
        <div className="group rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Total Posts
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200/80 transition">
              <FileText className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900">{posts.length}</span>
            <span className="text-xs text-zinc-400">articles</span>
          </div>
        </div>

        {/* Published */}
        <div className="group rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Published
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900">{publishedCount}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Live
            </span>
          </div>
        </div>

        {/* Drafts */}
        <div className="group rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
              In Draft
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition">
              <FileEdit className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900">{draftCount}</span>
            <span className="text-xs text-zinc-400">unpublished</span>
          </div>
        </div>

        {/* Scheduled / Status */}
        <div className="group rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Scheduled
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900">{scheduledCount}</span>
            <span className="text-xs text-zinc-400">queued</span>
          </div>
        </div>
      </div>

      {/* Quick Info & Health Banner */}
      <div className="rounded-xl border border-zinc-200/90 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800 p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-blue-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">
              TopLog Multi-Tenant Engine Active
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Serving posts with PostgreSQL 18 & Ktor 3 high-speed cached variants.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/blogs/${blogId}/analytics`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/20 transition"
          >
            <span>View Analytics</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/60">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
              Recent Posts
            </h2>
            <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-600">
              {posts.length}
            </span>
          </div>
          <Link
            href={`/blogs/${blogId}/posts`}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">No posts written yet</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Get started by drafting your first article with markdown or rich text.
            </p>
            <Link
              href={`/blogs/${blogId}/posts/new`}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Write First Post</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {recentPosts.map((p) => {
              const status = p.variant?.status || 'DRAFT'
              const postSlug = p.variant?.slug || ''
              const livePostUrl = publicUrl ? `${publicUrl}/${postSlug}` : null

              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/80 transition group"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/blogs/${blogId}/posts/${p.id}`}
                        className="font-medium text-zinc-900 hover:text-blue-600 text-sm truncate transition"
                      >
                        {p.variant?.title || 'Untitled Post'}
                      </Link>
                      {p.isFeatured && (
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
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
                      <span className="text-xs font-mono text-zinc-400">/{postSlug}</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span className="text-xs text-zinc-400">
                        {new Date(p.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {status === 'PUBLISHED' && livePostUrl && (
                      <a
                        href={livePostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition"
                        title="View live post"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link
                      href={`/blogs/${blogId}/posts/${p.id}`}
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
