'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Tag } from '@/lib/types'
import { Plus, Tag as TagIcon, Trash2 } from 'lucide-react'

export default function TagsPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [tags, setTags] = useState<Tag[]>([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const fetchTags = async () => {
    try {
      const data = await api.tags.list(blogId)
      setTags(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load tags')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [blogId])

  const handleNameChange = (val: string) => {
    setName(val)
    if (!slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      )
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return

    setCreating(true)
    setError('')

    try {
      const created = await api.tags.create(blogId, { name, slug })
      setTags((prev) => [...prev, created])
      setName('')
      setSlug('')
    } catch (err: any) {
      setError(err.message || 'Failed to create tag')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (tagId: number, tagName: string) => {
    if (!confirm(`Delete tag "${tagName}"?`)) return

    try {
      await api.tags.delete(blogId, tagId)
      setTags((prev) => prev.filter((t) => t.id !== tagId))
    } catch (err: any) {
      alert(err.message || 'Failed to delete tag')
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tags</h1>
        <p className="text-sm text-slate-500 mt-1">
          Organize your posts into categories and searchable taxonomy
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Create Tag Card */}
      <form onSubmit={handleCreate} className="mb-8 flex flex-col sm:flex-row items-end gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="w-full sm:flex-1">
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            Tag Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Technology"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="w-full sm:flex-1">
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            Tag Slug
          </label>
          <input
            type="text"
            required
            placeholder="e.g. technology"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Tag
        </button>
      </form>

      {/* Tags List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {tags.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <TagIcon className="mx-auto h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm">No tags created yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tags.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-900 text-sm">{t.name}</span>
                  <span className="text-xs text-slate-400 font-mono">/tag/{t.slug}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id, t.name)}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete Tag"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
