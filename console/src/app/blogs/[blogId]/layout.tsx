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

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (blogId && user) {
      api.blogs
        .get(blogId)
        .then(setBlog)
        .catch((err) => console.error('Failed to load blog', err))
        .finally(() => setLoading(false))
    }
  }, [blogId, user])

  const navItems = [
    {
      label: 'Overview',
      href: `/blogs/${blogId}`,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Posts',
      href: `/blogs/${blogId}/posts`,
      icon: FileText,
      exact: false,
    },
    {
      label: 'Analytics',
      href: `/blogs/${blogId}/analytics`,
      icon: BarChart2,
      exact: false,
    },
    {
      label: 'Tags',
      href: `/blogs/${blogId}/tags`,
      icon: TagIcon,
      exact: false,
    },
    {
      label: 'Comments',
      href: `/blogs/${blogId}/comments`,
      icon: MessageSquare,
      exact: false,
    },
    {
      label: 'Subscribers',
      href: `/blogs/${blogId}/subscribers`,
      icon: Users,
      exact: false,
    },
    {
      label: 'Team',
      href: `/blogs/${blogId}/team`,
      icon: Shield,
      exact: false,
    },
    {
      label: 'Webhooks',
      href: `/blogs/${blogId}/webhooks`,
      icon: WebhookIcon,
      exact: false,
    },
    {
      label: 'Import',
      href: `/blogs/${blogId}/import`,
      icon: FileUp,
      exact: false,
    },
    {
      label: 'Settings',
      href: `/blogs/${blogId}/settings`,
      icon: Settings,
      exact: false,
    },
  ]

  if (authLoading || (loading && !blog)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  const publicUrl = blog?.customDomain
    ? `http://${blog.customDomain}`
    : `http://${blog?.subdomain}.localhost`

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between fixed inset-y-0 z-10">
        <div>
          {/* Blog Header in Sidebar */}
          <div className="p-4 border-b border-slate-200">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> All Blogs
            </Link>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 truncate" title={blog?.title}>
                {blog?.title}
              </h2>
            </div>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate"
            >
              <Globe className="h-3 w-3 shrink-0" />
              <span className="truncate">{blog?.subdomain}.localhost</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User profile / Logout */}
        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center justify-between p-2">
            <div className="truncate pr-2">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64">
        {children}
      </div>
    </div>
  )
}
