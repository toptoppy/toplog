import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import KeyboardShortcutsModal from './KeyboardShortcutsModal'

describe('KeyboardShortcutsModal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<KeyboardShortcutsModal isOpen={false} onClose={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders all shortcut categories and responds to close trigger', () => {
    const onClose = vi.fn()
    render(<KeyboardShortcutsModal isOpen={true} onClose={onClose} />)

    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument()
    expect(screen.getByText('Editor Navigation & Mode')).toBeInTheDocument()
    expect(screen.getByText('Inline Text Formatting')).toBeInTheDocument()
    expect(screen.getByText('Blocks & Structure')).toBeInTheDocument()

    // Test dismiss button
    const gotItBtn = screen.getByText('Got it')
    fireEvent.click(gotItBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
