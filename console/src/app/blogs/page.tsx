'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Blog } from '@/lib/types'
import { Globe, Plus, LogOut, ExternalLink, Settings, BookOpen } from 'lucide-react'

export default function BlogsPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Create Modal state
  const [showModal, setShowModal] = useState(false)
  const [subdomain, setSubdomain] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [defaultLanguage, setDefaultLanguage] = useState('en')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  const fetchBlogs = async () => {
    try {
      const data = await api.blogs.list()
      setBlogs(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBlogs()
    }
  }, [user])

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateError('')
    setCreating(true)

    try {
      const newBlog = await api.blogs.create({
        subdomain,
        title,
        description,
        defaultLanguage,
      })
      setShowModal(false)
      setSubdomain('')
      setTitle('')
      setDescription('')
      router.push(`/blogs/${newBlog.id}`)
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create blog')
    } finally {
      setCreating(false)
    }
  }

  if (authLoading || (loading && !blogs.length)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="font-semibold text-slate-900 text-lg">Blog Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Welcome, <strong className="text-slate-900">{user?.name}</strong>
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your Blogs</h1>
            <p className="text-sm text-slate-500 mt-1">Select a blog to manage posts, variants, and settings</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Create Blog
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center bg-white">
            <Globe className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No blogs yet</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              Get started by creating your first blog to publish multilingual posts.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {b.subdomain}.localhost
                    </span>
                    <span className="text-xs uppercase font-semibold text-slate-400">
                      {b.defaultLanguage}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{b.title}</h3>
                  {b.description && (
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{b.description}</p>
                  )}
                  {b.customDomain && (
                    <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {b.customDomain}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/blogs/${b.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <BookOpen className="h-4 w-4" />
                    Manage Blog &rarr;
                  </Link>
                  <a
                    href={`http://${b.subdomain}.localhost`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="View Public Site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">Create a New Blog</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Choose a title and subdomain for your new blog.
            </p>

            {createError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateBlog} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Blog Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (!subdomain) {
                      setSubdomain(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-+|-+$/g, '')
                      )
                    }
                  }}
                  placeholder="My Tech Journal"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subdomain</label>
                <div className="flex rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 overflow-hidden">
                  <input
                    type="text"
                    required
                    pattern="^[a-z0-9-]+$"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    placeholder="my-tech-journal"
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                  />
                  <span className="bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500 flex items-center border-l border-slate-200">
                    .localhost
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Articles about software engineering, devops, and cloud..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Language Code</label>
                <input
                  type="text"
                  required
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value.toLowerCase())}
                  placeholder="en"
                  className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 uppercase"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {creating ? 'Creating...' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
