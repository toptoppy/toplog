import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BulkActionsBar from './BulkActionsBar'

describe('BulkActionsBar', () => {
  const defaultProps = {
    selectedCount: 3,
    isProcessing: false,
    processingMessage: null,
    onClear: vi.fn(),
    onDelete: vi.fn(),
    onStatusChange: vi.fn(),
    onToggleFeatured: vi.fn(),
  }

  it('renders nothing when selectedCount is 0', () => {
    const { container } = render(<BulkActionsBar {...defaultProps} selectedCount={0} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders count and action buttons when items are selected', () => {
    render(<BulkActionsBar {...defaultProps} selectedCount={4} />)

    expect(screen.getByText('4 selected')).toBeInTheDocument()
    expect(screen.getByText('Publish')).toBeInTheDocument()
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByText('Feature')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('triggers onStatusChange with PUBLISHED and DRAFT', () => {
    const onStatusChange = vi.fn()
    render(<BulkActionsBar {...defaultProps} onStatusChange={onStatusChange} />)

    fireEvent.click(screen.getByText('Publish'))
    expect(onStatusChange).toHaveBeenCalledWith('PUBLISHED')

    fireEvent.click(screen.getByText('Draft'))
    expect(onStatusChange).toHaveBeenCalledWith('DRAFT')
  })

  it('triggers onDelete and onClear callbacks', () => {
    const onDelete = vi.fn()
    const onClear = vi.fn()
    render(<BulkActionsBar {...defaultProps} onDelete={onDelete} onClear={onClear} />)

    fireEvent.click(screen.getByText('Delete'))
    expect(onDelete).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByTitle('Clear selection (Esc)'))
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('shows processing indicator when isProcessing is true', () => {
    render(
      <BulkActionsBar
        {...defaultProps}
        isProcessing={true}
        processingMessage="Deleting 3 articles..."
      />
    )

    expect(screen.getByText('Deleting 3 articles...')).toBeInTheDocument()
    expect(screen.queryByText('Publish')).toBeNull()
  })
})
