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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-container bg-white p-6 shadow-astryx-high border border-neutral-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-inner bg-neutral-100 p-2 text-neutral-900 shadow-astryx-low">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">Dispatch Newsletter</h3>
            <p className="text-xs text-neutral-500">
              Broadcast this post to your active subscribers.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-medium uppercase tracking-wider text-neutral-600 mb-1.5">
            Email Subject
          </label>
          <input
            type="text"
            required
            value={newsletterSubject}
            onChange={(e) => setNewsletterSubject(e.target.value)}
            placeholder="Subject line for email..."
            className="w-full rounded-inner border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="rounded-element bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-600 space-y-1">
          <span className="font-semibold text-neutral-800">Campaign details:</span>
          <p>• Language Variant: <strong>{activeLang.toUpperCase()}</strong></p>
          <p>• Title: <strong>{title}</strong></p>
          <p>• Readers will receive a link to read the full story on your blog.</p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            disabled={sendingNewsletter}
            className="rounded-inner px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={sendingNewsletter || !newsletterSubject.trim()}
            className="inline-flex items-center gap-1.5 rounded-inner bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-astryx-low hover:bg-neutral-800 disabled:opacity-50 transition"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{sendingNewsletter ? 'Dispatching...' : 'Dispatch Campaign Now'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
