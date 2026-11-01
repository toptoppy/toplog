'use client'

import React from 'react'
import {
  Sparkles,
  Key,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { Blog, AiStatus, AiTestResult } from '@/lib/types'

export const PROVIDER_PRESETS = [
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

export const MODEL_SUGGESTIONS = [
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

interface AiSettingsTabProps {
  blog: Blog
  aiStatus: AiStatus | null
  aiApiKey: string
  setAiApiKey: (val: string) => void
  showAiKey: boolean
  setShowAiKey: (val: boolean) => void
  aiModel: string
  setAiModel: (val: string) => void
  aiBaseUrl: string
  setAiBaseUrl: (val: string) => void
  testingAi: boolean
  handleTestAiConnection: () => void
  savingAi: boolean
  handleSaveAiSettings: () => void
  handleClearCustomAiKey: () => void
  handleSelectProviderPreset: (preset: typeof PROVIDER_PRESETS[number]) => void
  aiSaveMessage: string
  aiSaveError: string
  aiTestResult: AiTestResult | null
}

export default function AiSettingsTab({
  blog,
  aiStatus,
  aiApiKey,
  setAiApiKey,
  showAiKey,
  setShowAiKey,
  aiModel,
  setAiModel,
  aiBaseUrl,
  setAiBaseUrl,
  testingAi,
  handleTestAiConnection,
  savingAi,
  handleSaveAiSettings,
  handleClearCustomAiKey,
  handleSelectProviderPreset,
  aiSaveMessage,
  aiSaveError,
  aiTestResult,
}: AiSettingsTabProps) {
  return (
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
  )
}
