'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  Search,
  Share2,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Link as LinkIcon,
  HelpCircle,
  FileText,
} from 'lucide-react'

interface SeoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  blogId: number
  postId: number
  blogTitle: string
  subdomain: string
  customDomain?: string | null
  activeLang: string
  title: string
  setTitle: (t: string) => void
  slug: string
  setSlug: (s: string) => void
  description: string
  setDescription: (d: string) => void
  featuredImageUrl: string
  setFeaturedImageUrl: (url: string) => void
  canonicalUrl: string
  setCanonicalUrl: (url: string) => void
  handleGenerateSeo?: () => void
  generatingSeo?: boolean
}

export default function SeoPreviewModal({
  isOpen,
  onClose,
  blogId,
  postId,
  blogTitle,
  subdomain,
  customDomain,
  activeLang,
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
  featuredImageUrl,
  setFeaturedImageUrl,
  canonicalUrl,
  setCanonicalUrl,
  handleGenerateSeo,
  generatingSeo = false,
}: SeoPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'social' | 'meta' | 'checklist'>('google')
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop')
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter')
  const [copiedUrl, setCopiedUrl] = useState(false)

  if (!isOpen) return null

  const domain = customDomain || `${subdomain || 'blog'}.localhost`
  const publicPostUrl = `https://${domain}/${slug || 'post-slug'}`
  const ogPreviewApiUrl = `/api/console/blogs/${blogId}/posts/${postId}/og-preview?language=${activeLang}`

  // Character Metrics
  const titleLen = title.length
  const descLen = description.length

  const titleStatus =
    titleLen === 0
      ? 'empty'
      : titleLen >= 40 && titleLen <= 60
      ? 'optimal'
      : titleLen < 40
      ? 'short'
      : 'long'

  const descStatus =
    descLen === 0
      ? 'empty'
      : descLen >= 120 && descLen <= 160
      ? 'optimal'
      : descLen < 120
      ? 'short'
      : 'long'

  // Scorecard calculation
  let score = 0
  if (titleLen >= 30 && titleLen <= 65) score += 25
  else if (titleLen > 0) score += 15

  if (descLen >= 100 && descLen <= 165) score += 25
  else if (descLen > 0) score += 15

  if (featuredImageUrl || postId) score += 25 // Cover image or dynamic SVG
  if (slug && /^[a-z0-9-]+$/.test(slug)) score += 25

  const copyUrl = () => {
    navigator.clipboard.writeText(publicPostUrl)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-container bg-white shadow-astryx-high border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-element bg-neutral-100 text-neutral-900 shadow-astryx-low">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-neutral-900">SEO & Social Share Preview</h2>
                <span className="rounded-element bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-700 uppercase">
                  {activeLang}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Simulate how your article appears across search engines and social platforms.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Health Score Pill */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-element px-3 py-1 text-xs font-semibold font-mono border ${
                score >= 80
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : score >= 50
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              <span>SEO Score:</span>
              <span>{score}/100</span>
            </div>

            <button
              onClick={onClose}
              className="rounded-inner p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 bg-white overflow-x-auto">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('google')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-semibold transition ${
                activeTab === 'google'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Google SERP</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-semibold transition ${
                activeTab === 'social'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Social Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('meta')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-semibold transition ${
                activeTab === 'meta'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Metadata & Canonical</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-semibold transition ${
                activeTab === 'checklist'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Audit Checklist</span>
            </button>
          </div>

          <div className="py-2">
            <button
              type="button"
              onClick={copyUrl}
              className="inline-flex items-center gap-1.5 rounded-inner border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50 shadow-astryx-low transition"
              title="Copy public URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f4f4f6]">
          {/* TAB 1: GOOGLE SERP PREVIEW */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Search Engine Result Page (SERP)
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Real-time simulation of Google search snippet on desktop and mobile.
                  </p>
                </div>

                <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-200/80 border border-zinc-300/80">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      deviceView === 'desktop'
                        ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      deviceView === 'mobile'
                        ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* SERP Card Container */}
              <div
                className={`mx-auto rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all ${
                  deviceView === 'mobile' ? 'max-w-md' : 'w-full'
                }`}
              >
                {/* SERP Header / Breadcrumb */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-700">
                    {blogTitle ? blogTitle.charAt(0).toUpperCase() : 'T'}
                  </div>
                  <div className="leading-tight">
                    <div className="text-[12px] font-medium text-zinc-800">
                      {blogTitle || 'My Publication'}
                    </div>
                    <div className="text-[11px] text-zinc-500 truncate max-w-sm">
                      https://{domain} &rsaquo; {slug || 'post-slug'}
                    </div>
                  </div>
                </div>

                {/* SERP Title */}
                <h4 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                  {title || 'Untitled Post Title'} - {blogTitle || 'My Publication'}
                </h4>

                {/* SERP Meta Description */}
                <p className="mt-1 text-sm text-[#4d5156] leading-normal line-clamp-3">
                  {description || (
                    <span className="italic text-zinc-400">
                      No meta description provided. Google will extract a snippet automatically from your post content.
                    </span>
                  )}
                </p>
              </div>

              {/* SERP Metrics Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-zinc-700">Title Length</span>
                    <span
                      className={`font-mono font-semibold ${
                        titleStatus === 'optimal'
                          ? 'text-emerald-600'
                          : titleStatus === 'short'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {titleLen} / 60 chars
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        titleStatus === 'optimal'
                          ? 'bg-emerald-500'
                          : titleStatus === 'short'
                          ? 'bg-amber-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (titleLen / 60) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1.5">
                    {titleStatus === 'optimal'
                      ? 'Optimal length! Your title fits cleanly on both desktop and mobile search snippets.'
                      : titleStatus === 'short'
                      ? 'A bit short. Consider adding high-relevance keywords to attract more readers.'
                      : 'Too long. Google may truncate your title with ellipses (...) in search results.'}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-zinc-700">Meta Description Length</span>
                    <span
                      className={`font-mono font-semibold ${
                        descStatus === 'optimal'
                          ? 'text-emerald-600'
                          : descStatus === 'short'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {descLen} / 160 chars
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        descStatus === 'optimal'
                          ? 'bg-emerald-500'
                          : descStatus === 'short'
                          ? 'bg-amber-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (descLen / 160) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1.5">
                    {descStatus === 'optimal'
                      ? 'Great summary! Fits within standard search engine snippet boundaries.'
                      : descStatus === 'short'
                      ? 'Under 120 characters. Elaborate slightly to improve search click-through rate.'
                      : 'Over 160 characters. Search engines will cut off the trailing sentence.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL CARDS PREVIEW */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Social Media Card Simulator
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Verify how your article appears when shared on Twitter (X), Facebook, and LinkedIn.
                  </p>
                </div>

                {/* Platform Selector */}
                <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-200/80 border border-zinc-300/80">
                  <button
                    onClick={() => setSocialPlatform('twitter')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      socialPlatform === 'twitter'
                        ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Twitter / X
                  </button>
                  <button
                    onClick={() => setSocialPlatform('facebook')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      socialPlatform === 'facebook'
                        ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => setSocialPlatform('linkedin')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      socialPlatform === 'linkedin'
                        ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* TWITTER (X) CARD */}
              {socialPlatform === 'twitter' && (
                <div className="max-w-lg mx-auto rounded-2xl border border-zinc-800 bg-black text-white p-4 shadow-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">
                      {blogTitle ? blogTitle.charAt(0) : 'T'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{blogTitle || 'My Publication'}</span>
                        <span className="text-zinc-500 font-normal">@{subdomain || 'toplog'}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400">Just now</div>
                    </div>
                  </div>

                  {/* Shared Post Card */}
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                    <div className="relative aspect-[1.91/1] bg-zinc-900 overflow-hidden">
                      {featuredImageUrl ? (
                        <img
                          src={featuredImageUrl}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={ogPreviewApiUrl}
                          alt="Dynamic Social Card"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-mono font-medium text-white">
                        {domain}
                      </div>
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="text-xs text-zinc-400 truncate">{domain}</div>
                      <div className="text-sm font-semibold text-white line-clamp-1">{title || 'Untitled Post'}</div>
                      <div className="text-xs text-zinc-400 line-clamp-2">
                        {description || 'Read the full story on our publication.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FACEBOOK CARD */}
              {socialPlatform === 'facebook' && (
                <div className="max-w-lg mx-auto rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {blogTitle ? blogTitle.charAt(0) : 'T'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">{blogTitle || 'My Publication'}</div>
                      <div className="text-[10px] text-zinc-400">Published &bull; Public</div>
                    </div>
                  </div>

                  {/* Facebook Link Card */}
                  <div className="rounded-lg overflow-hidden border border-zinc-200 bg-[#f0f2f5]">
                    <div className="aspect-[1.91/1] bg-zinc-100 overflow-hidden">
                      {featuredImageUrl ? (
                        <img src={featuredImageUrl} alt={title} className="w-full h-full object-cover" />
                      ) : (
                        <img src={ogPreviewApiUrl} alt="Social Card" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-3 space-y-0.5">
                      <div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                        {domain.toUpperCase()}
                      </div>
                      <div className="text-sm font-bold text-zinc-900 line-clamp-1 leading-snug">
                        {title || 'Untitled Post'}
                      </div>
                      <div className="text-xs text-zinc-600 line-clamp-2">
                        {description || 'Read the full story on our publication.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LINKEDIN CARD */}
              {socialPlatform === 'linkedin' && (
                <div className="max-w-lg mx-auto rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-md bg-[#0a66c2] text-white flex items-center justify-center font-bold text-sm">
                      in
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">{blogTitle || 'My Publication'}</div>
                      <div className="text-[10px] text-zinc-400">Engineering & Tech Publication</div>
                    </div>
                  </div>

                  {/* LinkedIn Shared Link Card */}
                  <div className="rounded-lg overflow-hidden border border-zinc-200 bg-white">
                    <div className="aspect-[1.91/1] bg-zinc-100 overflow-hidden">
                      {featuredImageUrl ? (
                        <img src={featuredImageUrl} alt={title} className="w-full h-full object-cover" />
                      ) : (
                        <img src={ogPreviewApiUrl} alt="Social Card" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-3 bg-zinc-50 space-y-0.5">
                      <div className="text-xs font-bold text-zinc-900 line-clamp-1">
                        {title || 'Untitled Post'}
                      </div>
                      <div className="text-[11px] text-zinc-500">{domain} &bull; 4 min read</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: METADATA & CANONICAL SETTINGS */}
          {activeTab === 'meta' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Search Engine Metadata Configuration
                </h3>
                <p className="text-xs text-zinc-500">
                  Fine-tune your title, slug, description, and canonical URL settings for maximum organic reach.
                </p>
              </div>

              {/* SEO Title Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700">
                    SEO Title ({activeLang.toUpperCase()})
                  </label>
                  <span className={`text-[10px] font-mono ${titleLen > 60 ? 'text-red-600 font-bold' : 'text-zinc-400'}`}>
                    {titleLen} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Primary search title..."
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
              </div>

              {/* Slug Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">
                  URL Slug
                </label>
                <div className="flex rounded-lg border border-zinc-200 overflow-hidden bg-zinc-50 focus-within:ring-1 focus-within:ring-zinc-900 focus-within:border-zinc-900">
                  <span className="px-3 py-2 text-xs font-mono text-zinc-500 bg-zinc-100 border-r border-zinc-200 select-none">
                    https://{domain}/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="post-slug"
                    className="w-full px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 bg-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Meta Description Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700">
                    Meta Description ({activeLang.toUpperCase()})
                  </label>
                  <div className="flex items-center gap-2">
                    {handleGenerateSeo && (
                      <button
                        type="button"
                        onClick={handleGenerateSeo}
                        disabled={generatingSeo}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-800 disabled:opacity-50"
                      >
                        <Sparkles className="h-3 w-3 text-purple-600" />
                        {generatingSeo ? 'Generating...' : 'AI Optimize'}
                      </button>
                    )}
                    <span className={`text-[10px] font-mono ${descLen > 160 ? 'text-red-600 font-bold' : 'text-zinc-400'}`}>
                      {descLen} / 160
                    </span>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core premise of your article in 120-160 characters..."
                  className="w-full rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
              </div>

              {/* Canonical URL Input */}
              <div className="space-y-1 rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                    <LinkIcon className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Canonical URL Override</span>
                  </label>
                  <span className="text-[10px] font-mono text-zinc-400">Optional</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  If this article was syndicated from another publication (e.g. Medium, Substack, or personal site), specify the original canonical link here to avoid duplicate content search penalties.
                </p>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://myblog.com/original-article"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
              </div>

              {/* Cover Image Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">
                  Featured Cover / OpenGraph Image URL
                </label>
                <input
                  type="text"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://... or uploaded asset URL"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
                <p className="text-[11px] text-zinc-400">
                  When left blank, TopLog automatically renders a dynamic SVG social card.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SEO CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  SEO Readiness Audit
                </h3>
                <p className="text-xs text-zinc-500">
                  Pre-publish checklist ensuring your article adheres to search engine indexing guidelines.
                </p>
              </div>

              <div className="space-y-3">
                {/* Check 1: Title */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5">
                  {titleLen >= 30 && titleLen <= 65 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900">
                      Title Length ({titleLen} characters)
                    </div>
                    <p className="text-xs text-zinc-500">
                      {titleLen >= 30 && titleLen <= 65
                        ? 'Title length is well-balanced and fits standard SERP displays.'
                        : 'Aim for 40 to 60 characters so the title conveys the full context without being cut off.'}
                    </p>
                  </div>
                </div>

                {/* Check 2: Meta Description */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5">
                  {descLen >= 100 && descLen <= 165 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900">
                      Meta Description ({descLen} characters)
                    </div>
                    <p className="text-xs text-zinc-500">
                      {descLen >= 100 && descLen <= 165
                        ? 'Optimal length for search snippets and social media previews.'
                        : 'A descriptive summary between 120 and 160 characters maximizes search click-through rates.'}
                    </p>
                  </div>
                </div>

                {/* Check 3: Social & Cover Image */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900">
                      OpenGraph Social Image
                    </div>
                    <p className="text-xs text-zinc-500">
                      {featuredImageUrl
                        ? 'Custom cover image configured for social feeds.'
                        : 'Dynamic SVG OpenGraph card enabled. TopLog will automatically generate a social banner on share.'}
                    </p>
                  </div>
                </div>

                {/* Check 4: URL Slug Format */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5">
                  {slug && /^[a-z0-9-]+$/.test(slug) ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900">
                      Clean URL Slug (/{slug || '...'})
                    </div>
                    <p className="text-xs text-zinc-500">
                      {slug && /^[a-z0-9-]+$/.test(slug)
                        ? 'Slug is clean, SEO-friendly, and contains only lowercase alphanumeric characters and hyphens.'
                        : 'Ensure the slug uses only lowercase letters, numbers, and hyphens without spaces or special symbols.'}
                    </p>
                  </div>
                </div>

                {/* Check 5: Canonical Link Tag */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900">
                      Canonical Link Meta Tag
                    </div>
                    <p className="text-xs text-zinc-500">
                      {canonicalUrl
                        ? `Custom canonical URL points to: ${canonicalUrl}`
                        : `Default canonical URL points to: ${publicPostUrl}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-3.5 bg-neutral-50/80">
          <div className="text-xs text-neutral-500 truncate max-w-md">
            Canonical: <span className="font-mono text-neutral-700">{canonicalUrl || publicPostUrl}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-inner bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-astryx-low hover:bg-neutral-800 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
