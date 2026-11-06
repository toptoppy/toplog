import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PublishChecklistPopover from './PublishChecklistPopover'

describe('PublishChecklistPopover', () => {
  const defaultProps = {
    title: 'My Complete Article Title',
    slug: 'my-complete-article',
    contentHtml: '<p>Some content with more than thirty words</p>',
    wordCount: 120,
    description: 'This is a long enough meta description for search snippets.',
    featuredImageUrl: 'https://cdn.example.com/cover.png',
    onOpenSettings: vi.fn(),
    onOpenSeo: vi.fn(),
  }

  it('renders all checks passed when all criteria are met', () => {
    render(<PublishChecklistPopover {...defaultProps} />)

    expect(screen.getByText('Pre-Flight Checklist')).toBeInTheDocument()
    expect(screen.getByText('5/5 passed')).toBeInTheDocument()
    expect(screen.getByText('Ready to publish')).toBeInTheDocument()
  })

  it('highlights missing optional fields and calls action triggers', () => {
    const onOpenSettings = vi.fn()
    const onOpenSeo = vi.fn()

    render(
      <PublishChecklistPopover
        {...defaultProps}
        description=""
        featuredImageUrl=""
        onOpenSettings={onOpenSettings}
        onOpenSeo={onOpenSeo}
      />
    )

    expect(screen.getByText('3/5 passed')).toBeInTheDocument()

    const addExcerptBtn = screen.getByText('Add excerpt')
    expect(addExcerptBtn).toBeInTheDocument()
    fireEvent.click(addExcerptBtn)
    expect(onOpenSeo).toHaveBeenCalledTimes(1)

    const uploadCoverBtn = screen.getByText('Upload cover')
    expect(uploadCoverBtn).toBeInTheDocument()
    fireEvent.click(uploadCoverBtn)
    expect(onOpenSettings).toHaveBeenCalledTimes(1)
  })

  it('marks required fields missing when title or slug is missing', () => {
    render(
      <PublishChecklistPopover
        {...defaultProps}
        title=""
        slug=""
        wordCount={5}
      />
    )

    expect(screen.getByText('Required fields missing')).toBeInTheDocument()
  })
})
