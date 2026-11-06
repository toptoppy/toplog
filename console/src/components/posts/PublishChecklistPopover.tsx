'use client'

import React from 'react'
import { CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon, FileText, Globe, ArrowRight } from 'lucide-react'

interface PublishChecklistProps {
  title: string
  slug: string
  contentHtml: string
  wordCount: number
  description?: string
  featuredImageUrl?: string
  onOpenSettings: () => void
  onOpenSeo: () => void
}

export default function PublishChecklistPopover({
  title,
  slug,
  contentHtml,
  wordCount,
  description,
  featuredImageUrl,
  onOpenSettings,
  onOpenSeo,
}: PublishChecklistProps) {
  const checks = [
    {
      id: 'title',
      label: 'Compelling title',
      desc: title.trim().length >= 5 ? 'Title is set and descriptive' : 'Add a title at least 5 characters long',
      passed: title.trim().length >= 5,
      required: true,
    },
    {
      id: 'slug',
      label: 'Clean URL slug',
      desc: slug.trim().length > 0 ? `slug: /${slug}` : 'Provide a URL slug for web access',
      passed: slug.trim().length > 0,
      required: true,
    },
    {
      id: 'content',
      label: 'Article body copy',
      desc: wordCount >= 30 ? `${wordCount} words written` : 'Recommended minimum 30 words for quality reading',
      passed: wordCount >= 30,
      required: true,
    },
    {
      id: 'description',
      label: 'Meta description & excerpt',
      desc: description && description.trim().length >= 20 ? 'Search snippet ready' : 'Add meta description for Google & social snippets',
      passed: Boolean(description && description.trim().length >= 20),
      action: onOpenSeo,
      actionLabel: 'Add excerpt',
      required: false,
    },
    {
      id: 'image',
      label: 'Featured cover image',
      desc: featuredImageUrl ? 'Cover image attached' : 'Add a hero image for social cards and previews',
      passed: Boolean(featuredImageUrl),
      action: onOpenSettings,
      actionLabel: 'Upload cover',
      required: false,
    },
  ]

  const passedCount = checks.filter((c) => c.passed).length
  const totalCount = checks.length
  const allRequiredPassed = checks.filter((c) => c.required).every((c) => c.passed)

  return (
    <div className="w-80 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xl text-zinc-900 animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-900">Pre-Flight Checklist</span>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
            allRequiredPassed && passedCount === totalCount
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : allRequiredPassed
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {passedCount}/{totalCount} passed
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {checks.map((chk) => (
          <div
            key={chk.id}
            className="flex items-start justify-between gap-2.5 rounded-lg p-1.5 hover:bg-zinc-50 transition"
          >
            <div className="flex items-start gap-2 min-w-0">
              {chk.passed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle
                  className={`h-4 w-4 shrink-0 mt-0.5 ${
                    chk.required ? 'text-amber-500' : 'text-zinc-400'
                  }`}
                />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-zinc-800">{chk.label}</span>
                  {chk.required ? (
                    <span className="text-[10px] text-red-500 font-mono">*</span>
                  ) : (
                    <span className="text-[9px] text-zinc-400 uppercase font-mono">optional</span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight truncate">{chk.desc}</p>
              </div>
            </div>

            {chk.action && !chk.passed && (
              <button
                type="button"
                onClick={chk.action}
                className="shrink-0 text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5"
              >
                <span>{chk.actionLabel}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
        <span>{allRequiredPassed ? 'Ready to publish' : 'Required fields missing'}</span>
      </div>
    </div>
  )
}
