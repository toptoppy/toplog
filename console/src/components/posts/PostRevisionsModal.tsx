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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-4xl rounded-container bg-white shadow-astryx-high border border-neutral-200 flex flex-col h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-inner bg-neutral-900 text-white shadow-astryx-low">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight flex items-center gap-2">
                Version History
                <span className="rounded-inner bg-neutral-200/80 px-1.5 py-0.5 text-[11px] font-mono font-medium text-neutral-700">
                  {activeLang.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-neutral-500">
                Inspect snapshots and roll back variant content with 1 click.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-inner hover:bg-neutral-200/60 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2-Column Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left Panel: Snapshot Timeline */}
          <div className="w-80 border-r border-neutral-200 flex flex-col bg-neutral-50/40">
            <div className="p-3 border-b border-neutral-200/80 flex items-center justify-between bg-white text-xs font-semibold text-neutral-600">
              <span>Saved Snapshots ({revisions.length})</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {loadingRevisions ? (
                <div className="py-16 text-center text-xs font-mono text-neutral-400 flex flex-col items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
                  <span>Loading snapshots...</span>
                </div>
              ) : revisions.length === 0 ? (
                <div className="py-16 px-4 text-center text-xs text-neutral-500">
                  No historical snapshots recorded yet for this language variant.
                </div>
              ) : (
                revisions.map((rev, idx) => {
                  const isSelected = selectedRevision?.id === rev.id
                  return (
                    <div
                      key={rev.id}
                      onClick={() => setSelectedRevision(rev)}
                      className={`cursor-pointer rounded-element border p-3 transition text-left ${
                        isSelected
                          ? 'border-neutral-900 bg-white shadow-astryx-low ring-1 ring-neutral-900/10'
                          : 'border-neutral-200/80 bg-white hover:border-neutral-300 hover:bg-neutral-50/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-neutral-900 text-xs truncate max-w-[170px]">
                          {rev.title || 'Untitled Snapshot'}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-inner bg-neutral-100 text-neutral-600 font-medium shrink-0">
                          #{rev.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-neutral-500">
                        <Clock className="h-3 w-3 text-neutral-400 shrink-0" />
                        <span className="font-mono text-[10px] text-neutral-500 truncate">
                          {new Date(rev.createdAt).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-100 text-[10px]">
                        <span className="font-mono text-neutral-500">
                          {rev.wordCount.toLocaleString()} words
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className={`font-mono uppercase font-semibold ${
                          rev.status === 'PUBLISHED' ? 'text-emerald-600' : 'text-neutral-500'
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
                <div className="px-6 py-3 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 truncate max-w-md">
                      {selectedRevision.title || 'Untitled Snapshot'}
                    </h4>
                    <p className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                      Slug: /{selectedRevision.slug} · Saved on {new Date(selectedRevision.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Preview Tab Buttons */}
                  <div className="flex items-center rounded-element border border-neutral-200 bg-neutral-100/80 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('preview')}
                      className={`inline-flex items-center gap-1 rounded-inner px-2.5 py-1 font-medium transition ${
                        previewTab === 'preview'
                          ? 'bg-white text-neutral-900 shadow-astryx-low font-semibold'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('code')}
                      className={`inline-flex items-center gap-1 rounded-inner px-2.5 py-1 font-medium transition ${
                        previewTab === 'code'
                          ? 'bg-white text-neutral-900 shadow-astryx-low font-semibold'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      <Code className="h-3 w-3" />
                      <span>HTML</span>
                    </button>
                  </div>
                </div>

                {/* Snapshot Content Viewer */}
                <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/30">
                  {selectedRevision.description && (
                    <div className="mb-4 rounded-element bg-white border border-neutral-200/80 p-3 shadow-astryx-low">
                      <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                        Excerpt / Meta Description:
                      </span>
                      <p className="text-xs text-neutral-700 mt-1 italic leading-relaxed">
                        {selectedRevision.description}
                      </p>
                    </div>
                  )}

                  {previewTab === 'preview' ? (
                    <div className="rounded-element border border-neutral-200/80 bg-white p-6 shadow-astryx-low">
                      <div
                        className="prose prose-zinc max-w-none text-neutral-900 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: selectedRevision.contentHtml || '<p class="text-neutral-400 italic">Snapshot body is empty.</p>',
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rounded-element border border-neutral-800 bg-neutral-950 p-4 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                      <pre className="whitespace-pre-wrap break-all font-mono">
                        {selectedRevision.contentHtml || '<!-- Empty snapshot HTML -->'}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-400">
                <FileText className="h-8 w-8 text-neutral-300 mb-2" />
                <p className="text-xs font-medium text-neutral-500">No snapshot selected</p>
                <p className="text-[11px] text-neutral-400 mt-1">Select a snapshot on the left to preview its content and changes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-neutral-200/80 bg-neutral-50/70 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-500">
            {selectedRevision ? (
              <>
                Selected <span className="font-semibold text-neutral-800">Snapshot #{selectedRevision.id}</span> ({selectedRevision.wordCount.toLocaleString()} words)
              </>
            ) : (
              'Select a snapshot to restore'
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-inner px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200/60 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedRevision || restoringRevision}
              onClick={onRestore}
              className="inline-flex items-center gap-1.5 rounded-inner bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white shadow-astryx-low hover:bg-neutral-800 disabled:opacity-40 transition"
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
