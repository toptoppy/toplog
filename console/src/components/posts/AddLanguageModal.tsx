'use client'

import React from 'react'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'
import { Check } from 'lucide-react'

interface AddLanguageModalProps {
  isOpen: boolean
  onClose: () => void
  newLangCode: string
  setNewLangCode: (code: string) => void
  onAdd: () => void
  existingLanguages?: string[]
}

export default function AddLanguageModal({
  isOpen,
  onClose,
  newLangCode,
  setNewLangCode,
  onAdd,
  existingLanguages = [],
}: AddLanguageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        <h3 className="text-base font-bold text-zinc-900 tracking-tight">Add Language Variant</h3>
        <p className="text-xs text-zinc-500 mt-1">
          Select a language to create a localized translation for this post.
        </p>

        <div className="mt-4 space-y-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isAlreadyAdded = existingLanguages.includes(lang.code)
            const isSelected = newLangCode === lang.code

            return (
              <button
                key={lang.code}
                type="button"
                disabled={isAlreadyAdded}
                onClick={() => setNewLangCode(lang.code)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  isAlreadyAdded
                    ? 'border-zinc-200 bg-zinc-50 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                    : 'border-zinc-200 hover:border-zinc-400 bg-white text-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                      {lang.nativeName} ({lang.label})
                    </div>
                    <div className={`text-[10px] font-mono ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      ISO: {lang.code.toUpperCase()}
                    </div>
                  </div>
                </div>

                {isAlreadyAdded ? (
                  <span className="text-[10px] font-mono font-medium text-zinc-400 bg-zinc-200/60 px-2 py-0.5 rounded">
                    Added
                  </span>
                ) : isSelected ? (
                  <Check className="h-4 w-4 text-white" />
                ) : null}
              </button>
            )
          })}
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
            disabled={!newLangCode || existingLanguages.includes(newLangCode)}
            onClick={onAdd}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Add Variant
          </button>
        </div>
      </div>
    </div>
  )
}
