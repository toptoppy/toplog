import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AddLanguageModal from './AddLanguageModal'

describe('AddLanguageModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    newLangCode: 'th',
    setNewLangCode: vi.fn(),
    onAdd: vi.fn(),
    existingLanguages: ['en'],
  }

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<AddLanguageModal {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders English and Thai language options when isOpen is true', () => {
    render(<AddLanguageModal {...defaultProps} />)
    expect(screen.getByText('Add Language Variant')).toBeInTheDocument()
    expect(screen.getByText(/ภาษาไทย \(Thai\)/i)).toBeInTheDocument()
    expect(screen.getByText(/English \(English\)/i)).toBeInTheDocument()
  })

  it('disables already added language and marks it as Added', () => {
    render(<AddLanguageModal {...defaultProps} existingLanguages={['en']} />)
    expect(screen.getByText('Added')).toBeInTheDocument()
    const enButton = screen.getByRole('button', { name: /English/i })
    expect(enButton).toBeDisabled()
  })

  it('allows clicking an available language to select it', () => {
    const setNewLangCode = vi.fn()
    render(
      <AddLanguageModal
        {...defaultProps}
        existingLanguages={['en']}
        newLangCode=""
        setNewLangCode={setNewLangCode}
      />
    )

    const thButton = screen.getByRole('button', { name: /ภาษาไทย/i })
    expect(thButton).not.toBeDisabled()
    fireEvent.click(thButton)
    expect(setNewLangCode).toHaveBeenCalledWith('th')
  })

  it('triggers onAdd when Add Variant is clicked with valid selection', () => {
    const onAdd = vi.fn()
    render(<AddLanguageModal {...defaultProps} onAdd={onAdd} />)

    const addButton = screen.getByRole('button', { name: /Add Variant/i })
    expect(addButton).not.toBeDisabled()
    fireEvent.click(addButton)
    expect(onAdd).toHaveBeenCalledTimes(1)
  })

  it('disables Add Variant when no language is selected or language is already added', () => {
    render(<AddLanguageModal {...defaultProps} newLangCode="" />)
    const addButton = screen.getByRole('button', { name: /Add Variant/i })
    expect(addButton).toBeDisabled()
  })

  it('triggers onClose when Cancel is clicked', () => {
    const onClose = vi.fn()
    render(<AddLanguageModal {...defaultProps} onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
