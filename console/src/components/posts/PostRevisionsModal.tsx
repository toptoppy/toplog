'use client'

import React from 'react'
import { History, X, RotateCcw } from 'lucide-react'
import { PostRevision } from '@/lib/types'

interface PostRevisionsModalProps {
  isOpen: boolean
  onClose: () => void
  activeLang: string
  loadingRevisions: boolean
  revisions: PostRevision[]
  selectedRevision: PostRevision | null
  setSelectedRevision: (rev: PostRevision) => void
  restoringRevision: boolean
  onRestore: () => void
}

export default function PostRevisionsModal({
  isOpen,
  onClose,
  activeLang,
  loadingRevisions,
  revisions,
  selectedRevision,
  setSelectedRevision,
  restoringRevision,
  onRestore,
}: PostRevisionsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-zinc-600" />
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">
              Version History ({activeLang.toUpperCase()})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {loadingRevisions ? (
            <div className="py-12 text-center text-xs font-mono text-zinc-400">
              Loading snapshots...
            </div>
          ) : revisions.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">
              No historical snapshots recorded yet for this language variant.
            </div>
          ) : (
            revisions.map((rev) => {
              const isSelected = selectedRevision?.id === rev.id
              return (
                <div
                  key={rev.id}
                  onClick={() => setSelectedRevision(rev)}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50 shadow-sm'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-900 text-xs">
                      {rev.title || 'Untitled Snapshot'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {new Date(rev.createdAt).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500">
                    <span className="font-mono text-zinc-400">/{rev.slug}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">
            {selectedRevision ? `Snapshot #${selectedRevision.id}` : 'Select a snapshot'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
            >
              Close
            </button>
            <button
              type="button"
              disabled={!selectedRevision || restoringRevision}
              onClick={onRestore}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{restoringRevision ? 'Restoring...' : 'Restore This Snapshot'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
