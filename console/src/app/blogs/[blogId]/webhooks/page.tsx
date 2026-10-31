'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Webhook, WebhookDelivery, TestWebhookResult } from '@/lib/types'
import {
  Webhook as WebhookIcon,
  Plus,
  Play,
  History,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const AVAILABLE_EVENTS = [
  { id: 'post.published', label: 'Post Published', desc: 'Triggered when a post or variant is published' },
  { id: 'post.updated', label: 'Post Updated', desc: 'Triggered when an existing post draft or variant is modified' },
  { id: 'post.deleted', label: 'Post Deleted', desc: 'Triggered when a post is removed' },
]

export default function WebhooksPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null)
  const [modalUrl, setModalUrl] = useState('')
  const [modalSecret, setModalSecret] = useState('')
  const [modalEvents, setModalEvents] = useState<string[]>([
    'post.published',
    'post.updated',
    'post.deleted',
  ])
  const [modalIsActive, setModalIsActive] = useState(true)
  const [saving, setSaving] = useState(false)

  // Test Ping State
  const [testingId, setTestingId] = useState<number | null>(null)
  const [testResult, setTestResult] = useState<{
    webhookId: number
    result: TestWebhookResult
  } | null>(null)

  // Deliveries History Modal State
  const [activeHistoryWebhook, setActiveHistoryWebhook] = useState<Webhook | null>(null)
  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([])
  const [loadingDeliveries, setLoadingDeliveries] = useState(false)
  const [expandedDeliveryId, setExpandedDeliveryId] = useState<number | null>(null)

  const loadWebhooks = async () => {
    try {
      const data = await api.webhooks.list(blogId)
      setWebhooks(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load webhooks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWebhooks()
  }, [blogId])

  const openCreateModal = () => {
    setEditingWebhook(null)
    setModalUrl('')
    setModalSecret('')
    setModalEvents(['post.published', 'post.updated', 'post.deleted'])
    setModalIsActive(true)
    setShowModal(true)
  }

  const openEditModal = (wh: Webhook) => {
    setEditingWebhook(wh)
    setModalUrl(wh.url)
    setModalSecret(wh.secret)
    setModalEvents(wh.events)
    setModalIsActive(wh.isActive)
    setShowModal(true)
  }

  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalUrl.trim()) return

    setSaving(true)
    setError('')
    setMessage('')

    try {
      if (editingWebhook) {
        const updated = await api.webhooks.update(blogId, editingWebhook.id, {
          url: modalUrl.trim(),
          secret: modalSecret.trim() || undefined,
          events: modalEvents,
          isActive: modalIsActive,
        })
        setWebhooks((prev) =>
          prev.map((w) => (w.id === updated.id ? updated : w))
        )
        setMessage('Webhook updated successfully!')
      } else {
        const created = await api.webhooks.create(blogId, {
          url: modalUrl.trim(),
          secret: modalSecret.trim() || undefined,
          events: modalEvents,
          isActive: modalIsActive,
        })
        setWebhooks((prev) => [created, ...prev])
        setMessage('Webhook created successfully!')
      }
      setShowModal(false)
    } catch (err: any) {
      setError(err.message || 'Failed to save webhook')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteWebhook = async (whId: number) => {
    if (!confirm('Are you sure you want to delete this webhook?')) return
    try {
      await api.webhooks.delete(blogId, whId)
      setWebhooks((prev) => prev.filter((w) => w.id !== whId))
      setMessage('Webhook deleted!')
    } catch (err: any) {
      setError(err.message || 'Failed to delete webhook')
    }
  }

  const handleTestPing = async (whId: number) => {
    setTestingId(whId)
    setTestResult(null)
    setError('')
    try {
      const res = await api.webhooks.test(blogId, whId)
      setTestResult({ webhookId: whId, result: res })
    } catch (err: any) {
      setError(err.message || 'Failed to send test ping')
    } finally {
      setTestingId(null)
    }
  }

  const openDeliveriesModal = async (wh: Webhook) => {
    setActiveHistoryWebhook(wh)
    setLoadingDeliveries(true)
    setDeliveries([])
    setExpandedDeliveryId(null)
    try {
      const list = await api.webhooks.deliveries(blogId, wh.id)
      setDeliveries(list)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deliveries')
    } finally {
      setLoadingDeliveries(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setMessage('Copied secret to clipboard!')
    setTimeout(() => setMessage(''), 3000)
  }

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
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <WebhookIcon className="h-6 w-6 text-blue-600" />
            Outgoing Webhooks
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Send real-time HTTP payloads to external endpoints (Zapier, n8n, Slack, Discord, or your API) with HMAC-SHA256 signatures.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition w-fit"
        >
          <Plus className="h-4 w-4" />
          Add Webhook
        </button>
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

      {/* Webhooks List */}
      {webhooks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <WebhookIcon className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No Webhooks Configured</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Connect your blog to external automation tools to receive instant notifications when posts are published or updated.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Create Your First Webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {webhooks.map((wh) => (
            <div
              key={wh.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        wh.isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {wh.isActive ? 'Active' : 'Disabled'}
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-900 break-all">
                      {wh.url}
                    </span>
                  </div>

                  {/* Events Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {wh.events.map((ev) => (
                      <span
                        key={ev}
                        className="rounded bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 text-xs font-mono font-medium"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button
                    onClick={() => handleTestPing(wh.id)}
                    disabled={testingId === wh.id}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition"
                    title="Send immediate test ping payload"
                  >
                    <Play className="h-3.5 w-3.5 text-emerald-600" />
                    {testingId === wh.id ? 'Sending...' : 'Test Ping'}
                  </button>

                  <button
                    onClick={() => openDeliveriesModal(wh)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                    title="View delivery logs & payloads"
                  >
                    <History className="h-3.5 w-3.5 text-indigo-600" />
                    Logs
                  </button>

                  <button
                    onClick={() => openEditModal(wh)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition"
                    title="Edit Webhook"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteWebhook(wh.id)}
                    className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 transition"
                    title="Delete Webhook"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Secret display & Test result banner */}
              <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-1.5 font-mono bg-slate-50 px-2.5 py-1 rounded border border-slate-200 w-fit">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-slate-400">Secret:</span>
                  <span className="font-semibold text-slate-700">{wh.secret}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(wh.secret)}
                    className="text-slate-400 hover:text-slate-600 ml-1"
                    title="Copy Secret"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>

                <span className="text-[11px] text-slate-400">
                  Headers: <code className="text-slate-600">X-Webhook-Signature: sha256=...</code>
                </span>
              </div>

              {/* Test Result Banner */}
              {testResult?.webhookId === wh.id && (
                <div
                  className={`rounded-lg p-3 text-xs border ${
                    testResult.result.success
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1.5">
                      {testResult.result.success ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      Test Ping {testResult.result.success ? 'Delivered' : 'Failed'}
                    </span>
                    <span className="font-mono text-[11px]">
                      HTTP {testResult.result.statusCode || 'N/A'} • {testResult.result.durationMs}ms
                    </span>
                  </div>
                  {testResult.result.errorMessage && (
                    <p className="mt-1 font-mono text-[11px] text-red-600">
                      Error: {testResult.result.errorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingWebhook ? 'Edit Webhook' : 'Add New Webhook'}
            </h3>
            <p className="text-xs text-slate-500">
              We will send a POST request with an HMAC-SHA256 signature whenever the chosen events fire.
            </p>

            <form onSubmit={handleSaveWebhook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Payload URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/api/webhooks/blog"
                  value={modalUrl}
                  onChange={(e) => setModalUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Signing Secret (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Leave empty to auto-generate a secure random key"
                  value={modalSecret}
                  onChange={(e) => setModalSecret(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                  Subscribed Events
                </label>
                <div className="space-y-2">
                  {AVAILABLE_EVENTS.map((ev) => {
                    const checked = modalEvents.includes(ev.id)
                    return (
                      <label
                        key={ev.id}
                        className="flex items-start gap-2.5 rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setModalEvents((prev) => [...prev, ev.id])
                            } else {
                              setModalEvents((prev) =>
                                prev.filter((id) => id !== ev.id)
                              )
                            }
                          }}
                          className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="block text-xs font-bold text-slate-800">
                            {ev.label} <code className="text-slate-400 font-normal">({ev.id})</code>
                          </span>
                          <span className="block text-[11px] text-slate-500">
                            {ev.desc}
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalIsActive}
                    onChange={(e) => setModalIsActive(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Enable webhook immediately
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || modalEvents.length === 0}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingWebhook ? 'Update Webhook' : 'Create Webhook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deliveries History Modal */}
      {activeHistoryWebhook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <History className="h-4 w-4 text-indigo-600" />
                  Recent Webhook Deliveries
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-lg">
                  {activeHistoryWebhook.url}
                </p>
              </div>
              <button
                onClick={() => setActiveHistoryWebhook(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {loadingDeliveries ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                </div>
              ) : deliveries.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No delivery logs recorded yet. Try sending a &quot;Test Ping&quot; or publishing a post!
                </div>
              ) : (
                deliveries.map((del) => {
                  const isExpanded = expandedDeliveryId === del.id
                  const isSuccess = del.responseStatus && del.responseStatus >= 200 && del.responseStatus < 300
                  return (
                    <div
                      key={del.id}
                      className="rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden text-xs"
                    >
                      <button
                        onClick={() => setExpandedDeliveryId(isExpanded ? null : del.id)}
                        className="w-full p-3 flex items-center justify-between hover:bg-slate-100/60 transition text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold font-mono ${
                              isSuccess
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {del.responseStatus || 'ERR'}
                          </span>
                          <span className="font-mono font-semibold text-slate-800">
                            {del.event}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                          <span>{del.durationMs}ms</span>
                          <span>{new Date(del.createdAt).toLocaleTimeString()}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-3 border-t border-slate-200 bg-white space-y-3 font-mono text-[11px]">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              Payload Sent:
                            </span>
                            <pre className="p-2.5 rounded bg-slate-900 text-slate-200 overflow-x-auto text-[11px]">
                              {(() => {
                                try {
                                  return JSON.stringify(JSON.parse(del.payload), null, 2)
                                } catch {
                                  return del.payload
                                }
                              })()}
                            </pre>
                          </div>

                          {del.responseBody && (
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Response Body:
                              </span>
                              <pre className="p-2.5 rounded bg-slate-100 text-slate-700 overflow-x-auto text-[11px]">
                                {del.responseBody}
                              </pre>
                            </div>
                          )}

                          {del.errorMessage && (
                            <div>
                              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                                Delivery Error:
                              </span>
                              <div className="p-2 rounded bg-red-50 text-red-700">
                                {del.errorMessage}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
