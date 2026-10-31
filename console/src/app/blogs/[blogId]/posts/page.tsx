'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostListItem } from '@/lib/types'
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  FileText,
  Star,
} from 'lucide-react'

export default function PostsListPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const fetchPosts = async () => {
    try {
      const [b, p] = await Promise.all([
        api.blogs.get(blogId),
        api.posts.list(blogId),
      ])
      setBlog(b)
      setPosts(p)
    } catch (err) {
      console.error(err)
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

  if (loading || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Posts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, and publish posts and localized variants
          </p>
        </div>
        <Link
          href={`/blogs/${blogId}/posts/new`}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'PUBLISHED', 'SCHEDULED', 'DRAFT'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition ${
                statusFilter === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-base font-medium text-slate-900">No posts found</p>
            <p className="text-sm text-slate-500 mt-1">
              {search || statusFilter !== 'ALL'
                ? 'Try adjusting your filters or search query.'
                : 'Get started by creating your first post.'}
            </p>
            {!search && statusFilter === 'ALL' && (
              <Link
                href={`/blogs/${blogId}/posts/new`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
              >
                <Plus className="h-4 w-4" />
                Write Post
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Language</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((p) => {
                  const title = p.variant?.title || 'Untitled'
                  const slug = p.variant?.slug || ''
                  const status = p.variant?.status || 'DRAFT'
                  const lang = p.variant?.languageCode || blog.defaultLanguage

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {p.isFeatured && (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                          <div>
                            <Link
                              href={`/blogs/${blogId}/posts/${p.id}`}
                              className="font-semibold text-slate-900 hover:text-blue-600 text-base"
                            >
                              {title}
                            </Link>
                            <p className="text-xs text-slate-400 mt-0.5">/{slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col items-start gap-1">
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
                          {status === 'SCHEDULED' && p.variant?.scheduledAt && (
                            <span className="text-[10px] text-purple-600 font-mono">
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
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-medium text-slate-700 uppercase">
                          {lang}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-xs">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {status === 'PUBLISHED' && (
                            <a
                              href={`http://${blog.subdomain}.localhost/${slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                              title="View Live"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Link
                            href={`/blogs/${blogId}/posts/${p.id}`}
                            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition"
                            title="Edit Post"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, title)}
                            className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                            title="Delete Post"
                          >
                            <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
