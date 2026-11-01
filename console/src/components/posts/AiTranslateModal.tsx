'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'
import { AiStatus } from '@/lib/types'

interface AiTranslateModalProps {
  isOpen: boolean
  onClose: () => void
  activeLang: string
  aiStatus: AiStatus | null
  targetAiLang: string
  setTargetAiLang: (code: string) => void
  translating: boolean
  onTranslate: () => void
}

export default function AiTranslateModal({
  isOpen,
  onClose,
  activeLang,
  aiStatus,
  targetAiLang,
  setTargetAiLang,
  translating,
  onTranslate,
}: AiTranslateModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl bg-purple-100 p-2 text-purple-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">AI Auto-Translate</h3>
            <p className="text-xs text-zinc-500">
              Translate from <strong>{activeLang.toUpperCase()}</strong> into another language.
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              {aiStatus?.configured ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  {aiStatus.provider}: {aiStatus.model}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Requires AI Configuration in Settings
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
              Target Language Code (e.g. th, ja, fr, de, es, zh)
            </label>
            <input
              type="text"
              autoFocus
              maxLength={5}
              value={targetAiLang}
              onChange={(e) => setTargetAiLang(e.target.value.toLowerCase())}
              placeholder="e.g. th, ja, fr, de"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs uppercase font-mono font-medium text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              disabled={translating}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-mono text-zinc-400 mr-1">Quick pick:</span>
            {['th', 'ja', 'es', 'fr', 'de', 'zh'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setTargetAiLang(code)}
                disabled={translating}
                className={`rounded px-2 py-0.5 text-xs font-mono font-semibold uppercase border transition ${
                  targetAiLang === code
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-600 space-y-1.5">
            <p className="font-semibold text-zinc-800">Localization process:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-500">
              <li>AI translates title, slug, and rich-text content</li>
              <li>HTML structure, formatting, code blocks, and media links are preserved</li>
              <li>A new <strong>{targetAiLang ? targetAiLang.toUpperCase() : '...'}</strong> variant will be created as a Draft</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={translating}
            className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onTranslate}
            disabled={translating || !targetAiLang.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>{translating ? 'Translating with AI...' : 'Translate & Create Variant'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
