'use client'

import React, { useEffect } from 'react'
import { Sparkles, Check } from 'lucide-react'
import { AiStatus } from '@/lib/types'
import { SUPPORTED_LANGUAGES, getLanguageOption } from '@/lib/constants'

interface AiTranslateModalProps {
  isOpen: boolean
  onClose: () => void
  activeLang: string
  aiStatus: AiStatus | null
  targetAiLang: string
  setTargetAiLang: (code: string) => void
  translating: boolean
  onTranslate: () => void
  existingLanguages?: string[]
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
  existingLanguages = [],
}: AiTranslateModalProps) {
  // Automatically select the counterpart language if not already set or invalid
  useEffect(() => {
    if (!isOpen) return
    const active = (activeLang || '').toLowerCase()
    // Counterpart selection: if active is 'en', counterpart is 'th', and vice versa
    const candidate = active === 'en' ? 'th' : 'en'
    if (!targetAiLang || targetAiLang === active) {
      setTargetAiLang(candidate)
    }
  }, [isOpen, activeLang, targetAiLang, setTargetAiLang])

  if (!isOpen) return null

  const activeOption = getLanguageOption(activeLang)
  const targetOption = getLanguageOption(targetAiLang)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-container bg-white p-6 shadow-astryx-high border border-zinc-200/90">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-element bg-purple-50 text-purple-700 border border-purple-200/60 p-2.5 shadow-astryx-low">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">AI Auto-Translate</h3>
            <p className="text-xs text-zinc-500">
              Translate from <strong>{activeOption.flag} {activeOption.label} ({activeOption.code.toUpperCase()})</strong>
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              {aiStatus?.configured ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-inner border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  {aiStatus.provider}: {aiStatus.model}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-inner border border-amber-200">
                  Requires AI Configuration in Settings
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-2">
              Select Target Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isCurrentSource = lang.code === activeLang.toLowerCase()
                const isAlreadyCreated = existingLanguages.includes(lang.code) && !isCurrentSource
                const isSelected = targetAiLang === lang.code

                return (
                  <button
                    key={lang.code}
                    type="button"
                    disabled={translating || isCurrentSource}
                    onClick={() => setTargetAiLang(lang.code)}
                    className={`flex flex-col items-start p-3 rounded-element border text-left transition ${
                      isCurrentSource
                        ? 'border-zinc-200 bg-zinc-50 opacity-40 cursor-not-allowed'
                        : isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-astryx-low ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-400 bg-white text-zinc-800 shadow-astryx-low'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{lang.flag}</span>
                      {isSelected && !isCurrentSource && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                      {isCurrentSource && (
                        <span className="text-[9px] font-mono font-semibold uppercase text-zinc-400 bg-zinc-200/50 px-1 rounded-inner">
                          Source
                        </span>
                      )}
                      {isAlreadyCreated && !isCurrentSource && (
                        <span className="text-[9px] font-mono text-zinc-400">
                          Exists
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${isSelected && !isCurrentSource ? 'text-white' : 'text-zinc-900'}`}>
                      {lang.nativeName}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected && !isCurrentSource ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {lang.label} ({lang.code.toUpperCase()})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-element bg-zinc-50 border border-zinc-200/80 p-3.5 text-xs text-zinc-600 space-y-1.5 shadow-astryx-low">
            <p className="font-semibold text-zinc-800">Localization process:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-500">
              <li>AI translates title, slug, and rich-text content to <strong>{targetOption.nativeName} ({targetOption.label})</strong></li>
              <li>HTML structure, formatting, code blocks, and media links are strictly preserved</li>
              <li>A new <strong>{targetOption.code.toUpperCase()}</strong> variant will be saved as a Draft</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={translating}
            className="rounded-inner px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onTranslate}
            disabled={translating || !targetAiLang || targetAiLang === activeLang.toLowerCase()}
            className="inline-flex items-center gap-1.5 rounded-inner bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-astryx-low hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>{translating ? `Translating into ${targetOption.label}...` : `Translate to ${targetOption.label}`}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
