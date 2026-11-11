'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Tag } from '@/lib/types'
import { Plus, Tag as TagIcon, Trash2, Edit2, Check, X, Palette } from 'lucide-react'

const TAG_COLOR_PRESETS = [
  { name: 'Slate', value: '#64748B' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Amber', value: '#D97706' },
  { name: 'Rose', value: '#E11D48' },
  { name: 'Cyan', value: '#0891B2' },
  { name: 'Indigo', value: '#4F46E5' },
]

export default function TagsPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [tags, setTags] = useState<Tag[]>([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState('#2563EB')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  // Editing Tag State
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [editName, setEditName] = useState('')
  const [editSlug, setEditSlug] = useState('')
  const [editColor, setEditColor] = useState('')
  const [updating, setUpdating] = useState(false)

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
      const created = await api.tags.create(blogId, {
        name: name.trim(),
        slug: slug.trim(),
        color: color || undefined,
      })
      setTags((prev) => [...prev, created])
      setName('')
      setSlug('')
    } catch (err: any) {
      setError(err.message || 'Failed to create tag')
    } finally {
      setCreating(false)
    }
  }

  const startEdit = (tag: Tag) => {
    setEditingTag(tag)
    setEditName(tag.name)
    setEditSlug(tag.slug)
    setEditColor(tag.color || '#2563EB')
  }

  const cancelEdit = () => {
    setEditingTag(null)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTag || !editName.trim() || !editSlug.trim()) return

    setUpdating(true)
    try {
      const updated = await api.tags.update(blogId, editingTag.id, {
        name: editName.trim(),
        slug: editSlug.trim(),
        color: editColor || undefined,
      })
      setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
      setEditingTag(null)
    } catch (err: any) {
      alert(err.message || 'Failed to update tag')
    } finally {
      setUpdating(false)
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tags & Taxonomy</h1>
        <p className="text-sm text-slate-500 mt-1">
          Organize your posts into categories with custom color badges and navigation pills.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Create Tag Card */}
      <form
        onSubmit={handleCreate}
        className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="w-full sm:flex-1">
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
              Tag Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Architecture"
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
              placeholder="e.g. architecture"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition shrink-0 h-[38px]"
          >
            <Plus className="h-4 w-4" />
            Add Tag
          </button>
        </div>

        {/* Color Palette Swatches */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Palette className="h-3.5 w-3.5" /> Badge Color:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {TAG_COLOR_PRESETS.map((p) => {
              const active = color === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setColor(p.value)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition border ${
                    active
                      ? 'border-slate-800 bg-slate-50 font-semibold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: p.value }}
                  />
                  <span>{p.name}</span>
                </button>
              )
            })}
          </div>

          {/* Badge Preview */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">Preview:</span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${color}15`,
                color: color,
                border: `1px solid ${color}40`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              #{name.trim() || 'preview'}
            </span>
          </div>
        </div>
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
            {tags.map((t) => {
              const isEditing = editingTag?.id === t.id
              const tagColor = t.color || '#64748B'

              if (isEditing) {
                return (
                  <form
                    key={t.id}
                    onSubmit={handleUpdate}
                    className="p-4 bg-slate-50 flex flex-col gap-3"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Tag Name"
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1 min-w-[120px]"
                        required
                      />
                      <input
                        type="text"
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value.toLowerCase())}
                        placeholder="Tag Slug"
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 bg-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1 min-w-[120px]"
                        required
                      />
                      <div className="flex items-center gap-1">
                        {TAG_COLOR_PRESETS.map((p) => (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => setEditColor(p.value)}
                            title={p.name}
                            className={`h-5 w-5 rounded-full transition border ${
                              editColor === p.value
                                ? 'scale-125 border-slate-900 shadow-xs'
                                : 'border-transparent'
                            }`}
                            style={{ backgroundColor: p.value }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          type="submit"
                          disabled={updating}
                          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )
              }

              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${tagColor}15`,
                        color: tagColor,
                        border: `1px solid ${tagColor}40`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tagColor }} />
                      #{t.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/tag/{t.slug}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(t)}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition"
                      title="Edit Tag"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id, t.name)}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Delete Tag"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
