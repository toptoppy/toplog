'use client'

import React from 'react'
import { Mail } from 'lucide-react'

interface SendNewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  activeLang: string
  title: string
  newsletterSubject: string
  setNewsletterSubject: (subject: string) => void
  sendingNewsletter: boolean
  onSend: () => void
}

export default function SendNewsletterModal({
  isOpen,
  onClose,
  activeLang,
  title,
  newsletterSubject,
  setNewsletterSubject,
  sendingNewsletter,
  onSend,
}: SendNewsletterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Dispatch Newsletter</h3>
            <p className="text-xs text-zinc-500">
              Broadcast this post to your active subscribers.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
            Email Subject
          </label>
          <input
            type="text"
            required
            value={newsletterSubject}
            onChange={(e) => setNewsletterSubject(e.target.value)}
            placeholder="Subject line for email..."
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-600 space-y-1">
          <span className="font-semibold text-zinc-800">Campaign details:</span>
          <p>• Language Variant: <strong>{activeLang.toUpperCase()}</strong></p>
          <p>• Title: <strong>{title}</strong></p>
          <p>• Readers will receive a link to read the full story on your blog.</p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={sendingNewsletter}
            className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={sendingNewsletter || !newsletterSubject.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{sendingNewsletter ? 'Dispatching...' : 'Dispatch Campaign Now'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
