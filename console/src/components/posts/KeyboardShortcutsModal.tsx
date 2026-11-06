'use client'

import React from 'react'
import { X, Command } from 'lucide-react'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ShortcutItem {
  label: string
  keys: string[]
}

const SHORTCUT_GROUPS: { category: string; shortcuts: ShortcutItem[] }[] = [
  {
    category: 'Editor Navigation & Mode',
    shortcuts: [
      { label: 'Toggle Zen focus writing canvas', keys: ['⌘', 'Shift', 'F'] },
      { label: 'Save draft snapshot', keys: ['⌘', 'S'] },
      { label: 'Exit Zen mode / Dismiss modal', keys: ['Esc'] },
      { label: 'Open shortcuts cheat sheet', keys: ['?'] },
    ],
  },
  {
    category: 'Inline Text Formatting',
    shortcuts: [
      { label: 'Bold selection', keys: ['⌘', 'B'] },
      { label: 'Italic selection', keys: ['⌘', 'I'] },
      { label: 'Strikethrough', keys: ['⌘', 'Shift', 'X'] },
      { label: 'Inline code snippet', keys: ['⌘', 'E'] },
      { label: 'Insert hyperlink', keys: ['⌘', 'K'] },
    ],
  },
  {
    category: 'Blocks & Structure',
    shortcuts: [
      { label: 'Heading 1', keys: ['⌘', 'Opt', '1'] },
      { label: 'Heading 2', keys: ['⌘', 'Opt', '2'] },
      { label: 'Bullet list', keys: ['⌘', 'Shift', '8'] },
      { label: 'Ordered list', keys: ['⌘', 'Shift', '7'] },
      { label: 'Blockquote callout', keys: ['⌘', 'Shift', 'B'] },
    ],
  },
]

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
              <Command className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">Keyboard Shortcuts</h3>
              <p className="text-xs text-zinc-500 font-mono">TopLog Studio authoring accelerator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.category} className="space-y-2.5">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                {group.category}
              </span>
              <div className="space-y-1.5">
                {group.shortcuts.map((sc) => (
                  <div
                    key={sc.label}
                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-zinc-50 transition"
                  >
                    <span className="text-xs text-zinc-700">{sc.label}</span>
                    <div className="flex items-center gap-1">
                      {sc.keys.map((k) => (
                        <kbd
                          key={k}
                          className="min-w-5 inline-flex items-center justify-center rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-zinc-700 shadow-2xs"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>Tip: On Windows / Linux use Ctrl in place of ⌘</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-900 px-3.5 py-1.5 font-semibold text-white hover:bg-zinc-800 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
