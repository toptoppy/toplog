'use client'

import React from 'react'
import {
  X,
  Trash2,
  ImageIcon,
  Sparkles,
  Star,
  Globe,
  Link as LinkIcon,
  Calendar,
} from 'lucide-react'

interface PostSettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
  featuredImageUrl: string
  setFeaturedImageUrl: (url: string) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  activeLang: string
  description: string
  setDescription: (desc: string) => void
  handleGenerateSeo: () => void
  generatingSeo: boolean
  seoSuggestions: {
    titles?: string[]
    metaDescription?: string
    tags?: string[]
  } | null
  setSeoSuggestions: (s: any) => void
  setTitle: (title: string) => void
  isFeatured: boolean
  setIsFeatured: (feat: boolean) => void
  isPage: boolean
  setIsPage: (page: boolean) => void
  handleDeletePost: () => void
  onOpenSeoPreview?: () => void
  canonicalUrl?: string
  setCanonicalUrl?: (url: string) => void
  publishedAt?: string | null
  setPublishedAt?: (val: string | null) => void
  scheduledAt?: string | null
  postStatus?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
}

export default function PostSettingsDrawer({
  isOpen,
  onClose,
  featuredImageUrl,
  setFeaturedImageUrl,
  fileInputRef,
  handleImageUpload,
  activeLang,
  description,
  setDescription,
  handleGenerateSeo,
  generatingSeo,
  seoSuggestions,
  setSeoSuggestions,
  setTitle,
  isFeatured,
  setIsFeatured,
  isPage,
  setIsPage,
  handleDeletePost,
  onOpenSeoPreview,
  canonicalUrl = '',
  setCanonicalUrl,
  publishedAt,
  setPublishedAt,
  scheduledAt,
  postStatus = 'DRAFT',
}: PostSettingsDrawerProps) {
  if (!isOpen) return null

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0 rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
          Post Settings
        </h3>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* SEO & Social Card Preview Trigger */}
      {onOpenSeoPreview && (
        <button
          type="button"
          onClick={onOpenSeoPreview}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-purple-900 transition group text-left shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">SEO & Social Preview</div>
              <div className="text-[10px] text-purple-700/80">Google, Twitter & Facebook cards</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-purple-700 bg-white/80 border border-purple-200 px-2 py-0.5 rounded-md group-hover:bg-purple-600 group-hover:text-white transition">
            Preview
          </span>
        </button>
      )}

      {/* Featured Image */}
      <div>
        <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500 mb-1.5">
          Featured Cover Image
        </label>
        {featuredImageUrl ? (
          <div className="relative group mb-2 rounded-lg overflow-hidden border border-zinc-200">
            <img
              src={featuredImageUrl}
              alt="Featured"
              className="w-full h-36 object-cover"
            />
            <button
              onClick={() => setFeaturedImageUrl('')}
              className="absolute top-2 right-2 rounded-md bg-black/60 p-1 text-white hover:bg-black transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://... or upload"
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
          <input
            type="file"
            ref={fileInputRef as any}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition"
            title="Upload image from device"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Meta Description / Excerpt */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500">
            Meta Description ({activeLang.toUpperCase()})
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleGenerateSeo}
              disabled={generatingSeo}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-800 disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3 text-purple-600" />
              {generatingSeo ? 'Generating...' : 'AI Generate'}
            </button>
            <span className={`text-[10px] font-mono ${description.length > 160 ? 'text-red-600 font-bold' : 'text-zinc-400'}`}>
              {description.length} / 160
            </span>
          </div>
        </div>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="SEO summary and article excerpt..."
          className="w-full rounded-lg border border-zinc-200 p-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
        />
      </div>

      {/* Canonical URL Override */}
      {setCanonicalUrl && (
        <div>
          <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <LinkIcon className="h-3 w-3" />
              <span>Canonical URL</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Optional</span>
          </label>
          <input
            type="url"
            value={canonicalUrl || ''}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="https://original-source.com/post"
            className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        </div>
      )}

      {/* AI SEO Suggestions */}
      {seoSuggestions && (
        <div className="rounded-lg bg-purple-50/80 border border-purple-200/80 p-3 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-950">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" /> AI Suggestions
            </span>
            <button
              type="button"
              onClick={() => setSeoSuggestions(null)}
              className="text-zinc-400 hover:text-zinc-600 text-[10px]"
            >
              Dismiss
            </button>
          </div>
          {seoSuggestions.titles && seoSuggestions.titles.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 block mb-1">
                Alternative Titles (Click to Apply)
              </span>
              <div className="space-y-1">
                {seoSuggestions.titles.map((altTitle, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTitle(altTitle)}
                    className="w-full text-left text-xs text-zinc-900 hover:text-purple-950 bg-white hover:bg-purple-50 border border-zinc-200 hover:border-purple-300 rounded px-2 py-1 transition truncate block"
                    title={altTitle}
                  >
                    {altTitle}
                  </button>
                ))}
              </div>
            </div>
          )}
          {seoSuggestions.tags && seoSuggestions.tags.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 block mb-1">
                Suggested Tags
              </span>
              <div className="flex flex-wrap gap-1">
                {seoSuggestions.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Publication Date & Scheduling */}
      {setPublishedAt && (
        <div className="space-y-2 pt-3 border-t border-zinc-100">
          <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Publish Date</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {postStatus === 'SCHEDULED' ? 'Scheduled' : 'Backdating'}
            </span>
          </label>

          {postStatus === 'SCHEDULED' && scheduledAt ? (
            <div className="rounded-lg bg-purple-50 border border-purple-200 p-2 text-xs text-purple-900">
              <div className="font-semibold">Scheduled for:</div>
              <div className="font-mono text-[11px] text-purple-700 mt-0.5">
                {new Date(scheduledAt).toLocaleString()}
              </div>
            </div>
          ) : (
            <div>
              <input
                type="datetime-local"
                value={
                  publishedAt
                    ? new Date(publishedAt).toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) {
                    setPublishedAt(new Date(e.target.value).toISOString())
                  } else {
                    setPublishedAt(null)
                  }
                }}
                className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <p className="text-[10px] text-zinc-400 mt-1">
                Customize publish date or backdate imported stories.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Visibility & Flags */}
      <div className="space-y-2.5 pt-3 border-t border-zinc-100">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <span className="text-xs font-medium text-zinc-700 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Featured Article
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isPage}
            onChange={(e) => setIsPage(e.target.checked)}
            className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <span className="text-xs font-medium text-zinc-700">Static Page (No dates)</span>
        </label>
      </div>

      {/* Danger Zone */}
      <div className="pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={handleDeletePost}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Post</span>
        </button>
      </div>
    </aside>
  )
}
