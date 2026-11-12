import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UsersPage from './page'
import { api } from '@/lib/api'

// Mock next/navigation
const mockPush = vi.fn()
const mockReplace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useParams: () => ({}),
  usePathname: () => '/users',
}))

// Mock useAuth
const mockUser = {
  id: 1,
  name: 'Platform Admin',
  email: 'admin@example.com',
  role: 'ADMIN' as const,
}

vi.mock('@/lib/auth-context', () => ({
  useAuth: () => ({
    user: mockUser,
    loading: false,
    logout: vi.fn(),
  }),
}))

// Mock API
vi.mock('@/lib/api', () => ({
  api: {
    users: {
      list: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      resetPassword: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

describe('UsersPage Component', () => {
  const sampleUsers = [
    {
      id: 1,
      name: 'Platform Admin',
      email: 'admin@example.com',
      role: 'ADMIN' as const,
      ownedBlogsCount: 2,
      memberBlogsCount: 2,
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Second Admin',
      email: 'second-admin@example.com',
      role: 'ADMIN' as const,
      ownedBlogsCount: 1,
      memberBlogsCount: 1,
      createdAt: '2026-01-02T00:00:00Z',
    },
    {
      id: 3,
      name: 'Regular Author',
      email: 'author@example.com',
      role: 'AUTHOR' as const,
      ownedBlogsCount: 0,
      memberBlogsCount: 1,
      createdAt: '2026-01-03T00:00:00Z',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.users.list).mockResolvedValue(sampleUsers)
  })

  it('renders metric cards and user table correctly', async () => {
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getByText('Platform Users')).toBeInTheDocument()
      expect(screen.getByText('Platform Admin')).toBeInTheDocument()
      expect(screen.getByText('Second Admin')).toBeInTheDocument()
      expect(screen.getByText('Regular Author')).toBeInTheDocument()
    })

    // Metric counts
    expect(screen.getByText('3')).toBeInTheDocument() // Total Users
  })

  it('disables delete button for current user (self-deletion guard)', async () => {
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getByText('YOU')).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByTitle(/delete|remove/i)
    // First user is id: 1 (current user), button must be disabled
    expect(deleteButtons[0]).toBeDisabled()
  })

  it('filters users when search term is entered', async () => {
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getByText('Second Admin')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by name or email/i)
    fireEvent.change(searchInput, { target: { value: 'author' } })

    expect(screen.getByText('Regular Author')).toBeInTheDocument()
    expect(screen.queryByText('Second Admin')).not.toBeInTheDocument()
  })

  it('opens delete modal for another admin and verifies security prompt', async () => {
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getByText('Second Admin')).toBeInTheDocument()
    })

    // Click delete on Second Admin (index 1)
    const deleteButtons = screen.getAllByTitle('Remove User / Admin')
    fireEvent.click(deleteButtons[0]) // First enabled delete button corresponds to Second Admin

    // Verify modal appears with security warning
    expect(screen.getByText('Remove Platform Administrator')).toBeInTheDocument()
    expect(screen.getByText(/You are removing a/i)).toBeInTheDocument()
    expect(screen.getByText(/Publication Ownership Transfer/i)).toBeInTheDocument()

    // Permanently Delete button should be disabled until email is typed
    const confirmDeleteBtn = screen.getByRole('button', { name: /permanently delete user/i })
    expect(confirmDeleteBtn).toBeDisabled()

    // Type matching confirmation email
    const emailInput = screen.getByPlaceholderText(/type email address here/i)
    fireEvent.change(emailInput, { target: { value: 'second-admin@example.com' } })

    expect(confirmDeleteBtn).toBeEnabled()
  })
})
