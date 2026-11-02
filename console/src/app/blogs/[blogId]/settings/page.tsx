'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, AiStatus, AiTestResult, VerifyDomainResult } from '@/lib/types'
import {
  Save,
  CheckCircle2,
  Palette,
  Code2,
  Settings as SettingsIcon,
  Sparkles,
} from 'lucide-react'
import GeneralDomainTab from '@/components/settings/GeneralDomainTab'
import BrandingTab from '@/components/settings/BrandingTab'
import CodeInjectionTab from '@/components/settings/CodeInjectionTab'
import AiSettingsTab, { PROVIDER_PRESETS } from '@/components/settings/AiSettingsTab'

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
  const [domainVerifyResult, setDomainVerifyResult] = useState<VerifyDomainResult | null>(null)
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
      setDomainVerifyResult(res)
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
          <GeneralDomainTab
            blog={blog}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            customDomain={customDomain}
            setCustomDomain={setCustomDomain}
            defaultLanguage={defaultLanguage}
            setDefaultLanguage={setDefaultLanguage}
            themeName={themeName}
            setThemeName={setThemeName}
            verifyingDomain={verifyingDomain}
            handleVerifyDomain={handleVerifyDomain}
            domainVerifyResult={domainVerifyResult}
            exportingArchive={exportingArchive}
            handleExportArchive={handleExportArchive}
          />
        )}

        {/* TAB 2: Branding & Appearance */}
        {activeTab === 'branding' && (
          <BrandingTab
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            faviconUrl={faviconUrl}
            setFaviconUrl={setFaviconUrl}
            logoInputRef={logoInputRef}
            faviconInputRef={faviconInputRef}
            handleFileUpload={handleFileUpload}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            darkModeEnabled={darkModeEnabled}
            setDarkModeEnabled={setDarkModeEnabled}
          />
        )}

        {/* TAB 3: Code Injection */}
        {activeTab === 'code' && (
          <CodeInjectionTab
            codeHead={codeHead}
            setCodeHead={setCodeHead}
            codeFoot={codeFoot}
            setCodeFoot={setCodeFoot}
          />
        )}

        {/* TAB 4: AI & OpenRouter Connection */}
        {activeTab === 'ai' && (
          <AiSettingsTab
            blog={blog}
            aiStatus={aiStatus}
            aiApiKey={aiApiKey}
            setAiApiKey={setAiApiKey}
            showAiKey={showAiKey}
            setShowAiKey={setShowAiKey}
            aiModel={aiModel}
            setAiModel={setAiModel}
            aiBaseUrl={aiBaseUrl}
            setAiBaseUrl={setAiBaseUrl}
            testingAi={testingAi}
            handleTestAiConnection={handleTestAiConnection}
            savingAi={savingAi}
            handleSaveAiSettings={handleSaveAiSettings}
            handleClearCustomAiKey={handleClearCustomAiKey}
            handleSelectProviderPreset={handleSelectProviderPreset}
            aiSaveMessage={aiSaveMessage}
            aiSaveError={aiSaveError}
            aiTestResult={aiTestResult}
          />
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
