'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Blog } from '@/lib/types'
import {
  Globe,
  Plus,
  LogOut,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  X,
  Users as UsersIcon,
  Shield,
} from 'lucide-react'

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

  const getPublicUrl = (b: Blog) => {
    if (typeof window === 'undefined') return '#'
    if (b.customDomain) return `https://${b.customDomain}`
    const host = window.location.hostname
    const proto = window.location.protocol
    const parts = host.split('.')
    let base = 'localhost'
    if (parts.length > 1 && !host.endsWith('localhost')) {
      base = parts.slice(1).join('.')
    }
    return `${proto}//${b.subdomain}.${base}`
  }

  if (authLoading || (loading && !blogs.length)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfcfd]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
          <span className="text-xs font-mono text-zinc-400">Loading publications...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col">
      {/* Sleek Top Navbar */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm shadow-sm ring-1 ring-zinc-700/60">
              <Sparkles className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900 text-sm tracking-tight">TopLog</span>
                <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-600">
                  Studio
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'ADMIN' && (
              <Link
                href="/users"
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50/50 px-2.5 py-1.5 text-xs font-semibold text-purple-700 shadow-sm hover:bg-purple-100/60 transition"
              >
                <Shield className="h-3.5 w-3.5 text-purple-600" />
                <span>Manage Users</span>
              </Link>
            )}

            <div className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1 rounded-full bg-zinc-100/80 border border-zinc-200 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-600 font-medium">{user?.name}</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                ({user?.role || 'Admin'})
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-red-600 transition"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your Publications</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Select a blog workspace to manage articles, localized variants, tags, and settings.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black transition self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Blog</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-xs font-mono text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center bg-white shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900">No blogs yet</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
              Get started by provisioning your first publication namespace with multilingual support.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
            >
              <Plus className="h-4 w-4" />
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => {
              const liveUrl = getPublicUrl(b)
              return (
                <div
                  key={b.id}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 text-[11px] font-mono font-medium text-zinc-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {b.subdomain}
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-zinc-400">
                        {b.defaultLanguage}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-zinc-900 tracking-tight group-hover:text-blue-600 transition">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {b.description || 'No description configured for this blog.'}
                    </p>

                    {b.customDomain && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-blue-600">
                        <Globe className="h-3 w-3" />
                        <span>{b.customDomain}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      href={`/blogs/${b.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-blue-600 transition"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Manage Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition"
                      title="Open Public Site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Create Blog Modal - Linear Style */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <h2 className="text-base font-bold text-zinc-900 tracking-tight">Create Publication</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Set up a new isolated multi-tenant blog instance.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {createError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs font-mono text-red-600 border border-red-200">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateBlog} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                  Blog Title
                </label>
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
                  placeholder="My Engineering Journal"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                  Subdomain Slug
                </label>
                <div className="flex rounded-lg border border-zinc-200 focus-within:border-zinc-900 focus-within:ring-1 focus-within:ring-zinc-900 overflow-hidden">
                  <input
                    type="text"
                    required
                    pattern="^[a-z0-9-]+$"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    placeholder="engineering"
                    className="w-full px-3 py-2 text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                  <span className="bg-zinc-50 px-3 py-2 text-xs font-mono text-zinc-400 flex items-center border-l border-zinc-200">
                    .localhost
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deep dives on backend systems, cloud infra, and web performance..."
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                  Default Language Code
                </label>
                <input
                  type="text"
                  required
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value.toLowerCase())}
                  placeholder="en"
                  className="w-24 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-mono uppercase text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg px-3.5 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
                >
                  {creating ? 'Creating...' : 'Create Publication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
