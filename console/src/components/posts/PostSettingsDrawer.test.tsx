import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PostSettingsDrawer from './PostSettingsDrawer'

describe('PostSettingsDrawer', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    activeLang: 'en',
    featuredImageUrl: 'https://example.com/cover.png',
    setFeaturedImageUrl: vi.fn(),
    description: 'This is a sample post description for testing',
    setDescription: vi.fn(),
    handleGenerateSeo: vi.fn(),
    generatingSeo: false,
    seoSuggestions: null,
    applySeoSuggestion: vi.fn(),
    isFeatured: false,
    setIsFeatured: vi.fn(),
    isPage: false,
    setIsPage: vi.fn(),
    handleDeletePost: vi.fn(),
    onOpenSeoPreview: vi.fn(),
    canonicalUrl: 'https://original.dev/post',
    setCanonicalUrl: vi.fn(),
  }

  it('does not render anything when isOpen is false', () => {
    const { container } = render(<PostSettingsDrawer {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders correctly when open with SEO button, character counter, and canonical input', () => {
    render(<PostSettingsDrawer {...defaultProps} />)

    // Heading
    expect(screen.getByText('Post Settings')).toBeInTheDocument()

    // SEO Preview Button Trigger
    expect(screen.getByText('SEO & Social Preview')).toBeInTheDocument()
    const previewBtn = screen.getByText('SEO & Social Preview').closest('button')
    expect(previewBtn).toBeInTheDocument()
    if (previewBtn) fireEvent.click(previewBtn)
    expect(defaultProps.onOpenSeoPreview).toHaveBeenCalledTimes(1)

    // Character counter for Meta Description
    expect(screen.getByText(`${defaultProps.description.length} / 160`)).toBeInTheDocument()

    // Canonical URL field
    const canonicalInput = screen.getByPlaceholderText('https://original-source.com/post')
    expect(canonicalInput).toBeInTheDocument()
    expect(canonicalInput).toHaveValue('https://original.dev/post')

    fireEvent.change(canonicalInput, { target: { value: 'https://new-canonical.dev' } })
    expect(defaultProps.setCanonicalUrl).toHaveBeenCalledWith('https://new-canonical.dev')
  })

  it('renders publish date input and allows backdating', () => {
    const setPublishedAt = vi.fn()
    render(
      <PostSettingsDrawer
        {...defaultProps}
        publishedAt="2024-05-10T12:00:00.000Z"
        setPublishedAt={setPublishedAt}
        postStatus="PUBLISHED"
      />
    )

    expect(screen.getByText('Publish Date')).toBeInTheDocument()
    expect(screen.getByText('Backdating')).toBeInTheDocument()

    const dateInput = screen.getByDisplayValue('2024-05-10T12:00')
    expect(dateInput).toBeInTheDocument()

    fireEvent.change(dateInput, { target: { value: '2023-01-01T09:00' } })
    expect(setPublishedAt).toHaveBeenCalledWith(new Date('2023-01-01T09:00').toISOString())
  })
})
