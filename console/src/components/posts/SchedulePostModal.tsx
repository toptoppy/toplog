'use client'

import React from 'react'

interface SchedulePostModalProps {
  isOpen: boolean
  onClose: () => void
  scheduleDateTime: string
  setScheduleDateTime: (val: string) => void
  onConfirm: () => void
}

export default function SchedulePostModal({
  isOpen,
  onClose,
  scheduleDateTime,
  setScheduleDateTime,
  onConfirm,
}: SchedulePostModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-container bg-white p-6 shadow-astryx-high border border-neutral-200">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">Schedule Publication</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Select date and time to automatically publish this article variant.
        </p>

        <div className="mt-4">
          <label className="block text-xs font-mono font-medium uppercase tracking-wider text-neutral-600 mb-1.5">
            Target Publish Date & Time
          </label>
          <input
            type="datetime-local"
            value={scheduleDateTime}
            onChange={(e) => setScheduleDateTime(e.target.value)}
            className="w-full rounded-inner border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-inner px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-inner bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white shadow-astryx-low hover:bg-neutral-800 transition"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
