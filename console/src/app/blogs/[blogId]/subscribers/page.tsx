'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Subscriber, Newsletter } from '@/lib/types'
import {
  Users,
  Plus,
  Mail,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
  Calendar,
  UserCheck,
  UserX,
  History,
} from 'lucide-react'

export default function SubscribersPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [activeTab, setActiveTab] = useState<'subscribers' | 'history'>('subscribers')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Add Subscriber Modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)

  const fetchData = async () => {
    try {
      const [subs, news] = await Promise.all([
        api.subscribers.list(blogId),
        api.newsletters.list(blogId),
      ])
      setSubscribers(subs)
      setNewsletters(news)
    } catch (err: any) {
      setError(err.message || 'Failed to load subscribers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [blogId])

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim()) return

    setAdding(true)
    setError('')
    setMessage('')

    try {
      const created = await api.subscribers.create(blogId, {
        email: newEmail.trim(),
        name: newName.trim() || undefined,
        status: 'ACTIVE',
      })
      setSubscribers((prev) => [created, ...prev])
      setShowAddModal(false)
      setNewEmail('')
      setNewName('')
      setMessage('Subscriber added successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to add subscriber')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteSubscriber = async (subId: number) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    try {
      await api.subscribers.delete(blogId, subId)
      setSubscribers((prev) => prev.filter((s) => s.id !== subId))
      setMessage('Subscriber removed.')
    } catch (err: any) {
      setError(err.message || 'Failed to delete subscriber')
    }
  }

  const activeCount = subscribers.filter((s) => s.status === 'ACTIVE').length
  const unsubscribedCount = subscribers.filter((s) => s.status === 'UNSUBSCRIBED').length

  const filteredSubscribers = subscribers.filter((s) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      s.email.toLowerCase().includes(q) ||
      (s.name && s.name.toLowerCase().includes(q))
    )
  })

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Members & Newsletters
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your audience, collect email subscribers, and monitor dispatched campaigns.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition w-fit"
        >
          <Plus className="h-4 w-4" />
          Add Subscriber
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase mb-1">
            <span>Total Audience</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{subscribers.length}</div>
          <div className="text-xs text-slate-400 mt-1">Registered email subscribers</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase mb-1">
            <span>Active Subscribers</span>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{activeCount}</div>
          <div className="text-xs text-slate-400 mt-1">{unsubscribedCount} unsubscribed</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase mb-1">
            <span>Newsletters Sent</span>
            <Mail className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{newsletters.length}</div>
          <div className="text-xs text-slate-400 mt-1">Dispatched to subscribers</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('subscribers')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'subscribers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          Subscribers ({subscribers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="h-4 w-4" />
          Campaign History ({newsletters.length})
        </button>
      </div>

      {/* Tab 1: Subscribers List */}
      {activeTab === 'subscribers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-1.5 pl-9 pr-3 text-xs focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {filteredSubscribers.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                {subscribers.length === 0
                  ? 'No subscribers yet. Readers can subscribe directly from your blog footer!'
                  : 'No subscribers match your search filter.'}
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="p-3.5 pl-5">Subscriber</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Subscribed Date</th>
                    <th className="p-3.5 pr-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3.5 pl-5">
                        <div className="font-semibold text-slate-900">{sub.email}</div>
                        {sub.name && (
                          <div className="text-[11px] text-slate-400">{sub.name}</div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            sub.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {sub.status === 'ACTIVE' ? (
                            <UserCheck className="h-3 w-3" />
                          ) : (
                            <UserX className="h-3 w-3" />
                          )}
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="rounded p-1 text-slate-400 hover:text-red-600 transition"
                          title="Delete subscriber"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Campaign History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {newsletters.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                <Mail className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p>No newsletters sent yet.</p>
                <p className="text-xs text-slate-400 mt-1">
                  You can dispatch an email newsletter to your active subscribers directly from the Post Studio!
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="p-3.5 pl-5">Subject</th>
                    <th className="p-3.5">Recipients</th>
                    <th className="p-3.5 pr-5">Dispatched At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {newsletters.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3.5 pl-5 font-semibold text-slate-900">
                        {n.subject}
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">
                        {n.recipientCount} subscriber(s)
                      </td>
                      <td className="p-3.5 pr-5 text-slate-500">
                        {new Date(n.sentAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New Subscriber</h3>
            <p className="text-xs text-slate-500">
              Manually register a reader into this blog&apos;s active newsletter audience.
            </p>

            <form onSubmit={handleAddSubscriber} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="subscriber@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Alex Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={adding}
                  className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding || !newEmail.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {adding ? 'Adding...' : 'Add Subscriber'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
