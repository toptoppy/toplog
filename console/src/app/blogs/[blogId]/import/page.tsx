'use client'

import React, { useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { ImportResult } from '@/lib/types'
import {
  FileUp,
  FileText,
  FileCode,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UploadCloud,
  FileArchive,
  Info,
  Loader2,
  FileDown,
} from 'lucide-react'

export default function ImportPage() {
  const params = useParams()
  const router = useRouter()
  const blogId = Number(params.blogId)

  const [activeType, setActiveType] = useState<'wordpress' | 'markdown'>('wordpress')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState('')

  const handleExport = async () => {
    setExporting(true)
    setError('')
    try {
      await api.exportArchive(blogId, `blog-${blogId}`)
    } catch (err: any) {
      setError(err.message || 'Export failed')
    } finally {
      setExporting(false)
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError('')
      setResult(null)
    }
  }

  const handleStartImport = async () => {
    if (!selectedFile) {
      setError('Please select a file to import')
      return
    }

    setImporting(true)
    setError('')
    setResult(null)

    try {
      let res: ImportResult
      if (activeType === 'wordpress') {
        res = await api.importer.wordpress(blogId, selectedFile)
      } else {
        res = await api.importer.markdown(blogId, selectedFile)
      }

      setResult(res)
      if (!res.success && res.errors.length > 0) {
        setError(res.errors[0])
      }
    } catch (err: any) {
      setError(err.message || 'Import failed. Please check file format.')
    } finally {
      setImporting(false)
    }
  }

  const resetSelection = (type: 'wordpress' | 'markdown') => {
    setActiveType(type)
    setSelectedFile(null)
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <FileUp className="h-6 w-6 text-blue-600" />
          Content Importer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Migrate your existing articles, static pages, and tags from WordPress or Markdown files into your blog.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Format Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WordPress Card */}
        <button
          type="button"
          onClick={() => resetSelection('wordpress')}
          className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition ${
            activeType === 'wordpress'
              ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-sm'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeType === 'wordpress'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <FileCode className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">WordPress XML (.xml)</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Import from a WordPress WXR export file including posts, pages, categories, tags, and formatting.
            </p>
          </div>
        </button>

        {/* Markdown Card */}
        <button
          type="button"
          onClick={() => resetSelection('markdown')}
          className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition ${
            activeType === 'markdown'
              ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-sm'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeType === 'markdown'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <FileArchive className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Markdown Bundle (.zip or .md)</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Upload a single Markdown file or a ZIP of markdown files. YAML frontmatter is automatically parsed.
            </p>
          </div>
        </button>
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          {activeType === 'wordpress' ? (
            <div className="space-y-1">
              <span className="font-semibold text-slate-800">How to export from WordPress:</span>
              <p>
                In your WordPress Dashboard, go to <strong>Tools &gt; Export</strong>, select <strong>Posts</strong> or <strong>All Content</strong>, and click <strong>Download Export File</strong>. Upload that <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">.xml</code> file below.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="font-semibold text-slate-800">Supported Markdown format:</span>
              <p>
                Standard Markdown with optional YAML frontmatter (<code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">title:</code>, <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">slug:</code>, <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">tags: [...]</code>, <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">status: draft|published</code>).
              </p>
            </div>
          )}
        </div>

        {/* Drag / File Selector */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            selectedFile
              ? 'border-blue-500 bg-blue-50/20'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={activeType === 'wordpress' ? '.xml' : '.zip,.md,.markdown'}
            onChange={handleFileChange}
          />

          <UploadCloud className="mx-auto h-10 w-10 text-slate-400 mb-2" />
          {selectedFile ? (
            <div>
              <p className="text-sm font-semibold text-slate-800">{selectedFile.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {(selectedFile.size / 1024).toFixed(1)} KB • Click to change file
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Click to browse or drop your {activeType === 'wordpress' ? 'WordPress .xml' : 'Markdown .zip / .md'} file here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {activeType === 'wordpress' ? 'Supports WordPress WXR format' : 'Supports .zip archives or individual .md files'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleStartImport}
            disabled={!selectedFile || importing}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing Content...
              </>
            ) : (
              <>
                <FileUp className="h-4 w-4" />
                Start Import
              </>
            )}
          </button>
        </div>
      </div>

      {/* Export Blog Archive Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
              <FileDown className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Export Blog Archive</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download a complete .zip archive containing all your posts (as Markdown with YAML frontmatter), tags, comments, and subscribers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-50 transition shrink-0"
          >
            {exporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                <span>Download Archive (.zip)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="text-base font-bold text-slate-900">Import Complete!</h3>
          </div>

          <p className="text-xs text-slate-500">{result.message}</p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
              <span className="block text-2xl font-extrabold text-slate-900">
                {result.importedPostsCount}
              </span>
              <span className="text-xs font-semibold uppercase text-slate-500">Posts</span>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
              <span className="block text-2xl font-extrabold text-slate-900">
                {result.importedPagesCount}
              </span>
              <span className="text-xs font-semibold uppercase text-slate-500">Pages</span>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
              <span className="block text-2xl font-extrabold text-slate-900">
                {result.importedTagsCount}
              </span>
              <span className="text-xs font-semibold uppercase text-slate-500">Tags</span>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 space-y-1">
              <span className="font-semibold block">Warnings / Skipped:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {result.errors.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <Link
              href={`/blogs/${blogId}/posts`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 transition"
            >
              View Imported Posts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
