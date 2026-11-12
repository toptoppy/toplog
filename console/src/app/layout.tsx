import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

export const metadata: Metadata = {
  title: 'TopLog Studio',
  description: 'High-performance multi-tenant blogging platform studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-astryx-theme="neutral" className="h-full antialiased">
      <body className="min-h-full bg-[#f4f4f6] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
