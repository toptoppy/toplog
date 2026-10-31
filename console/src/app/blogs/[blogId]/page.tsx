'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, PostListItem } from '@/lib/types'
import { FileText, Plus, Globe, CheckCircle2, FileEdit, ArrowUpRight } from 'lucide-react'

export default function BlogOverviewPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
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
    loadData()
  }, [blogId])

  if (loading || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  const publishedCount = posts.filter((p) => p.variant?.status === 'PUBLISHED').length
  const draftCount = posts.filter((p) => p.variant?.status === 'DRAFT').length
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{blog.title}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {blog.description || 'Welcome to your blog dashboard'}
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

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Posts
            </span>
            <FileText className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{posts.length}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Published
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{publishedCount}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Drafts
            </span>
            <FileEdit className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{draftCount}</p>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="font-semibold text-slate-900">Recent Posts</h2>
          <Link
            href={`/blogs/${blogId}/posts`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all ({posts.length}) &rarr;
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>No posts written yet.</p>
            <Link
              href={`/blogs/${blogId}/posts/new`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
            >
              Write your first post &rarr;
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentPosts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
              >
                <div>
                  <Link
                    href={`/blogs/${blogId}/posts/${p.id}`}
                    className="font-medium text-slate-900 hover:text-blue-600 text-base"
                  >
                    {p.variant?.title || 'Untitled Post'}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase ${
                        p.variant?.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.variant?.status || 'DRAFT'}
                    </span>
                    <span className="text-xs text-slate-400">/{p.variant?.slug}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {p.variant?.status === 'PUBLISHED' && (
                    <a
                      href={`http://${blog.subdomain}.localhost/${p.variant.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 p-1"
                      title="View live post"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  <Link
                    href={`/blogs/${blogId}/posts/${p.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
