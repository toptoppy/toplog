'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog } from '@/lib/types'
import {
  Save,
  Globe,
  CheckCircle2,
  Palette,
  Code2,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Trash2,
  Type,
  Upload,
  ShieldCheck,
  AlertCircle,
  Clock,
  RefreshCw,
  Download,
  Moon,
  Archive,
} from 'lucide-react'

const COLOR_PRESETS = [
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Slate', hex: '#0f172a' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Indigo', hex: '#4f46e5' },
]

const FONT_OPTIONS = [
  { label: 'Inter (Modern Sans)', value: 'Inter' },
  { label: 'Roboto (Clean Sans)', value: 'Roboto' },
  { label: 'Poppins (Geometric)', value: 'Poppins' },
  { label: 'Merriweather (Classic Editorial Serif)', value: 'Merriweather' },
  { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
  { label: 'Fira Code (Developer Monospace)', value: 'Fira Code' },
  { label: 'System Sans', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' },
]

export default function BlogSettingsPage() {
  const params = useParams()
  const blogId = Number(params.blogId)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

  const [blog, setBlog] = useState<Blog | null>(null)
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'code'>('general')

  // General state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [customDomain, setCustomDomain] = useState('')
  const [defaultLanguage, setDefaultLanguage] = useState('en')
  const [themeName, setThemeName] = useState('default')
  const [darkModeEnabled, setDarkModeEnabled] = useState(true)

  // Branding state
  const [accentColor, setAccentColor] = useState('#2563eb')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [logoUrl, setLogoUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')

  // Code injection state
  const [codeHead, setCodeHead] = useState('')
  const [codeFoot, setCodeFoot] = useState('')

  const [saving, setSaving] = useState(false)
  const [exportingArchive, setExportingArchive] = useState(false)
  const [verifyingDomain, setVerifyingDomain] = useState(false)
  const [domainVerifyResult, setDomainVerifyResult] = useState<{
    verified: boolean
    message: string
    detectedIps: string[]
  } | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.blogs
      .get(blogId)
      .then((b) => {
        setBlog(b)
        setTitle(b.title)
        setDescription(b.description || '')
        setCustomDomain(b.customDomain || '')
        setDefaultLanguage(b.defaultLanguage)
        setThemeName(b.themeName)
        setAccentColor(b.accentColor || '#2563eb')
        setFontFamily(b.fontFamily || 'Inter')
        setLogoUrl(b.logoUrl || '')
        setFaviconUrl(b.faviconUrl || '')
        setCodeHead(b.codeHead || '')
        setCodeFoot(b.codeFoot || '')
        setDarkModeEnabled(b.darkModeEnabled ?? true)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [blogId])

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'favicon'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const res = await api.media.upload(blogId, file)
      if (type === 'logo') {
        setLogoUrl(res.url)
      } else {
        setFaviconUrl(res.url)
      }
      setMessage(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded! Click Save to apply.`)
    } catch (err: any) {
      setError(err.message || 'File upload failed')
    }
  }

  const handleExportArchive = async () => {
    setExportingArchive(true)
    setError('')
    setMessage('')
    try {
      await api.exportArchive(blogId, blog?.subdomain || 'blog')
      setMessage('Blog archive (.zip) generated and downloaded successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to export blog archive')
    } finally {
      setExportingArchive(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)

    try {
      const updated = await api.blogs.update(blogId, {
        title,
        description,
        customDomain: customDomain.trim() ? customDomain.trim() : undefined,
        defaultLanguage,
        themeName,
        accentColor,
        fontFamily,
        logoUrl: logoUrl.trim() || undefined,
        faviconUrl: faviconUrl.trim() || undefined,
        codeHead,
        codeFoot,
        darkModeEnabled,
      })
      setBlog(updated)
      setMessage('Blog settings saved successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  const handleVerifyDomain = async () => {
    setVerifyingDomain(true)
    setError('')
    setDomainVerifyResult(null)
    try {
      const res = await api.domains.verify(blogId)
      setDomainVerifyResult({
        verified: res.verified,
        message: res.message,
        detectedIps: res.detectedIps,
      })
      const b = await api.blogs.get(blogId)
      setBlog(b)
    } catch (err: any) {
      setError(err.message || 'Domain DNS verification check failed')
    } finally {
      setVerifyingDomain(false)
    }
  }

  if (loading || !blog) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Blog Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your domain, theme branding, typography, and inject tracking codes.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'general'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <SettingsIcon className="h-4 w-4" />
          General & Domain
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('branding')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'branding'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="h-4 w-4" />
          Branding & Appearance
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'code'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Code2 className="h-4 w-4" />
          Code Injection
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: General & Domain */}
        {activeTab === 'general' && (
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
        )}

        {/* TAB 2: Branding & Appearance */}
        {activeTab === 'branding' && (
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Logo & Favicon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                  Publication Logo
                </label>
                {logoUrl ? (
                  <div className="relative group mb-3 p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <img src={logoUrl} alt="Logo" className="max-h-10 object-contain" />
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove Logo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or upload"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-600 focus:outline-none"
                  />
                  <input
                    type="file"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Recommended height: 40-60px PNG or SVG</p>
              </div>

              {/* Favicon */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                  Favicon
                </label>
                {faviconUrl ? (
                  <div className="relative group mb-3 p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <img src={faviconUrl} alt="Favicon" className="h-8 w-8 object-contain" />
                    <button
                      type="button"
                      onClick={() => setFaviconUrl('')}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove Favicon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or upload"
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-600 focus:outline-none"
                  />
                  <input
                    type="file"
                    ref={faviconInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'favicon')}
                  />
                  <button
                    type="button"
                    onClick={() => faviconInputRef.current?.click()}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Square 32x32px or 64x64px PNG / ICO</p>
              </div>
            </div>

            {/* Accent Color */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                Brand Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setAccentColor(color.hex)}
                    className={`h-7 w-7 rounded-full border-2 transition ${
                      accentColor.toLowerCase() === color.hex.toLowerCase()
                        ? 'border-slate-900 scale-110 shadow'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}

                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-slate-200 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    maxLength={7}
                    className="w-24 rounded border border-slate-300 px-2 py-1 text-xs font-mono font-medium uppercase"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Applied to post titles, links, buttons, and theme accents on public pages.
              </p>
            </div>

            {/* Font Family */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                Typography Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none bg-white font-sans"
              >
                {FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark Mode Support */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-700 flex items-center gap-1.5">
                    <Moon className="h-3.5 w-3.5 text-blue-600" />
                    Public Dark Mode & Visitor Theme Switcher
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Display a theme toggle button in the header of public blog pages. Automatically detects system preferences and stores the visitor's choice.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkModeEnabled}
                    onChange={(e) => setDarkModeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Code Injection */}
        {activeTab === 'code' && (
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Header Code Injection (<code className="text-blue-600 font-mono">&lt;head&gt;</code>)
                </label>
                <span className="text-[11px] text-slate-400">Injected before &lt;/head&gt;</span>
              </div>
              <textarea
                rows={7}
                value={codeHead}
                onChange={(e) => setCodeHead(e.target.value)}
                placeholder="<!-- Google Tag Manager, Google Analytics, custom <style> or Meta tags -->&#10;<script async src='https://www.googletagmanager.com/gtag/js?id=G-XXXXX'></script>"
                className="w-full rounded-lg border border-slate-300 p-3 text-xs font-mono bg-slate-900 text-slate-100 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Raw HTML / scripts injected into the <code className="font-mono text-slate-700">&lt;head&gt;</code> of every public post and page.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Footer Code Injection (<code className="text-blue-600 font-mono">&lt;body&gt;</code>)
                </label>
                <span className="text-[11px] text-slate-400">Injected before &lt;/body&gt;</span>
              </div>
              <textarea
                rows={7}
                value={codeFoot}
                onChange={(e) => setCodeFoot(e.target.value)}
                placeholder="<!-- Chat widgets (Crisp, Intercom), analytics trackers, or custom scripts -->&#10;<script>console.log('Page loaded');</script>"
                className="w-full rounded-lg border border-slate-300 p-3 text-xs font-mono bg-slate-900 text-slate-100 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Raw HTML / scripts injected right before the closing <code className="font-mono text-slate-700">&lt;/body&gt;</code> tag.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
