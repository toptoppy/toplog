'use client'

import React from 'react'
import {
  Globe,
  ShieldCheck,
  AlertCircle,
  Clock,
  RefreshCw,
  Archive,
  Download,
} from 'lucide-react'
import { Blog } from '@/lib/types'

interface GeneralDomainTabProps {
  blog: Blog
  title: string
  setTitle: (val: string) => void
  description: string
  setDescription: (val: string) => void
  customDomain: string
  setCustomDomain: (val: string) => void
  defaultLanguage: string
  setDefaultLanguage: (val: string) => void
  themeName: string
  setThemeName: (val: string) => void
  verifyingDomain: boolean
  handleVerifyDomain: () => void
  domainVerifyResult: {
    verified: boolean
    message: string
    detectedIps: string[]
  } | null
  exportingArchive: boolean
  handleExportArchive: () => void
}

export default function GeneralDomainTab({
  blog,
  title,
  setTitle,
  description,
  setDescription,
  customDomain,
  setCustomDomain,
  defaultLanguage,
  setDefaultLanguage,
  themeName,
  setThemeName,
  verifyingDomain,
  handleVerifyDomain,
  domainVerifyResult,
  exportingArchive,
  handleExportArchive,
}: GeneralDomainTabProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          Blog Title
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          Tagline / Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A high-performance engineering publication"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          Assigned Subdomain
        </label>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 overflow-hidden text-sm text-slate-600">
          <span className="px-3 py-2 font-mono font-medium">{blog.subdomain}</span>
          <span className="px-3 py-2 text-slate-400 bg-slate-100 border-l border-slate-200">
            .localhost
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold uppercase text-slate-600">
            Custom Domain (Optional)
          </label>
          {blog.customDomain && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                blog.domainDnsStatus === 'VERIFIED'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : blog.domainDnsStatus === 'MISCONFIGURED'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {blog.domainDnsStatus === 'VERIFIED' ? (
                <ShieldCheck className="h-3 w-3" />
              ) : blog.domainDnsStatus === 'MISCONFIGURED' ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {blog.domainDnsStatus}
            </span>
          )}
        </div>
        <div className="relative">
          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
            placeholder="blog.mycompany.com"
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>

        {blog.customDomain && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">DNS Setup Instructions:</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Add a <strong>CNAME</strong> record pointing to your server domain (or server IP).
                </p>
              </div>
              <button
                type="button"
                disabled={verifyingDomain}
                onClick={handleVerifyDomain}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-50 transition"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${verifyingDomain ? 'animate-spin text-blue-600' : ''}`} />
                {verifyingDomain ? 'Checking DNS...' : 'Verify DNS Now'}
              </button>
            </div>

            {domainVerifyResult && (
              <div
                className={`p-2.5 rounded-lg border text-xs ${
                  domainVerifyResult.verified
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                <p className="font-semibold">{domainVerifyResult.message}</p>
                {domainVerifyResult.detectedIps.length > 0 && (
                  <p className="text-[11px] mt-0.5 font-mono">
                    Resolved IPs: {domainVerifyResult.detectedIps.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Default Language
          </label>
          <input
            type="text"
            required
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.target.value.toLowerCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase font-mono focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Active Theme
          </label>
          <select
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none bg-white"
          >
            <option value="default">Default Clean Theme (Pebble)</option>
          </select>
        </div>
      </div>

      {/* Archive Backup & Data Export */}
      <div className="pt-5 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
              <Archive className="h-4 w-4 text-blue-600" />
              Full Blog Backup & Data Export (.zip)
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
              Download an offline backup archive containing all posts as Markdown files with YAML frontmatter, tags metadata, reader comments, and email subscribers CSV.
            </p>
          </div>
          <button
            type="button"
            disabled={exportingArchive}
            onClick={handleExportArchive}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 transition shrink-0"
          >
            <Download className={`h-4 w-4 ${exportingArchive ? 'animate-bounce text-blue-600' : 'text-slate-500'}`} />
            {exportingArchive ? 'Generating Archive...' : 'Download Full Archive (.zip)'}
          </button>
        </div>
      </div>
    </div>
  )
}
