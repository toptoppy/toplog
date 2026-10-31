'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Comment, CommentStatus } from '@/lib/types'
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react'

export default function CommentsPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'ALL' | CommentStatus>('ALL')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadComments = async (filterStatus?: CommentStatus) => {
    setLoading(true)
    try {
      const res = await api.comments.list(blogId, filterStatus)
      setComments(res)
    } catch (err: any) {
      setError(err.message || 'Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (blogId) {
      loadComments(statusFilter === 'ALL' ? undefined : statusFilter)
    }
  }, [blogId, statusFilter])

  const handleUpdateStatus = async (commentId: number, newStatus: CommentStatus) => {
    try {
      await api.comments.updateStatus(blogId, commentId, newStatus)
      setMessage(`Comment marked as ${newStatus}`)
      loadComments(statusFilter === 'ALL' ? undefined : statusFilter)
    } catch (err: any) {
      setError(err.message || 'Failed to update comment status')
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      await api.comments.delete(blogId, commentId)
      setMessage('Comment deleted successfully')
      loadComments(statusFilter === 'ALL' ? undefined : statusFilter)
    } catch (err: any) {
      setError(err.message || 'Failed to delete comment')
    }
  }

  const filtered = comments.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      c.authorName.toLowerCase().includes(q) ||
      c.authorEmail.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q) ||
      (c.postTitle && c.postTitle.toLowerCase().includes(q))
    )
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Comments & Moderation
              </h1>
              <p className="text-sm text-slate-500">
                Review reader replies, moderate spam, and engage with your audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
          {message}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by author, content, or post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['ALL', 'PENDING', 'APPROVED', 'SPAM'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition ${
                statusFilter === s
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-base font-medium text-slate-900">No comments found</p>
            <p className="text-sm text-slate-400 mt-1">
              {search || statusFilter !== 'ALL'
                ? 'Try adjusting your filters.'
                : 'Reader comments on your blog posts will appear here for review.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((comment) => (
              <div
                key={comment.id}
                className="p-6 hover:bg-slate-50 transition flex flex-col md:flex-row items-start justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900 text-sm">
                      {comment.authorName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      &lt;{comment.authorEmail}&gt;
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                        comment.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : comment.status === 'SPAM'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {comment.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-sans">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>
                      On post:{' '}
                      <Link
                        href={`/blogs/${blogId}/posts/${comment.postId}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {comment.postTitle || `Post #${comment.postId}`}
                      </Link>
                    </span>
                    <span>•</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {comment.status !== 'APPROVED' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(comment.id, 'APPROVED')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition shadow-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </button>
                  )}

                  {comment.status !== 'SPAM' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(comment.id, 'SPAM')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700 transition"
                      title="Mark as Spam"
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Spam
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                    title="Delete Comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
