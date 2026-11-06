'use client'

import React, { useState, useEffect, useRef } from 'react'
import { api } from '@/lib/api'
import { MediaItem } from '@/lib/types'
import {
  X,
  Upload,
  Search,
  Image as ImageIcon,
  Loader2,
  Check,
  Copy,
  Plus,
  RefreshCw,
  FolderOpen,
  ArrowRight,
} from 'lucide-react'

interface MediaVaultDrawerProps {
  isOpen: boolean
  onClose: () => void
  blogId?: number
  onInsertImage: (url: string, alt: string) => void
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function isImage(filename: string) {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.avif'].includes(ext)
}

export default function MediaVaultDrawer({
  isOpen,
  onClose,
  blogId,
  onInsertImage,
}: MediaVaultDrawerProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadMedia = async () => {
    if (!blogId) return
    setLoading(true)
    setError('')
    try {
      const data = await api.media.list(blogId)
      setItems(data.filter((item) => isImage(item.filename)))
    } catch (err: any) {
      setError(err.message || 'Failed to load media items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && blogId) {
      loadMedia()
    }
  }, [isOpen, blogId])

  // Dismiss on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleUploadFile = async (file: File) => {
    if (!blogId) return
    setUploading(true)
    setError('')
    try {
      const uploaded = await api.media.upload(blogId, file)
      // Auto-insert newly uploaded file into post!
      onInsertImage(uploaded.url, file.name)
      await loadMedia()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUploadFile(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleUploadFile(file)
    }
  }

  const copyMarkdown = (item: MediaItem) => {
    const md = `![${item.filename}](${item.url})`
    navigator.clipboard.writeText(md)
    setCopiedId(item.filename)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredItems = items.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200/90 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                <FolderOpen className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Media Vault</h3>
                <p className="text-[11px] font-mono text-zinc-500">
                  {items.length} assets in library
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={loadMedia}
                disabled={loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition disabled:opacity-40"
                title="Refresh Vault"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Dropzone & Upload Banner */}
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/60'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              {uploading ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading to Vault...</span>
                </div>
              ) : (
                <>
                  <Upload className="h-5 w-5 text-zinc-400 mb-1" />
                  <span className="text-xs font-semibold text-zinc-700">
                    Click to upload or drag & drop
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    PNG, JPG, WebP, GIF, SVG
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Search Box */}
          <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by filename..."
              className="flex-1 text-xs text-zinc-800 placeholder:text-zinc-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-zinc-400 hover:text-zinc-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {error && (
            <div className="m-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* Asset Grid List */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-2 text-zinc-400 font-mono text-xs">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading media vault...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center p-6 text-zinc-400 font-mono text-xs">
                <ImageIcon className="h-8 w-8 stroke-1 text-zinc-300 mb-2" />
                <p className="font-semibold text-zinc-600">No assets found</p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Upload an image above to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => {
                  const isCopied = copiedId === item.filename
                  return (
                    <div
                      key={item.filename}
                      className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-2xs hover:border-zinc-300 hover:shadow-xs transition"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-4/3 w-full bg-zinc-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                          <button
                            type="button"
                            onClick={() => {
                              onInsertImage(item.url, item.filename)
                              onClose()
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 transition"
                            title="Insert into post"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Insert</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => copyMarkdown(item)}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition"
                            title="Copy Markdown tag"
                          >
                            {isCopied ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* File Info */}
                      <div className="p-2.5">
                        <p className="text-xs font-medium text-zinc-800 truncate" title={item.filename}>
                          {item.filename}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mt-0.5">
                          <span>{formatBytes(item.sizeBytes)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-2.5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Tip: Click Insert to place at cursor</span>
            <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] text-zinc-500">
              Esc
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
