import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AiTranslateModal from './AiTranslateModal'

describe('AiTranslateModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    activeLang: 'en',
    aiStatus: {
      configured: true,
      provider: 'OpenAI',
      model: 'gpt-4o-mini',
    },
    targetAiLang: 'th',
    setTargetAiLang: vi.fn(),
    translating: false,
    onTranslate: vi.fn(),
    existingLanguages: ['en'],
  }

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<AiTranslateModal {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders active source language info and AI status badge', () => {
    render(<AiTranslateModal {...defaultProps} />)
    expect(screen.getByText('AI Auto-Translate')).toBeInTheDocument()
    expect(screen.getByText(/Translate from/i)).toBeInTheDocument()
    expect(screen.getAllByText(/English \(EN\)/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/OpenAI: gpt-4o-mini/i)).toBeInTheDocument()
  })

  it('automatically suggests counterpart Thai (th) when source is English (en)', () => {
    const setTargetAiLang = vi.fn()
    render(
      <AiTranslateModal
        {...defaultProps}
        activeLang="en"
        targetAiLang=""
        setTargetAiLang={setTargetAiLang}
      />
    )
    expect(setTargetAiLang).toHaveBeenCalledWith('th')
  })

  it('automatically suggests counterpart English (en) when source is Thai (th)', () => {
    const setTargetAiLang = vi.fn()
    render(
      <AiTranslateModal
        {...defaultProps}
        activeLang="th"
        targetAiLang=""
        setTargetAiLang={setTargetAiLang}
      />
    )
    expect(setTargetAiLang).toHaveBeenCalledWith('en')
  })

  it('disables the active source language option with Source label', () => {
    render(<AiTranslateModal {...defaultProps} activeLang="en" />)
    const enButton = screen.getByRole('button', { name: /English/i })
    expect(enButton).toBeDisabled()
    expect(screen.getByText('Source')).toBeInTheDocument()
  })

  it('triggers onTranslate when translate action button is clicked', () => {
    const onTranslate = vi.fn()
    render(<AiTranslateModal {...defaultProps} onTranslate={onTranslate} />)

    const translateButton = screen.getByRole('button', { name: /Translate to Thai/i })
    expect(translateButton).not.toBeDisabled()
    fireEvent.click(translateButton)
    expect(onTranslate).toHaveBeenCalledTimes(1)
  })

  it('disables action button while translating is in progress', () => {
    render(<AiTranslateModal {...defaultProps} translating={true} />)
    expect(screen.getByText(/Translating into Thai.../i)).toBeInTheDocument()
    const translateButton = screen.getByRole('button', { name: /Translating into Thai.../i })
    expect(translateButton).toBeDisabled()
  })

  it('triggers onClose when Cancel is clicked', () => {
    const onClose = vi.fn()
    render(<AiTranslateModal {...defaultProps} onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
