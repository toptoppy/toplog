import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SeoPreviewModal from './SeoPreviewModal'

describe('SeoPreviewModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    blogId: '1',
    postId: '1',
    blogTitle: 'Tech Insights',
    subdomain: 'tech-insights',
    customDomain: null,
    activeLang: 'en',
    title: 'Getting Started with Kotlin and Ktor',
    setTitle: vi.fn(),
    slug: 'getting-started-kotlin-ktor',
    setSlug: vi.fn(),
    description: 'Learn how to build resilient APIs in Kotlin with Ktor.',
    setDescription: vi.fn(),
    featuredImageUrl: 'https://images.unsplash.com/photo-test.jpg',
    setFeaturedImageUrl: vi.fn(),
    canonicalUrl: 'https://original-publisher.com/kotlin-guide',
    setCanonicalUrl: vi.fn(),
    handleGenerateSeo: vi.fn(),
    generatingSeo: false,
  }

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<SeoPreviewModal {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders modal header, health score, and Google SERP preview by default', () => {
    render(<SeoPreviewModal {...defaultProps} />)

    // Modal Header
    expect(screen.getByText('SEO & Social Share Preview')).toBeInTheDocument()

    // Title in SERP preview (rendered as "<title> - <blogTitle>")
    expect(screen.getByText(/Getting Started with Kotlin and Ktor - Tech Insights/i)).toBeInTheDocument()

    // Breadcrumb slug in SERP preview
    expect(screen.getByText(/getting-started-kotlin-ktor/i)).toBeInTheDocument()

    // SERP Snippet description
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()

    // Health score
    expect(screen.getByText(/SEO Score:/i)).toBeInTheDocument()
  })

  it('switches preview between Twitter/X, Facebook, and LinkedIn platforms in Social Cards tab', () => {
    render(<SeoPreviewModal {...defaultProps} />)

    // Switch to Social Cards tab
    const socialCardsTab = screen.getByRole('button', { name: /Social Cards/i })
    fireEvent.click(socialCardsTab)

    // Switch to Twitter/X platform
    const twitterTab = screen.getByRole('button', { name: /Twitter \/ X/i })
    fireEvent.click(twitterTab)
    expect(screen.getByText('@tech-insights')).toBeInTheDocument()

    // Switch to Facebook platform
    const fbTab = screen.getByRole('button', { name: /Facebook/i })
    fireEvent.click(fbTab)
    expect(screen.getByText('Published • Public')).toBeInTheDocument()

    // Switch to LinkedIn platform
    const linkedinTab = screen.getByRole('button', { name: /LinkedIn/i })
    fireEvent.click(linkedinTab)
    expect(screen.getByText('Engineering & Tech Publication')).toBeInTheDocument()
  })

  it('handles canonical URL and title input changes in Metadata tab', () => {
    render(<SeoPreviewModal {...defaultProps} />)

    // Switch to Metadata & Canonical tab
    const metaTab = screen.getByRole('button', { name: /Metadata & Canonical/i })
    fireEvent.click(metaTab)

    const canonicalInput = screen.getByDisplayValue('https://original-publisher.com/kotlin-guide')
    expect(canonicalInput).toBeInTheDocument()

    fireEvent.change(canonicalInput, { target: { value: 'https://syndicated.dev/kotlin' } })
    expect(defaultProps.setCanonicalUrl).toHaveBeenCalledWith('https://syndicated.dev/kotlin')
  })

  it('invokes onClose when Done button is clicked', () => {
    render(<SeoPreviewModal {...defaultProps} />)

    const doneBtn = screen.getByRole('button', { name: /Done/i })
    fireEvent.click(doneBtn)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })
})
