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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-container bg-white p-6 shadow-astryx-high border border-neutral-200">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">Add Language Variant</h3>
        <p className="text-xs text-neutral-500 mt-1">
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
                className={`w-full flex items-center justify-between p-3 rounded-element border text-left transition ${
                  isAlreadyAdded
                    ? 'border-neutral-200 bg-neutral-50 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-astryx-low'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                      {lang.nativeName} ({lang.label})
                    </div>
                    <div className={`text-[10px] font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      ISO: {lang.code.toUpperCase()}
                    </div>
                  </div>
                </div>

                {isAlreadyAdded ? (
                  <span className="text-[10px] font-mono font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-inner">
                    Added
                  </span>
                ) : isSelected ? (
                  <Check className="h-4 w-4 text-white" />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-inner px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!newLangCode || existingLanguages.includes(newLangCode)}
            onClick={onAdd}
            className="rounded-inner bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white shadow-astryx-low hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Add Variant
          </button>
        </div>
      </div>
    </div>
  )
}
