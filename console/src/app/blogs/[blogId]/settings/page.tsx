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
  Sparkles,
  Bot,
  Zap,
  Eye,
  EyeOff,
  Key,
  Check,
  ExternalLink,
} from 'lucide-react'
import { AiStatus, AiTestResult } from '@/lib/types'

const PROVIDER_PRESETS = [
  {
    name: 'OpenRouter (Recommended)',
    id: 'openrouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'google/gemini-2.0-flash-001',
    placeholder: 'sk-or-v1-...',
    badge: 'Universal Router',
  },
  {
    name: 'OpenAI',
    id: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    placeholder: 'sk-proj-...',
    badge: 'Direct OpenAI',
  },
  {
    name: 'Groq',
    id: 'groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    placeholder: 'gsk_...',
    badge: 'Ultra Fast LPU',
  },
  {
    name: 'DeepSeek',
    id: 'deepseek',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    placeholder: 'sk-...',
    badge: 'DeepSeek V3',
  },
]

const MODEL_SUGGESTIONS = [
  {
    model: 'google/gemini-2.0-flash-001',
    label: 'Gemini 2.0 Flash',
    desc: 'Fast, cheap & accurate',
  },
  {
    model: 'anthropic/claude-3.5-sonnet',
    label: 'Claude 3.5 Sonnet',
    desc: 'Top literary prose',
  },
  {
    model: 'deepseek/deepseek-chat',
    label: 'DeepSeek V3',
    desc: 'Smart & cost-efficient',
  },
  {
    model: 'meta-llama/llama-3.3-70b-instruct',
    label: 'Llama 3.3 70B',
    desc: 'Open weights powerhouse',
  },
  {
    model: 'openai/gpt-4o-mini',
    label: 'GPT-4o Mini',
    desc: 'Fast and reliable',
  },
]

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
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'code' | 'ai'>('general')

  // AI Connection State
  const [aiStatus, setAiStatus] = useState<AiStatus | null>(null)
  const [testingAi, setTestingAi] = useState(false)
  const [aiTestResult, setAiTestResult] = useState<AiTestResult | null>(null)
  const [aiApiKey, setAiApiKey] = useState('')
  const [aiBaseUrl, setAiBaseUrl] = useState('')
  const [aiModel, setAiModel] = useState('')
  const [showAiKey, setShowAiKey] = useState(false)
  const [savingAi, setSavingAi] = useState(false)
  const [aiSaveMessage, setAiSaveMessage] = useState('')
  const [aiSaveError, setAiSaveError] = useState('')

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
        setAiApiKey(b.aiApiKey || '')
        setAiBaseUrl(b.aiBaseUrl || '')
        setAiModel(b.aiModel || '')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))

    api.ai.status(blogId).then(setAiStatus).catch(console.error)
  }, [blogId])

  const handleTestAiConnection = async () => {
    setTestingAi(true)
    setAiTestResult(null)
    try {
      const payload: { apiKey?: string; baseUrl?: string; model?: string } = {}
      if (aiApiKey && !aiApiKey.includes('••••')) {
        payload.apiKey = aiApiKey.trim()
      }
      if (aiBaseUrl.trim()) {
        payload.baseUrl = aiBaseUrl.trim()
      }
      if (aiModel.trim()) {
        payload.model = aiModel.trim()
      }
      const res = await api.ai.test(blogId, payload)
      setAiTestResult(res)
    } catch (err: any) {
      setAiTestResult({
        success: false,
        provider: aiStatus?.provider || 'OpenRouter',
        model: aiModel.trim() || aiStatus?.model || '',
        error: err.message || 'Connection test failed',
      })
    } finally {
      setTestingAi(false)
    }
  }

  const handleSaveAiSettings = async () => {
    setSavingAi(true)
    setAiSaveError('')
    setAiSaveMessage('')
    try {
      const updated = await api.blogs.update(blogId, {
        aiApiKey: aiApiKey.trim(),
        aiBaseUrl: aiBaseUrl.trim(),
        aiModel: aiModel.trim(),
      })
      setBlog(updated)
      setAiApiKey(updated.aiApiKey || '')
      setAiBaseUrl(updated.aiBaseUrl || '')
      setAiModel(updated.aiModel || '')
      setAiSaveMessage('AI configuration saved successfully!')
      const newStatus = await api.ai.status(blogId)
      setAiStatus(newStatus)
    } catch (err: any) {
      setAiSaveError(err.message || 'Failed to save AI configuration')
    } finally {
      setSavingAi(false)
    }
  }

  const handleClearCustomAiKey = async () => {
    if (!confirm('Are you sure you want to remove the custom AI API key and revert to the system default configuration?')) {
      return
    }
    setSavingAi(true)
    setAiSaveError('')
    setAiSaveMessage('')
    try {
      const updated = await api.blogs.update(blogId, {
        aiApiKey: '',
        aiBaseUrl: '',
        aiModel: '',
      })
      setBlog(updated)
      setAiApiKey('')
      setAiBaseUrl('')
      setAiModel('')
      setAiSaveMessage('Custom AI key removed. Reverted to system default settings.')
      const newStatus = await api.ai.status(blogId)
      setAiStatus(newStatus)
    } catch (err: any) {
      setAiSaveError(err.message || 'Failed to reset AI settings')
    } finally {
      setSavingAi(false)
    }
  }

  const handleSelectProviderPreset = (preset: typeof PROVIDER_PRESETS[number]) => {
    setAiBaseUrl(preset.baseUrl)
    if (!aiModel || PROVIDER_PRESETS.some((p) => p.defaultModel === aiModel)) {
      setAiModel(preset.defaultModel)
    }
  }

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
        aiApiKey: aiApiKey.trim() || undefined,
        aiBaseUrl: aiBaseUrl.trim() || undefined,
        aiModel: aiModel.trim() || undefined,
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
    <div className="w-full p-8 space-y-6">
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

        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'ai'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="h-4 w-4 text-purple-600" />
          AI & OpenRouter
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

        {/* TAB 4: AI & OpenRouter Connection */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            {/* Top Overview & Status Card */}
            <div className="rounded-xl border border-zinc-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 tracking-tight">OpenRouter & LLM Engine</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Powers 1-click multilingual translation and automated SEO optimization.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {blog?.hasCustomAiKey ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono font-medium bg-purple-50 text-purple-700 border border-purple-200">
                      <Key className="h-3 w-3" />
                      Blog-Specific Key
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      System Default (.env)
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono font-medium ${
                      aiStatus?.configured
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        aiStatus?.configured ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'
                      }`}
                    />
                    {aiStatus?.configured ? 'Connected' : 'Not Configured'}
                  </span>
                </div>
              </div>

              {/* Status details grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-4">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                    Active Provider
                  </span>
                  <p className="mt-1.5 text-sm font-bold text-zinc-900">{aiStatus?.provider || 'OpenRouter'}</p>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-4">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                    Active Model
                  </span>
                  <p className="mt-1.5 text-xs font-mono font-medium text-purple-700 truncate">
                    {aiStatus?.model || 'google/gemini-2.0-flash-001'}
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-4">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                    API Endpoint
                  </span>
                  <p className="mt-1.5 text-xs font-mono text-zinc-600 truncate">
                    {aiStatus?.baseUrl || 'https://openrouter.ai/api/v1'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Configuration Card */}
            <div className="rounded-xl border border-zinc-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-6">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 tracking-tight">Blog AI Configuration</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Configure your own API credentials for this blog or switch between AI providers.
                </p>
              </div>

              {/* Provider Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-zinc-600 tracking-wider">
                  Quick Provider Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PROVIDER_PRESETS.map((preset) => {
                    const isSelected =
                      aiBaseUrl === preset.baseUrl ||
                      (!aiBaseUrl && preset.id === 'openrouter')
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectProviderPreset(preset)}
                        className={`flex flex-col text-left p-3 rounded-lg border transition ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                            : 'border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-zinc-900">{preset.name.split(' ')[0]}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-purple-600" />}
                        </div>
                        <span className="text-[11px] text-zinc-500 mt-1">{preset.badge}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* API Key Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase text-zinc-600 tracking-wider">
                    API Key
                  </label>
                  {blog?.hasCustomAiKey && (
                    <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Saved Key Active
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showAiKey ? 'text' : 'password'}
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    placeholder={
                      blog?.hasCustomAiKey
                        ? blog.aiApiKey || '••••••••••••••••'
                        : 'sk-or-v1-xxxxxxxxxxxxxxxxxxxx'
                    }
                    className="w-full rounded-lg border border-zinc-300 py-2 pl-3 pr-20 text-sm font-mono focus:border-purple-600 focus:outline-none"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1 text-zinc-400">
                    <button
                      type="button"
                      onClick={() => setShowAiKey(!showAiKey)}
                      className="p-1 hover:text-zinc-600 rounded"
                      title={showAiKey ? 'Hide key' : 'Show key'}
                    >
                      {showAiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {aiApiKey && (
                      <button
                        type="button"
                        onClick={() => setAiApiKey('')}
                        className="p-1 hover:text-red-600 rounded text-xs font-sans font-medium"
                        title="Clear input"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500">
                  {blog?.hasCustomAiKey
                    ? 'A custom key is saved. Leave blank or masked to keep it, or type a new key to update.'
                    : 'No custom key set. The blog uses the system environment variable default unless overridden here.'}
                </p>
              </div>

              {/* Model Identifier & Suggestions */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-zinc-600 tracking-wider">
                  Model Identifier
                </label>
                <input
                  type="text"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  placeholder="google/gemini-2.0-flash-001"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:border-purple-600 focus:outline-none"
                />

                <div className="pt-1">
                  <span className="text-[11px] text-zinc-500 font-medium block mb-1.5">
                    Recommended Model Suggestions (click to apply):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {MODEL_SUGGESTIONS.map((item) => (
                      <button
                        key={item.model}
                        type="button"
                        onClick={() => setAiModel(item.model)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition ${
                          aiModel === item.model
                            ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">({item.desc})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Base URL (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase text-zinc-600 tracking-wider">
                  API Base URL (Optional)
                </label>
                <input
                  type="text"
                  value={aiBaseUrl}
                  onChange={(e) => setAiBaseUrl(e.target.value)}
                  placeholder="https://openrouter.ai/api/v1"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:border-purple-600 focus:outline-none"
                />
                <p className="text-[11px] text-zinc-500">
                  Leave empty to default to OpenRouter gateway (<code className="font-mono text-zinc-700">https://openrouter.ai/api/v1</code>).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={testingAi}
                  onClick={handleTestAiConnection}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:opacity-50 transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${testingAi ? 'animate-spin' : ''}`} />
                  <span>{testingAi ? 'Testing Live Connection...' : 'Test Connection'}</span>
                </button>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {blog?.hasCustomAiKey && (
                    <button
                      type="button"
                      disabled={savingAi}
                      onClick={handleClearCustomAiKey}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/50 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Revert to Default</span>
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={savingAi}
                    onClick={handleSaveAiSettings}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>{savingAi ? 'Saving...' : 'Save AI Settings'}</span>
                  </button>
                </div>
              </div>

              {/* Feedback Alerts */}
              {aiSaveMessage && (
                <div className="rounded-lg bg-emerald-50 p-3.5 text-xs text-emerald-800 border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{aiSaveMessage}</span>
                </div>
              )}
              {aiSaveError && (
                <div className="rounded-lg bg-red-50 p-3.5 text-xs text-red-700 border border-red-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{aiSaveError}</span>
                </div>
              )}

              {/* Live Test Results Alert */}
              {aiTestResult && (
                <div
                  className={`rounded-lg p-4 text-xs font-mono border ${
                    aiTestResult.success
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {aiTestResult.success ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Connection Verified Successfully</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                        <span>Connection Failed</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1">{aiTestResult.message || aiTestResult.error}</p>
                  {aiTestResult.latencyMs && (
                    <span className="text-[11px] text-zinc-500 block mt-1.5 font-sans">
                      Roundtrip latency: <strong className="font-mono">{aiTestResult.latencyMs}ms</strong> &bull; Tested model: <code className="font-mono text-purple-700">{aiTestResult.model}</code>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* OpenRouter Setup Guide Card */}
            <div className="rounded-xl border border-zinc-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
                  About OpenRouter & LLM Integration
                </h4>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Get API Key</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                <p>
                  OpenRouter is a unified AI router providing access to top models from Google, Anthropic, DeepSeek, Meta, and OpenAI under a single API key and billing account.
                </p>
                <p>
                  In TopLog, your configured LLM powers:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  <li><strong>Instant 1-Click Translation:</strong> Translate your posts and metadata across dozens of languages while preserving markdown and HTML formatting.</li>
                  <li><strong>Automated SEO Optimization:</strong> Generate search-optimized meta titles, descriptions, and keywords directly inside the post editor.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'ai' && (
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-black disabled:opacity-50 transition"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
