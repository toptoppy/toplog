'use client'

import React from 'react'
import { Trash2, Upload, Moon } from 'lucide-react'

export const COLOR_PRESETS = [
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Slate', hex: '#0f172a' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Indigo', hex: '#4f46e5' },
]

export const FONT_OPTIONS = [
  { label: 'Inter (Modern Sans)', value: 'Inter' },
  { label: 'Roboto (Clean Sans)', value: 'Roboto' },
  { label: 'Poppins (Geometric)', value: 'Poppins' },
  { label: 'Merriweather (Classic Editorial Serif)', value: 'Merriweather' },
  { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
  { label: 'Fira Code (Developer Monospace)', value: 'Fira Code' },
  { label: 'System Sans', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' },
]

interface BrandingTabProps {
  logoUrl: string
  setLogoUrl: (val: string) => void
  faviconUrl: string
  setFaviconUrl: (val: string) => void
  logoInputRef: React.RefObject<HTMLInputElement | null>
  faviconInputRef: React.RefObject<HTMLInputElement | null>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => void
  accentColor: string
  setAccentColor: (val: string) => void
  fontFamily: string
  setFontFamily: (val: string) => void
  darkModeEnabled: boolean
  setDarkModeEnabled: (val: boolean) => void
}

export default function BrandingTab({
  logoUrl,
  setLogoUrl,
  faviconUrl,
  setFaviconUrl,
  logoInputRef,
  faviconInputRef,
  handleFileUpload,
  accentColor,
  setAccentColor,
  fontFamily,
  setFontFamily,
  darkModeEnabled,
  setDarkModeEnabled,
}: BrandingTabProps) {
  return (
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
  )
}
