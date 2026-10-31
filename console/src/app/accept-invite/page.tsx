'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react'

function AcceptInviteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { user, loading: authLoading } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [joinedBlogId, setJoinedBlogId] = useState<number | null>(null)

  const handleAccept = async () => {
    if (!token) {
      setError('No invitation token provided in URL')
      return
    }

    setLoading(true)
    setError('')
    try {
      const member = await api.team.acceptInvite(token)
      setSuccess(true)
      setJoinedBlogId(member.blogId)
      setTimeout(() => {
        router.push(`/blogs/${member.blogId}`)
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to accept invitation')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          <ShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Team Invitation</h1>
          <p className="text-sm text-slate-500 mb-6">
            You have been invited to collaborate on a blog. Please log in or register an account to join the publication.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/login?redirect=/accept-invite?token=${token || ''}`}
              className="rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              Log in to accept
            </Link>
            <Link
              href={`/register?redirect=/accept-invite?token=${token || ''}`}
              className="rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
          <ShieldCheck className="h-8 w-8" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2">Join Publication Team</h1>
        <p className="text-sm text-slate-500 mb-6">
          Logged in as <strong>{user.email}</strong>. Accept this invitation to join the team and access the publication studio.
        </p>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200 mb-4 flex items-center gap-2 text-left">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {success ? (
          <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800 border border-emerald-200">
            <p className="font-bold">Welcome to the team!</p>
            <p className="text-xs mt-1">Redirecting you to the publication studio...</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={loading || !token}
            onClick={handleAccept}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Joining...' : 'Accept Invitation & Join'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    }>
      <AcceptInviteContent />
    </Suspense>
  )
}
