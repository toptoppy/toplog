'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { MediaItem } from '@/lib/types'
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
  FileText,
  FileArchive,
  Grid,
  List as ListIcon,
  X,
  Code,
  HardDrive,
  FileCode,
} from 'lucide-react'

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Recent'
  }
}

function isImage(contentType: string, filename: string): boolean {
  if (contentType.startsWith('image/')) return true
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.avif'].includes(ext)
}

export default function MediaLibraryPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'images' | 'documents'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<MediaItem | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadMedia = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true)
    try {
      const items = await api.media.list(blogId)
      setMedia(items)
    } catch (err: any) {
      console.error('Failed to load media items', err)
      showFeedback(err.message || 'Failed to load media assets', 'error')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (blogId) {
      loadMedia()
    }
  }, [blogId])

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type })
    setTimeout(() => {
      setFeedback(null)
    }, 3500)
  }

  const handleCopy = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(identifier)
      showFeedback('Link copied to clipboard!')
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch {
      showFeedback('Failed to copy to clipboard', 'error')
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    let uploadCount = 0
    let failedCount = 0

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        await api.media.upload(blogId, file)
        uploadCount++
      } catch (err) {
        console.error('Failed to upload file:', file.name, err)
        failedCount++
      }
    }

    setUploading(false)
    if (uploadCount > 0) {
      showFeedback(`Successfully uploaded ${uploadCount} asset${uploadCount > 1 ? 's' : ''}!`)
      loadMedia()
    }
    if (failedCount > 0) {
      showFeedback(`${failedCount} file(s) failed to upload`, 'error')
    }
  }

  const handleDelete = async (filename: string) => {
    setDeleting(filename)
    try {
      await api.media.delete(blogId, filename)
      setMedia((prev) => prev.filter((m) => m.filename !== filename))
      if (selectedAsset?.filename === filename) {
        setSelectedAsset(null)
      }
      showFeedback('Asset deleted successfully')
    } catch (err: any) {
      showFeedback(err.message || 'Failed to delete asset', 'error')
    } finally {
      setDeleting(null)
      setDeleteConfirm(null)
    }
  }

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesSearch =
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contentType.toLowerCase().includes(searchQuery.toLowerCase())

      const isImg = isImage(item.contentType, item.filename)
      if (filterType === 'images') return matchesSearch && isImg
      if (filterType === 'documents') return matchesSearch && !isImg
      return matchesSearch
    })
  }, [media, searchQuery, filterType])

  const totalBytes = useMemo(() => {
    return media.reduce((acc, curr) => acc + curr.sizeBytes, 0)
  }, [media])

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative min-h-[calc(100vh-4rem)] p-6 lg:p-8 space-y-6"
    >
      {/* Drag Over Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm border-2 border-dashed border-zinc-400 p-8 text-center">
          <div className="rounded-2xl bg-zinc-900 p-4 text-white shadow-xl mb-3">
            <Upload className="h-8 w-8 animate-pulse text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Drop your files here to upload</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm">
            Release your images, logos, covers, or documents to store them in your publication media library.
          </p>
        </div>
      )}

      {/* Floating Feedback Alert */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-2 ${
            feedback.type === 'success'
              ? 'bg-zinc-900 text-white border border-zinc-700'
              : 'bg-red-600 text-white'
          }`}
        >
          {feedback.type === 'success' ? <Check className="h-4 w-4 text-emerald-400" /> : <X className="h-4 w-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Media Library</h1>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-mono font-medium text-zinc-600">
              {media.length} {media.length === 1 ? 'file' : 'files'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Browse, copy links, and organize article cover images, illustrations, and documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5">
            <HardDrive className="h-3.5 w-3.5 text-zinc-400" />
            <span>{formatBytes(totalBytes)} used</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*,.pdf,.zip,.xml,.json,.txt,.md"
            onChange={(e) => handleFileUpload(e.target.files)}
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            <Upload className={`h-3.5 w-3.5 ${uploading ? 'animate-pulse text-blue-400' : ''}`} />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
          </button>
        </div>
      </div>

      {/* Controls & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search assets by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          {/* Filter Pills */}
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                filterType === 'all'
                  ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType('images')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                filterType === 'images'
                  ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Images
            </button>
            <button
              type="button"
              onClick={() => setFilterType('documents')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                filterType === 'documents'
                  ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Files
            </button>
          </div>

          {/* View Switcher */}
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-1 transition ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Grid View"
            >
              <Grid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-md p-1 transition ${
                viewMode === 'list'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="List View"
            >
              <ListIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => loadMedia(true)}
            disabled={refreshing}
            className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition"
            title="Refresh assets"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-zinc-900' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 py-16 px-4 text-center">
          <div className="rounded-2xl bg-zinc-100 p-4 text-zinc-400 mb-3">
            <ImageIcon className="h-8 w-8" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900">
            {searchQuery ? 'No matching assets found' : 'No media assets uploaded yet'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm">
            {searchQuery
              ? `No files matching "${searchQuery}". Try searching for another filename or reset filters.`
              : 'Drag & drop image files anywhere on this page, or click upload to store post illustrations and assets.'}
          </p>
          {!searchQuery && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload First Asset
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMedia.map((item) => {
            const isImg = isImage(item.contentType, item.filename)
            const cleanName = item.filename.replace(/^\d+_/, '')
            const isItemCopied = copiedUrl === item.filename

            return (
              <div
                key={item.filename}
                className="group relative flex flex-col rounded-xl border border-zinc-200/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-zinc-300 hover:shadow-md transition overflow-hidden"
              >
                {/* Visual Thumbnail */}
                <div
                  onClick={() => setSelectedAsset(item)}
                  className="relative aspect-square w-full bg-zinc-50 cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  {isImg ? (
                    <img
                      src={item.url}
                      alt={cleanName}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : item.contentType.includes('zip') ? (
                    <FileArchive className="h-10 w-10 text-amber-500" />
                  ) : item.contentType.includes('xml') || item.contentType.includes('json') ? (
                    <FileCode className="h-10 w-10 text-purple-500" />
                  ) : (
                    <FileText className="h-10 w-10 text-blue-500" />
                  )}

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(window.location.origin + item.url, item.filename)
                      }}
                      className="rounded-lg bg-white/90 p-2 text-zinc-900 shadow hover:bg-white transition"
                      title="Copy Public URL"
                    >
                      {isItemCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAsset(item)
                      }}
                      className="rounded-lg bg-white/90 p-2 text-zinc-900 shadow hover:bg-white transition"
                      title="Inspect Asset"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-3 space-y-1">
                  <p
                    className="text-xs font-semibold text-zinc-900 truncate"
                    title={cleanName}
                  >
                    {cleanName}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{formatBytes(item.sizeBytes)}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Filename</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Uploaded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredMedia.map((item) => {
                  const isImg = isImage(item.contentType, item.filename)
                  const cleanName = item.filename.replace(/^\d+_/, '')
                  const isItemCopied = copiedUrl === item.filename

                  return (
                    <tr
                      key={item.filename}
                      className="hover:bg-zinc-50/80 transition cursor-pointer"
                      onClick={() => setSelectedAsset(item)}
                    >
                      <td className="py-2.5 px-4">
                        <div className="h-10 w-10 rounded-lg bg-zinc-100 overflow-hidden flex items-center justify-center border border-zinc-200">
                          {isImg ? (
                            <img src={item.url} alt={cleanName} className="h-full w-full object-cover" />
                          ) : (
                            <FileText className="h-4 w-4 text-zinc-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-zinc-900 max-w-xs truncate">
                        {cleanName}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-zinc-500 text-[11px]">
                        {item.contentType}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-zinc-500 text-[11px]">
                        {formatBytes(item.sizeBytes)}
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500 text-[11px]">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleCopy(window.location.origin + item.url, item.filename)}
                            className="rounded p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition"
                            title="Copy URL"
                          >
                            {isItemCopied ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirm(item.filename)}
                            className="rounded p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lightbox / Asset Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-100">
              <div className="flex items-center gap-2 max-w-md truncate">
                <ImageIcon className="h-4 w-4 text-zinc-500 shrink-0" />
                <h3 className="text-sm font-bold text-zinc-900 truncate">
                  {selectedAsset.filename.replace(/^\d+_/, '')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="rounded-lg p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Image Preview Box */}
              <div className="flex items-center justify-center rounded-xl bg-zinc-900/5 border border-zinc-200/80 p-4 max-h-80 overflow-hidden">
                {isImage(selectedAsset.contentType, selectedAsset.filename) ? (
                  <img
                    src={selectedAsset.url}
                    alt={selectedAsset.filename}
                    className="max-h-72 max-w-full object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="py-12 flex flex-col items-center text-zinc-400 gap-2">
                    <FileText className="h-12 w-12 text-zinc-400" />
                    <span className="font-mono text-xs">{selectedAsset.contentType}</span>
                  </div>
                )}
              </div>

              {/* Direct Link & Copy Snippets */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500 mb-1">
                    Direct Public URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={typeof window !== 'undefined' ? window.location.origin + selectedAsset.url : selectedAsset.url}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-mono text-zinc-800 select-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          typeof window !== 'undefined'
                            ? window.location.origin + selectedAsset.url
                            : selectedAsset.url,
                          'modal-url'
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shrink-0"
                    >
                      {copiedUrl === 'modal-url' ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                {/* Quick Embed Snippets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const snippet = `![${selectedAsset.filename.replace(/^\d+_/, '')}](${selectedAsset.url})`
                      handleCopy(snippet, 'modal-md')
                    }}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/70 p-2.5 text-left text-xs hover:border-zinc-300 hover:bg-zinc-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Code className="h-3.5 w-3.5 text-blue-600" />
                      <span className="font-semibold text-zinc-800">Copy Markdown Snippet</span>
                    </div>
                    {copiedUrl === 'modal-md' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const snippet = `<img src="${selectedAsset.url}" alt="${selectedAsset.filename.replace(/^\d+_/, '')}" />`
                      handleCopy(snippet, 'modal-html')
                    }}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/70 p-2.5 text-left text-xs hover:border-zinc-300 hover:bg-zinc-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="h-3.5 w-3.5 text-purple-600" />
                      <span className="font-semibold text-zinc-800">Copy HTML Image Tag</span>
                    </div>
                    {copiedUrl === 'modal-html' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                {/* File Metadata Summary */}
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 text-[11px]">
                  <div>
                    <span className="text-zinc-400 font-mono block">FILE SIZE</span>
                    <span className="font-semibold font-mono text-zinc-800">
                      {formatBytes(selectedAsset.sizeBytes)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono block">MIME TYPE</span>
                    <span className="font-semibold font-mono text-zinc-800 truncate block">
                      {selectedAsset.contentType}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono block">DATE UPLOADED</span>
                    <span className="font-semibold text-zinc-800">
                      {formatDate(selectedAsset.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 bg-zinc-50 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setDeleteConfirm(selectedAsset.filename)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Asset</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={selectedAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition"
                >
                  <span>Open Full Size</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Delete Media Asset?</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Are you sure you want to delete this file? Any blog posts linking to this image will show a broken image.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting === deleteConfirm}
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-50 transition"
              >
                {deleting === deleteConfirm ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
