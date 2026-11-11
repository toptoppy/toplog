'use client'

import React, { useState } from 'react'
import { History, X, RotateCcw, Clock, FileText, CheckCircle, Eye, Code } from 'lucide-react'
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
  const [previewTab, setPreviewTab] = useState<'preview' | 'code'>('preview')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-zinc-200 flex flex-col h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-zinc-900 text-white shadow-xs">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                Version History
                <span className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-[11px] font-mono font-medium text-zinc-700">
                  {activeLang.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-zinc-500">
                Inspect snapshots and roll back variant content with 1 click.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-200/60 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2-Column Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left Panel: Snapshot Timeline */}
          <div className="w-80 border-r border-zinc-200 flex flex-col bg-zinc-50/40">
            <div className="p-3 border-b border-zinc-200/80 flex items-center justify-between bg-white text-xs font-semibold text-zinc-600">
              <span>Saved Snapshots ({revisions.length})</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {loadingRevisions ? (
                <div className="py-16 text-center text-xs font-mono text-zinc-400 flex flex-col items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
                  <span>Loading snapshots...</span>
                </div>
              ) : revisions.length === 0 ? (
                <div className="py-16 px-4 text-center text-xs text-zinc-500">
                  No historical snapshots recorded yet for this language variant.
                </div>
              ) : (
                revisions.map((rev, idx) => {
                  const isSelected = selectedRevision?.id === rev.id
                  return (
                    <div
                      key={rev.id}
                      onClick={() => setSelectedRevision(rev)}
                      className={`cursor-pointer rounded-xl border p-3 transition text-left ${
                        isSelected
                          ? 'border-zinc-900 bg-white shadow-xs ring-1 ring-zinc-900/10'
                          : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-zinc-900 text-xs truncate max-w-[170px]">
                          {rev.title || 'Untitled Snapshot'}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium shrink-0">
                          #{rev.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-500">
                        <Clock className="h-3 w-3 text-zinc-400 shrink-0" />
                        <span className="font-mono text-[10px] text-zinc-500 truncate">
                          {new Date(rev.createdAt).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-100 text-[10px]">
                        <span className="font-mono text-zinc-500">
                          {rev.wordCount.toLocaleString()} words
                        </span>
                        <span className="text-zinc-300">·</span>
                        <span className={`font-mono uppercase font-semibold ${
                          rev.status === 'PUBLISHED' ? 'text-emerald-600' : 'text-zinc-500'
                        }`}>
                          {rev.status}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Right Panel: Snapshot Inspector & Content Preview */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {selectedRevision ? (
              <>
                {/* Snapshot Header Bar */}
                <div className="px-6 py-3 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 truncate max-w-md">
                      {selectedRevision.title || 'Untitled Snapshot'}
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                      Slug: /{selectedRevision.slug} · Saved on {new Date(selectedRevision.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Preview Tab Buttons */}
                  <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100/80 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('preview')}
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition ${
                        previewTab === 'preview'
                          ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('code')}
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition ${
                        previewTab === 'code'
                          ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <Code className="h-3 w-3" />
                      <span>HTML</span>
                    </button>
                  </div>
                </div>

                {/* Snapshot Content Viewer */}
                <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/30">
                  {selectedRevision.description && (
                    <div className="mb-4 rounded-lg bg-white border border-zinc-200/80 p-3 shadow-2xs">
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-wider">
                        Excerpt / Meta Description:
                      </span>
                      <p className="text-xs text-zinc-700 mt-1 italic leading-relaxed">
                        {selectedRevision.description}
                      </p>
                    </div>
                  )}

                  {previewTab === 'preview' ? (
                    <div className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-2xs">
                      <div
                        className="prose prose-zinc max-w-none text-zinc-900 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: selectedRevision.contentHtml || '<p class="text-zinc-400 italic">Snapshot body is empty.</p>',
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                      <pre className="whitespace-pre-wrap break-all font-mono">
                        {selectedRevision.contentHtml || '<!-- Empty snapshot HTML -->'}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                <FileText className="h-8 w-8 text-zinc-300 mb-2" />
                <p className="text-xs font-medium text-zinc-500">No snapshot selected</p>
                <p className="text-[11px] text-zinc-400 mt-1">Select a snapshot on the left to preview its content and changes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-zinc-200/80 bg-zinc-50/70 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">
            {selectedRevision ? (
              <>
                Selected <span className="font-semibold text-zinc-800">Snapshot #{selectedRevision.id}</span> ({selectedRevision.wordCount.toLocaleString()} words)
              </>
            ) : (
              'Select a snapshot to restore'
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200/60 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedRevision || restoringRevision}
              onClick={onRestore}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 disabled:opacity-40 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{restoringRevision ? 'Restoring snapshot...' : 'Restore This Snapshot'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
