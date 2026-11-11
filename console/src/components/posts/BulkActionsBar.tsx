'use client'

import React from 'react'
import {
  CheckSquare,
  X,
  Trash2,
  Globe,
  FileEdit,
  Star,
  StarOff,
  Loader2,
  Copy,
  FileDown,
} from 'lucide-react'

export interface BulkActionsBarProps {
  selectedCount: number
  isProcessing: boolean
  processingMessage?: string | null
  onClear: () => void
  onDelete: () => void
  onStatusChange: (status: 'PUBLISHED' | 'DRAFT') => void
  onToggleFeatured?: (featured: boolean) => void
  onDuplicate?: () => void
  onExport?: () => void
}

export default function BulkActionsBar({
  selectedCount,
  isProcessing,
  processingMessage,
  onClear,
  onDelete,
  onStatusChange,
  onToggleFeatured,
  onDuplicate,
  onExport,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-auto animate-in fade-in slide-in-from-bottom-5 duration-200 select-none">
      <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-900/95 px-4 py-2.5 sm:px-5 sm:py-3 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
        {/* Selected count pill */}
        <div className="flex items-center gap-1.5 rounded-lg bg-zinc-800/90 px-2.5 py-1 text-xs font-mono font-semibold text-zinc-200 border border-zinc-700/60">
          {isProcessing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
          ) : (
            <CheckSquare className="h-3.5 w-3.5 text-blue-400" />
          )}
          <span>{selectedCount} selected</span>
        </div>

        {isProcessing ? (
          <div className="flex items-center gap-2 px-2 text-xs font-mono text-zinc-300">
            <span>{processingMessage || 'Processing batch...'}</span>
          </div>
        ) : (
          <>
            {/* Quick Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => onStatusChange('PUBLISHED')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800/50 bg-emerald-950/40 px-2.5 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-900/60 hover:text-emerald-200 transition"
                title="Publish selected articles"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Publish</span>
              </button>

              <button
                type="button"
                onClick={() => onStatusChange('DRAFT')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/60 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700/80 hover:text-white transition"
                title="Unpublish to draft"
              >
                <FileEdit className="h-3.5 w-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Draft</span>
              </button>

              {onToggleFeatured && (
                <button
                  type="button"
                  onClick={() => onToggleFeatured(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/50 bg-amber-950/40 px-2.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-900/60 hover:text-amber-200 transition"
                  title="Mark as featured"
                >
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="hidden md:inline">Feature</span>
                </button>
              )}

              {onDuplicate && (
                <button
                  type="button"
                  onClick={onDuplicate}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-900/50 bg-blue-950/40 px-2.5 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-900/60 hover:text-blue-200 transition"
                  title="Duplicate selected as draft"
                >
                  <Copy className="h-3.5 w-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Duplicate</span>
                </button>
              )}

              {onExport && (
                <button
                  type="button"
                  onClick={onExport}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-purple-900/50 bg-purple-950/40 px-2.5 py-1.5 text-xs font-medium text-purple-300 hover:bg-purple-900/60 hover:text-purple-200 transition"
                  title="Export selected posts as Markdown"
                >
                  <FileDown className="h-3.5 w-3.5 text-purple-400" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              )}

              <div className="h-4 w-px bg-zinc-700/80 mx-0.5 sm:mx-1" />

              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/50 bg-red-950/40 px-2.5 py-1.5 text-xs font-medium text-red-300 hover:bg-red-900/60 hover:text-red-200 transition"
                title="Delete selected posts"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-400" />
                <span>Delete</span>
              </button>
            </div>

            {/* Clear Selection */}
            <button
              type="button"
              onClick={onClear}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-700/60 text-zinc-400 hover:bg-zinc-800 hover:text-white transition ml-1"
              title="Clear selection (Esc)"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
