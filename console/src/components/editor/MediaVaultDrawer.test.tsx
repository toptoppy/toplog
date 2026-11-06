import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MediaVaultDrawer from './MediaVaultDrawer'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    media: {
      list: vi.fn(),
      upload: vi.fn(),
    },
  },
}))

describe('MediaVaultDrawer', () => {
  const mockMedia = [
    { filename: 'hero-banner.png', url: 'https://cdn.example.com/hero.png', sizeBytes: 153600 },
    { filename: 'architecture.svg', url: 'https://cdn.example.com/arch.svg', sizeBytes: 24500 },
    { filename: 'document.pdf', url: 'https://cdn.example.com/doc.pdf', sizeBytes: 500000 }, // Non-image, should be filtered out
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.media.list).mockResolvedValue(mockMedia as any)
  })

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <MediaVaultDrawer
        isOpen={false}
        onClose={vi.fn()}
        blogId={1}
        onInsertImage={vi.fn()}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('loads and displays image media items when opened', async () => {
    render(
      <MediaVaultDrawer
        isOpen={true}
        onClose={vi.fn()}
        blogId={1}
        onInsertImage={vi.fn()}
      />
    )

    expect(screen.getByText('Media Vault')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('hero-banner.png')).toBeInTheDocument()
      expect(screen.getByText('architecture.svg')).toBeInTheDocument()
    })

    // Non-image pdf should be filtered out
    expect(screen.queryByText('document.pdf')).toBeNull()
  })

  it('calls onInsertImage and onClose when Insert button is clicked', async () => {
    const onInsertImage = vi.fn()
    const onClose = vi.fn()

    render(
      <MediaVaultDrawer
        isOpen={true}
        onClose={onClose}
        blogId={1}
        onInsertImage={onInsertImage}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('hero-banner.png')).toBeInTheDocument()
    })

    const insertButtons = screen.getAllByRole('button', { name: /Insert/i })
    fireEvent.click(insertButtons[0])

    expect(onInsertImage).toHaveBeenCalledWith('https://cdn.example.com/hero.png', 'hero-banner.png')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('filters media items by search query', async () => {
    render(
      <MediaVaultDrawer
        isOpen={true}
        onClose={vi.fn()}
        blogId={1}
        onInsertImage={vi.fn()}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('hero-banner.png')).toBeInTheDocument()
      expect(screen.getByText('architecture.svg')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search assets by filename...')
    fireEvent.change(searchInput, { target: { value: 'arch' } })

    expect(screen.queryByText('hero-banner.png')).toBeNull()
    expect(screen.getByText('architecture.svg')).toBeInTheDocument()
  })
})
