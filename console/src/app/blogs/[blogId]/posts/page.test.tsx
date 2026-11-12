import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PostsListPage from './page'
import { api } from '@/lib/api'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useParams: () => ({ blogId: '1' }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/blogs/1/posts',
}))

// Mock API
vi.mock('@/lib/api', () => ({
  api: {
    blogs: {
      get: vi.fn(),
    },
    posts: {
      list: vi.fn(),
      delete: vi.fn(),
      duplicate: vi.fn(),
      runScheduler: vi.fn(),
      updateBase: vi.fn(),
    },
  },
}))

describe('PostsListPage - Translation Progress Tracking', () => {
  const mockBlog = {
    id: 1,
    ownerId: 1,
    subdomain: 'techblog',
    customDomain: null,
    title: 'Tech Blog',
    description: 'A tech publication',
    defaultLanguage: 'en',
    themeName: 'default',
    accentColor: '#000000',
    fontFamily: 'Inter',
    domainDnsStatus: 'VERIFIED' as const,
    createdAt: '2026-01-01T00:00:00Z',
  }

  const mockPosts = [
    {
      id: 101,
      blogId: 1,
      isFeatured: false,
      isPage: false,
      featuredImageUrl: null,
      createdAt: '2026-02-01T10:00:00Z',
      variant: {
        id: 1,
        postId: 101,
        languageCode: 'en',
        slug: 'full-post-en',
        title: 'Full Post English',
        description: 'English description',
        contentJson: '{}',
        contentHtml: '<p>English</p>',
        status: 'PUBLISHED' as const,
        publishedAt: '2026-02-01T10:00:00Z',
        scheduledAt: null,
        updatedAt: '2026-02-01T10:00:00Z',
      },
      variants: [
        {
          id: 1,
          postId: 101,
          languageCode: 'en',
          slug: 'full-post-en',
          title: 'Full Post English',
          status: 'PUBLISHED' as const,
        },
        {
          id: 2,
          postId: 101,
          languageCode: 'th',
          slug: 'full-post-th',
          title: 'Full Post Thai',
          status: 'PUBLISHED' as const,
        },
      ],
      tags: [],
    },
    {
      id: 102,
      blogId: 1,
      isFeatured: true,
      isPage: false,
      featuredImageUrl: null,
      createdAt: '2026-02-02T10:00:00Z',
      variant: {
        id: 3,
        postId: 102,
        languageCode: 'en',
        slug: 'partial-post-en',
        title: 'Only English Post',
        description: 'Only English',
        contentJson: '{}',
        contentHtml: '<p>English only</p>',
        status: 'PUBLISHED' as const,
        publishedAt: '2026-02-02T10:00:00Z',
        scheduledAt: null,
        updatedAt: '2026-02-02T10:00:00Z',
      },
      variants: [
        {
          id: 3,
          postId: 102,
          languageCode: 'en',
          slug: 'partial-post-en',
          title: 'Only English Post',
          status: 'PUBLISHED' as const,
        },
      ],
      tags: [],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.blogs.get).mockResolvedValue(mockBlog)
    vi.mocked(api.posts.list).mockResolvedValue(mockPosts as any)
  })

  it('renders translation health statistics widget and progress badges', async () => {
    render(<PostsListPage />)

    await waitFor(() => {
      expect(screen.getByText('Bilingual Translation Health')).toBeInTheDocument()
    })

    // 1 out of 2 is fully translated -> 50%
    expect(screen.getByText('50% Translated')).toBeInTheDocument()
    expect(screen.getByText(/1 of 2 articles have both English/)).toBeInTheDocument()

    // Filter pills
    expect(screen.getByText('All (2)')).toBeInTheDocument()
    expect(screen.getByText('Complete (1)')).toBeInTheDocument()
    expect(screen.getByText('🇹🇭 Needs Thai (1)')).toBeInTheDocument()

    // Table rows
    expect(screen.getByText('Full Post English')).toBeInTheDocument()
    expect(screen.getByText('Only English Post')).toBeInTheDocument()

    // Post 101 has both complete
    expect(screen.getByText('2/2 Complete')).toBeInTheDocument()

    // Post 102 needs Thai
    expect(screen.getByText('1/2 (Needs 🇹🇭)')).toBeInTheDocument()
  })

  it('filters posts by translation status when clicking filter buttons', async () => {
    render(<PostsListPage />)

    await waitFor(() => {
      expect(screen.getByText('Full Post English')).toBeInTheDocument()
    })

    // Click Needs Thai filter
    fireEvent.click(screen.getByText('🇹🇭 Needs Thai (1)'))

    // Full Post English should be hidden; Only English Post should remain visible
    expect(screen.queryByText('Full Post English')).not.toBeInTheDocument()
    expect(screen.getByText('Only English Post')).toBeInTheDocument()

    // Click Complete filter
    fireEvent.click(screen.getByText('Complete (1)'))

    // Now Full Post English is visible, Only English Post is hidden
    expect(screen.getByText('Full Post English')).toBeInTheDocument()
    expect(screen.queryByText('Only English Post')).not.toBeInTheDocument()

    // Reset to All
    fireEvent.click(screen.getByText('All (2)'))
    expect(screen.getByText('Full Post English')).toBeInTheDocument()
    expect(screen.getByText('Only English Post')).toBeInTheDocument()
  })
})
