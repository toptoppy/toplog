'use client'

import React from 'react'

interface AddLanguageModalProps {
  isOpen: boolean
  onClose: () => void
  newLangCode: string
  setNewLangCode: (code: string) => void
  onAdd: () => void
}

export default function AddLanguageModal({
  isOpen,
  onClose,
  newLangCode,
  setNewLangCode,
  onAdd,
}: AddLanguageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        <h3 className="text-base font-bold text-zinc-900 tracking-tight">Add Language Variant</h3>
        <p className="text-xs text-zinc-500 mt-1">
          Create a localized translation for this post.
        </p>

        <div className="mt-4">
          <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
            ISO Language Code
          </label>
          <input
            type="text"
            autoFocus
            maxLength={5}
            placeholder="e.g. es, fr, de, th, ja"
            value={newLangCode}
            onChange={(e) => setNewLangCode(e.target.value.toLowerCase())}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs font-mono uppercase text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
          >
            Add Variant
          </button>
        </div>
      </div>
    </div>
  )
}
