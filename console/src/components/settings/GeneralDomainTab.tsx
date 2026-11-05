'use client'

import React, { useState } from 'react'
import {
  Globe,
  ShieldCheck,
  AlertCircle,
  Clock,
  RefreshCw,
  Archive,
  Download,
  Copy,
  Check,
  ExternalLink,
  Lock,
  ArrowRight,
} from 'lucide-react'
import { Blog, VerifyDomainResult } from '@/lib/types'

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
  domainVerifyResult: VerifyDomainResult | null
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
  const [copiedTarget, setCopiedTarget] = useState(false)

  // Expected CNAME target (e.g. subdomain.localhost or production host)
  const expectedCnameTarget = domainVerifyResult?.expectedCnameOrIp || `${blog.subdomain}.localhost`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTarget(true)
    setTimeout(() => setCopiedTarget(false), 2000)
  }

  // Derive active DNS verification state
  const isVerified = blog.domainDnsStatus === 'VERIFIED' || domainVerifyResult?.verified === true
  const isMisconfigured = blog.domainDnsStatus === 'MISCONFIGURED' || (domainVerifyResult && !domainVerifyResult.verified)

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Title */}
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

      {/* Description */}
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

      {/* Default Assigned Subdomain */}
      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          Assigned Platform Subdomain
        </label>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 overflow-hidden text-sm text-slate-600">
          <span className="px-3 py-2 font-mono font-medium">{blog.subdomain}</span>
          <span className="px-3 py-2 text-slate-400 bg-slate-100 border-l border-slate-200">
            .localhost
          </span>
        </div>
      </div>

      {/* Custom Domain & Auto-SSL Section */}
      <div className="border-t border-slate-100 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700">
              Custom Domain & Auto-SSL
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect your own apex or subdomain with automated Caddy on-demand TLS encryption.
            </p>
          </div>

          {blog.customDomain && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                isVerified
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isMisconfigured
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isVerified ? (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Verified & Active</span>
                </>
              ) : isMisconfigured ? (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                  <span>Misconfigured</span>
                </>
              ) : (
                <>
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  <span>Awaiting DNS</span>
                </>
              )}
            </span>
          )}
        </div>

        {/* Input Field */}
        <div className="relative">
          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
            placeholder="blog.mycompany.com"
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-600 focus:outline-none font-mono"
          />
        </div>

        {/* Active Custom Domain Setup Panel */}
        {blog.customDomain && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            {/* DNS Instructions Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Required DNS Configuration</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Add this CNAME record in your DNS provider (e.g., Cloudflare, Namecheap, Route53, GoDaddy).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={verifyingDomain}
                  onClick={handleVerifyDomain}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-50 transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${verifyingDomain ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                  {verifyingDomain ? 'Resolving DNS...' : 'Verify DNS Now'}
                </button>

                {isVerified && (
                  <a
                    href={`https://${blog.customDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* DNS Record Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs text-slate-600 font-mono">
                <thead className="bg-slate-100/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2">Type</th>
                    <th className="px-3.5 py-2">Host / Name</th>
                    <th className="px-3.5 py-2">Value / Target</th>
                    <th className="px-3.5 py-2">TTL</th>
                    <th className="px-3.5 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-3.5 py-2.5 font-bold text-slate-800">CNAME</td>
                    <td className="px-3.5 py-2.5 text-slate-700">
                      {blog.customDomain.includes('.')
                        ? blog.customDomain.substring(0, blog.customDomain.indexOf('.'))
                        : '@'}
                    </td>
                    <td className="px-3.5 py-2.5 text-blue-700 font-semibold">{expectedCnameTarget}</td>
                    <td className="px-3.5 py-2.5 text-slate-500">Auto (300)</td>
                    <td className="px-3.5 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(expectedCnameTarget)}
                        className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-sans font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                      >
                        {copiedTarget ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-slate-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SSL & DNS Diagnostics Banner */}
            <div
              className={`rounded-xl border p-3 text-xs space-y-1.5 ${
                isVerified
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                  : isMisconfigured
                  ? 'border-red-200 bg-red-50/70 text-red-900'
                  : 'border-amber-200 bg-amber-50/70 text-amber-900'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <Lock className={`h-3.5 w-3.5 ${isVerified ? 'text-emerald-700' : 'text-amber-700'}`} />
                  <span>
                    Auto-SSL Certificate:{' '}
                    {isVerified ? 'Active & Encrypted (On-Demand TLS)' : 'Awaiting DNS Propagation'}
                  </span>
                </span>
                <span className="text-[11px] font-mono opacity-80">
                  Auto-checks every 60s
                </span>
              </div>

              {domainVerifyResult && (
                <div className="pt-1 text-[11px] border-t border-slate-200/50 space-y-0.5">
                  <p className="font-medium">{domainVerifyResult.message}</p>
                  {domainVerifyResult.detectedIps.length > 0 && (
                    <p className="font-mono opacity-80">
                      Resolved IPs: {domainVerifyResult.detectedIps.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Language & Theme Selectors */}
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
            <Download className={`h-4 w-4 ${exportingArchive ? 'animate-pulse text-blue-600' : 'text-slate-500'}`} />
            {exportingArchive ? 'Generating Archive...' : 'Download Full Archive (.zip)'}
          </button>
        </div>
      </div>
    </div>
  )
}
