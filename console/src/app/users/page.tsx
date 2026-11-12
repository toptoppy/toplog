'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { PlatformUser, UserRole } from '@/lib/types'
import {
  Users,
  Shield,
  UserPlus,
  Trash2,
  Key,
  Edit2,
  ChevronLeft,
  Search,
  AlertTriangle,
  CheckCircle2,
  X,
  RefreshCw,
  FileText,
  Lock,
  Mail,
  User as UserIcon,
  Globe,
  Sparkles,
} from 'lucide-react'

export default function UsersPage() {
  const { user: currentUser, loading: authLoading } = useAuth()
  const router = useRouter()

  const [users, setUsers] = useState<PlatformUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL')

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR' as UserRole,
  })

  // Delete modal states
  const [confirmEmailInput, setConfirmEmailInput] = useState('')
  const [transferOwnerId, setTransferOwnerId] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Auth Protection
  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.replace('/login')
      } else if (currentUser.role !== 'ADMIN') {
        router.replace('/blogs')
      }
    }
  }, [currentUser, authLoading, router])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.users.list()
      setUsers(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load platform users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?.role === 'ADMIN') {
      fetchUsers()
    }
  }, [currentUser])

  // Count metrics
  const metrics = useMemo(() => {
    const total = users.length
    const admins = users.filter((u) => u.role === 'ADMIN').length
    const editors = users.filter((u) => u.role === 'EDITOR').length
    const authors = users.filter((u) => u.role === 'AUTHOR').length
    return { total, admins, editors, authors }
  }, [users])

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [users, searchQuery, roleFilter])

  // Eligible admin candidates for blog ownership transfer
  const adminCandidates = useMemo(() => {
    return users.filter((u) => u.role === 'ADMIN' && u.id !== selectedUser?.id)
  }, [users, selectedUser])

  // Handle Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setActionLoading(true)
    try {
      await api.users.create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      setSuccessMessage(`User "${formData.name}" was created successfully.`)
      setShowCreateModal(false)
      setFormData({ name: '', email: '', password: '', role: 'AUTHOR' })
      await fetchUsers()
    } catch (err: any) {
      setError(err.message || 'Failed to create user')
    } finally {
      setActionLoading(false)
    }
  }

  // Handle Edit User
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setError('')
    setActionLoading(true)
    try {
      await api.users.update(selectedUser.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      })
      setSuccessMessage(`User "${formData.name}" was updated successfully.`)
      setShowEditModal(false)
      setSelectedUser(null)
      await fetchUsers()
    } catch (err: any) {
      setError(err.message || 'Failed to update user')
    } finally {
      setActionLoading(false)
    }
  }

  // Handle Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setError('')
    setActionLoading(true)
    try {
      await api.users.resetPassword(selectedUser.id, {
        newPassword: formData.password,
      })
      setSuccessMessage(`Password for "${selectedUser.name}" has been updated.`)
      setShowResetModal(false)
      setSelectedUser(null)
      setFormData({ name: '', email: '', password: '', role: 'AUTHOR' })
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
    } finally {
      setActionLoading(false)
    }
  }

  // Handle Delete User / Admin
  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setError('')
    setActionLoading(true)
    try {
      const res = await api.users.delete(selectedUser.id, {
        confirmEmail: confirmEmailInput,
        transferOwnershipToUserId: transferOwnerId || currentUser?.id,
      })
      setSuccessMessage(
        res.blogsReassignedCount > 0
          ? `${res.message} (${res.blogsReassignedCount} publication(s) reassigned).`
          : res.message
      )
      setShowDeleteModal(false)
      setSelectedUser(null)
      setConfirmEmailInput('')
      setTransferOwnerId(null)
      await fetchUsers()
    } catch (err: any) {
      setError(err.message || 'Failed to delete user')
    } finally {
      setActionLoading(false)
    }
  }

  if (authLoading || (loading && users.length === 0)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfcfd]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900"></div>
          <span className="text-xs font-mono text-zinc-500">Loading platform directory...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-zinc-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm hover:border-zinc-300 hover:text-zinc-900 transition"
            >
              <ChevronLeft className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 transition" />
              <span>Back to Publications</span>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-200"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
                <Users className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-zinc-900">Platform Users</span>
              <span className="rounded-full bg-purple-100 border border-purple-200 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700">
                ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFormData({ name: '', email: '', password: '', role: 'AUTHOR' })
                setShowCreateModal(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Create User</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl bg-red-50 p-4 text-xs font-medium text-red-700 border border-red-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 flex items-center justify-between rounded-xl bg-emerald-50 p-4 text-xs font-medium text-emerald-800 border border-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">Total Users</span>
              <Users className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">{metrics.total}</p>
          </div>

          <div className="rounded-xl border border-purple-200/70 bg-purple-50/30 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-700">Administrators</span>
              <Shield className="h-4 w-4 text-purple-600" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-purple-900">{metrics.admins}</p>
          </div>

          <div className="rounded-xl border border-amber-200/70 bg-amber-50/30 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">Editors</span>
              <FileText className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-amber-900">{metrics.editors}</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">Authors</span>
              <UserIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">{metrics.authors}</p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-4 py-2 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(['ALL', 'ADMIN', 'EDITOR', 'AUTHOR'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  roleFilter === r
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {r === 'ALL' ? 'All Roles' : r}
              </button>
            ))}
            <button
              onClick={fetchUsers}
              className="p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition"
              title="Refresh users"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/60 font-mono uppercase text-[11px] text-zinc-500">
                  <th className="py-3.5 pl-6 pr-3">User</th>
                  <th className="px-3 py-3.5">Platform Role</th>
                  <th className="px-3 py-3.5">Owned Blogs</th>
                  <th className="px-3 py-3.5">Joined</th>
                  <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-400">
                      No platform users found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelf = currentUser?.id === u.id
                    const isSoleAdmin = u.role === 'ADMIN' && metrics.admins <= 1

                    return (
                      <tr key={u.id} className="hover:bg-zinc-50/70 transition">
                        {/* User Identity */}
                        <td className="py-4 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-700 uppercase ring-1 ring-zinc-200 text-xs">
                              {u.name.slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-zinc-900">{u.name}</span>
                                {isSelf && (
                                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-mono font-bold text-blue-700 border border-blue-200">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <span className="text-zinc-500 font-mono text-[11px]">{u.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Platform Role Badge */}
                        <td className="px-3 py-4">
                          {u.role === 'ADMIN' && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-[11px] font-semibold text-purple-700 border border-purple-200/80">
                              <Shield className="h-3 w-3" />
                              ADMIN
                            </span>
                          )}
                          {u.role === 'EDITOR' && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 border border-amber-200/80">
                              EDITOR
                            </span>
                          )}
                          {u.role === 'AUTHOR' && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700 border border-zinc-200/80">
                              AUTHOR
                            </span>
                          )}
                        </td>

                        {/* Owned Blogs */}
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-zinc-400" />
                            <span className="font-medium text-zinc-700">
                              {u.ownedBlogsCount}{' '}
                              <span className="text-zinc-400 text-[11px]">publication{u.ownedBlogsCount !== 1 ? 's' : ''}</span>
                            </span>
                          </div>
                        </td>

                        {/* Joined Date */}
                        <td className="px-3 py-4 text-zinc-500 font-mono text-[11px]">
                          {u.createdAt.slice(0, 10)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 pl-3 pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit Button */}
                            <button
                              onClick={() => {
                                setSelectedUser(u)
                                setFormData({
                                  name: u.name,
                                  email: u.email,
                                  password: '',
                                  role: u.role,
                                })
                                setShowEditModal(true)
                              }}
                              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                              title="Edit User"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>

                            {/* Reset Password Button */}
                            <button
                              onClick={() => {
                                setSelectedUser(u)
                                setFormData({ name: '', email: '', password: '', role: u.role })
                                setShowResetModal(true)
                              }}
                              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                              title="Reset Password"
                            >
                              <Key className="h-3.5 w-3.5" />
                            </button>

                            {/* Delete User Button */}
                            <button
                              disabled={isSelf || isSoleAdmin}
                              onClick={() => {
                                setSelectedUser(u)
                                setConfirmEmailInput('')
                                setTransferOwnerId(currentUser?.id || null)
                                setShowDeleteModal(true)
                              }}
                              className={`rounded-lg p-1.5 transition ${
                                isSelf || isSoleAdmin
                                  ? 'cursor-not-allowed text-zinc-300'
                                  : 'text-zinc-400 hover:bg-red-50 hover:text-red-600'
                              }`}
                              title={
                                isSelf
                                  ? 'You cannot delete your own account'
                                  : isSoleAdmin
                                  ? 'Cannot delete the sole administrator'
                                  : 'Remove User / Admin'
                              }
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* CREATE USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-zinc-700" />
                <h3 className="font-bold text-zinc-900 text-sm">Create Platform User</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Initial Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Platform Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs bg-white focus:border-zinc-900 focus:outline-none"
                >
                  <option value="AUTHOR">Author (Can contribute to invited publications)</option>
                  <option value="EDITOR">Editor (Can edit publications and posts)</option>
                  <option value="ADMIN">Platform Administrator (Full system privileges)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-zinc-900 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
                >
                  {actionLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-zinc-700" />
                <h3 className="font-bold text-zinc-900 text-sm">Edit User: {selectedUser.name}</h3>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Platform Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  disabled={selectedUser.role === 'ADMIN' && metrics.admins <= 1}
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs bg-white focus:border-zinc-900 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-400"
                >
                  <option value="AUTHOR">Author</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Platform Administrator</option>
                </select>
                {selectedUser.role === 'ADMIN' && metrics.admins <= 1 && (
                  <p className="mt-1 text-[11px] text-amber-600">
                    Cannot demote the last remaining platform administrator.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-zinc-900 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-zinc-700" />
                <h3 className="font-bold text-zinc-900 text-sm">Reset Password</h3>
              </div>
              <button onClick={() => setShowResetModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              Set a new password for <span className="font-semibold text-zinc-900">{selectedUser.name}</span> ({selectedUser.email}).
            </p>

            <form onSubmit={handleResetPassword} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || formData.password.length < 8}
                  className="rounded-lg bg-zinc-900 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
                >
                  {actionLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE USER / ADMIN MODAL (High Security) */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-red-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-bold text-sm">
                  {selectedUser.role === 'ADMIN' ? 'Remove Platform Administrator' : 'Delete User'}
                </h3>
              </div>
              <button onClick={() => setShowDeleteModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-zinc-600">
              {selectedUser.role === 'ADMIN' && (
                <div className="rounded-xl bg-red-50 p-3.5 border border-red-200 text-red-800">
                  <p className="font-bold">⚠️ Security Warning</p>
                  <p className="mt-1">
                    You are removing a <strong>Platform Administrator</strong>. They will immediately lose access to all publications, database operations, and system administration.
                  </p>
                </div>
              )}

              <p>
                Are you sure you want to permanently delete{' '}
                <strong className="text-zinc-900">{selectedUser.name}</strong> ({selectedUser.email})?
              </p>

              {/* Blog Ownership Reassignment Section */}
              {selectedUser.ownedBlogsCount > 0 && (
                <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-amber-900">
                  <p className="font-bold">Publication Ownership Transfer</p>
                  <p className="mt-1">
                    This user owns <strong>{selectedUser.ownedBlogsCount} publication(s)</strong>. To prevent loss of content, ownership must be transferred to another administrator:
                  </p>

                  <div className="mt-3">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-800 mb-1">
                      New Publication Owner
                    </label>
                    <select
                      value={transferOwnerId || currentUser?.id}
                      onChange={(e) => setTransferOwnerId(Number(e.target.value))}
                      className="w-full rounded-lg border border-amber-300 bg-white p-2 text-xs font-medium text-zinc-900 focus:outline-none"
                    >
                      {adminCandidates.map((adm) => (
                        <option key={adm.id} value={adm.id}>
                          {adm.name} ({adm.email}) {adm.id === currentUser?.id ? '— You' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Confirmation Input */}
              <div className="pt-2">
                <label className="block font-medium text-zinc-700 mb-1">
                  Type <span className="font-mono font-bold text-zinc-900">{selectedUser.email}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmEmailInput}
                  onChange={(e) => setConfirmEmailInput(e.target.value)}
                  placeholder="Type email address here..."
                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs focus:border-red-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="rounded-lg border border-zinc-200 px-3.5 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  disabled={
                    actionLoading ||
                    confirmEmailInput.trim().toLowerCase() !== selectedUser.email.toLowerCase()
                  }
                  className="rounded-lg bg-red-600 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 transition"
                >
                  {actionLoading ? 'Deleting...' : 'Permanently Delete User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
