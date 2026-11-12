'use client'

import React from 'react'

interface CodeInjectionTabProps {
  codeHead: string
  setCodeHead: (val: string) => void
  codeFoot: string
  setCodeFoot: (val: string) => void
}

export default function CodeInjectionTab({
  codeHead,
  setCodeHead,
  codeFoot,
  setCodeFoot,
}: CodeInjectionTabProps) {
  return (
    <div className="space-y-6 rounded-container border border-neutral-200 bg-white p-6 shadow-astryx-low">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase text-neutral-800">
            Header Code Injection (<code className="text-neutral-900 font-mono">&lt;head&gt;</code>)
          </label>
          <span className="text-[11px] text-neutral-400 font-mono">Injected before &lt;/head&gt;</span>
        </div>
        <textarea
          rows={7}
          value={codeHead}
          onChange={(e) => setCodeHead(e.target.value)}
          placeholder="<!-- Google Tag Manager, Google Analytics, custom <style> or Meta tags -->&#10;<script async src='https://www.googletagmanager.com/gtag/js?id=G-XXXXX'></script>"
          className="w-full rounded-inner border border-neutral-800 p-3 text-xs font-mono bg-neutral-950 text-neutral-100 focus:border-neutral-600 focus:outline-none shadow-inner"
        />
        <p className="text-xs text-neutral-500 mt-1">
          Raw HTML / scripts injected into the <code className="font-mono text-neutral-700">&lt;head&gt;</code> of every public post and page.
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase text-neutral-800">
            Footer Code Injection (<code className="text-neutral-900 font-mono">&lt;body&gt;</code>)
          </label>
          <span className="text-[11px] text-neutral-400 font-mono">Injected before &lt;/body&gt;</span>
        </div>
        <textarea
          rows={7}
          value={codeFoot}
          onChange={(e) => setCodeFoot(e.target.value)}
          placeholder="<!-- Chat widgets (Crisp, Intercom), analytics trackers, or custom scripts -->&#10;<script>console.log('Page loaded');</script>"
          className="w-full rounded-inner border border-neutral-800 p-3 text-xs font-mono bg-neutral-950 text-neutral-100 focus:border-neutral-600 focus:outline-none shadow-inner"
        />
        <p className="text-xs text-neutral-500 mt-1">
          Raw HTML / scripts injected right before the closing <code className="font-mono text-neutral-700">&lt;/body&gt;</code> tag.
        </p>
      </div>
    </div>
  )
}
