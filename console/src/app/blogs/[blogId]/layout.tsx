'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Blog } from '@/lib/types'
import {
  FileText,
  Tag as TagIcon,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LogOut,
  Webhook as WebhookIcon,
  FileUp,
  Users,
  BarChart2,
  MessageSquare,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const blogId = Number(params.blogId)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [publicUrl, setPublicUrl] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (blogId && user) {
      api.blogs
        .get(blogId)
        .then((b) => {
          setBlog(b)
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
        })
        .catch((err) => console.error('Failed to load blog', err))
        .finally(() => setLoading(false))
    }
  }, [blogId, user])

  const navSections = [
    {
      title: 'CONTENT',
      items: [
        { label: 'Overview', href: `/blogs/${blogId}`, icon: LayoutDashboard, exact: true },
        { label: 'Posts', href: `/blogs/${blogId}/posts`, icon: FileText, exact: false },
        { label: 'Media', href: `/blogs/${blogId}/media`, icon: ImageIcon, exact: false },
        { label: 'Tags', href: `/blogs/${blogId}/tags`, icon: TagIcon, exact: false },
        { label: 'Comments', href: `/blogs/${blogId}/comments`, icon: MessageSquare, exact: false },
      ],
    },
    {
      title: 'GROWTH',
      items: [
        { label: 'Analytics', href: `/blogs/${blogId}/analytics`, icon: BarChart2, exact: false },
        { label: 'Subscribers', href: `/blogs/${blogId}/subscribers`, icon: Users, exact: false },
        { label: 'Webhooks', href: `/blogs/${blogId}/webhooks`, icon: WebhookIcon, exact: false },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Team', href: `/blogs/${blogId}/team`, icon: Shield, exact: false },
        { label: 'Import', href: `/blogs/${blogId}/import`, icon: FileUp, exact: false },
        { label: 'Settings', href: `/blogs/${blogId}/settings`, icon: Settings, exact: false },
        ...(user?.role === 'ADMIN'
          ? [{ label: 'Platform Users', href: '/users', icon: Users, exact: false }]
          : []),
      ],
    },
  ]

  if (authLoading || (loading && !blog)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
          <span className="text-xs font-mono text-zinc-500">Loading TopLog Studio...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      {/* Sleek Linear/Vercel Obsidian Sidebar */}
      <aside className="w-64 bg-[#09090b] border-r border-zinc-800/80 flex flex-col justify-between fixed inset-y-0 z-20 select-none">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-4 border-b border-zinc-800/80">
            <div className="flex items-center justify-between mb-3">
              <Link
                href="/blogs"
                className="group flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800 border border-zinc-700/60 group-hover:border-zinc-500">
                  <ChevronLeft className="h-3 w-3" />
                </div>
                <span>All Blogs</span>
              </Link>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-medium text-zinc-400">
                <Sparkles className="h-3 w-3 text-blue-400" />
                v1.0
              </div>
            </div>

            {/* Current Active Tenant Card */}
            <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/90 p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-sm">
                  {blog?.title?.charAt(0).toUpperCase() || 'T'}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-zinc-100 truncate tracking-tight">
                    {blog?.title}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <a
                      href={publicUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-blue-400 truncate transition"
                    >
                      <span className="truncate">{blog?.subdomain}</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover/link:opacity-100" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Sections */}
          <nav className="flex-1 p-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.title}>
                <div className="px-3 mb-1.5 text-[10px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = item.exact
                      ? pathname === item.href
                      : pathname === item.href || (item.href !== `/blogs/${blogId}` && pathname.startsWith(item.href))
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? 'bg-zinc-800/90 text-white shadow-sm ring-1 ring-zinc-700/60 font-semibold'
                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            active ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        />
                        <span>{item.label}</span>
                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Footer */}
          <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40">
            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-900/60 transition">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700/60 text-xs font-medium text-zinc-200">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-zinc-200 truncate leading-none">
                    {user?.name}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-400 inline-block mt-0.5 uppercase tracking-wide">
                    {user?.role || 'Admin'}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 pl-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
