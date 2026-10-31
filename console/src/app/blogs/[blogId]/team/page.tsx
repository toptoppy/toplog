'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { Blog, BlogMember, BlogInvite, BlogRole, TeamOverview } from '@/lib/types'
import {
  Shield,
  UserPlus,
  Trash2,
  Mail,
  Copy,
  Check,
  RefreshCw,
  Clock,
  UserCheck,
  AlertCircle,
} from 'lucide-react'

export default function TeamPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [blog, setBlog] = useState<Blog | null>(null)
  const [team, setTeam] = useState<TeamOverview | null>(null)
  const [loading, setLoading] = useState(true)

  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<BlogRole>('AUTHOR')
  const [inviting, setInviting] = useState(false)
  const [newInviteToken, setNewInviteToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadData = async () => {
    try {
      const [b, t] = await Promise.all([
        api.blogs.get(blogId),
        api.team.getOverview(blogId),
      ])
      setBlog(b)
      setTeam(t)
    } catch (err: any) {
      setError(err.message || 'Failed to load team data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (blogId) {
      loadData()
    }
  }, [blogId])

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return

    setInviting(true)
    setError('')
    setMessage('')
    try {
      const invite = await api.team.invite(blogId, {
        email: inviteEmail.trim(),
        role: inviteRole,
      })
      setNewInviteToken(invite.token)
      setMessage(`Invitation created for ${invite.email}`)
      const t = await api.team.getOverview(blogId)
      setTeam(t)
    } catch (err: any) {
      setError(err.message || 'Failed to send invitation')
    } finally {
      setInviting(false)
    }
  }

  const handleUpdateRole = async (targetUserId: number, newRole: BlogRole) => {
    try {
      await api.team.updateRole(blogId, targetUserId, newRole)
      setMessage('Member role updated successfully')
      const t = await api.team.getOverview(blogId)
      setTeam(t)
    } catch (err: any) {
      setError(err.message || 'Failed to update member role')
    }
  }

  const handleRemoveMember = async (targetUserId: number, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from this blog's team?`)) return

    try {
      await api.team.removeMember(blogId, targetUserId)
      setMessage('Member removed successfully')
      const t = await api.team.getOverview(blogId)
      setTeam(t)
    } catch (err: any) {
      setError(err.message || 'Failed to remove member')
    }
  }

  const handleRevokeInvite = async (inviteId: number) => {
    try {
      await api.team.revokeInvite(blogId, inviteId)
      setMessage('Invitation revoked')
      const t = await api.team.getOverview(blogId)
      setTeam(t)
    } catch (err: any) {
      setError(err.message || 'Failed to revoke invite')
    }
  }

  const copyInviteLink = (token: string) => {
    const link = `${window.location.origin}/accept-invite?token=${token}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading || !blog || !team) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Team & Permissions
              </h1>
              <p className="text-sm text-slate-500">
                Collaborate with authors, editors, and co-administrators on this publication.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setInviteEmail('')
            setInviteRole('AUTHOR')
            setNewInviteToken(null)
            setShowInviteModal(true)
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
          {message}
        </div>
      )}

      {/* Active Team Members */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Team ({team.members.length})</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Users with write or management access to this blog
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {team.members.map((member) => {
            const isOwner = member.userId === blog.ownerId
            return (
              <div
                key={member.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center uppercase text-sm">
                    {member.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{member.name}</span>
                      {isOwner && (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          PRIMARY OWNER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {isOwner ? (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 uppercase">
                      ADMIN
                    </span>
                  ) : (
                    <select
                      value={member.role}
                      onChange={(e) => handleUpdateRole(member.userId, e.target.value as BlogRole)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase text-slate-700 focus:border-blue-600 focus:outline-none"
                    >
                      <option value="AUTHOR">Author</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  )}

                  {!isOwner && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.userId, member.name)}
                      className="p-2 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                      title="Remove member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pending Invitations */}
      {team.pendingInvites.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Pending Invitations ({team.pendingInvites.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These users were invited but have not yet accepted
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {team.pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">{invite.email}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="uppercase font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                        {invite.role}
                      </span>
                      <span>•</span>
                      <span>Expires: {new Date(invite.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyInviteLink(invite.token)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-sm"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Token
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRevokeInvite(invite.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                    title="Revoke invitation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Invite Team Member</h3>
                <p className="text-xs text-slate-500">
                  Grant collaborator permissions to this publication.
                </p>
              </div>
            </div>

            {newInviteToken ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <p className="font-bold mb-1">Invitation Created!</p>
                  <p>Share this invitation token or direct link with your collaborator:</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={newInviteToken}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-mono select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => copyInviteLink(newInviteToken)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Collaborator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Role & Permissions
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as BlogRole)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  >
                    <option value="AUTHOR">Author - Can create, write, and manage own posts</option>
                    <option value="EDITOR">Editor - Can publish posts, manage tags & comments</option>
                    <option value="ADMIN">Admin - Full access to blog settings, team & webhooks</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inviting || !inviteEmail.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
                  >
                    <UserPlus className="h-4 w-4" />
                    {inviting ? 'Generating...' : 'Generate Invite'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
