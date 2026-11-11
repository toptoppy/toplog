import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GeneralDomainTab from './GeneralDomainTab'
import { Blog } from '@/lib/types'

describe('GeneralDomainTab', () => {
  const mockBlog: Blog = {
    id: 1,
    ownerId: 1,
    subdomain: 'mytech',
    customDomain: 'blog.mycompany.com',
    title: 'Tech Daily',
    description: 'Engineering stories',
    defaultLanguage: 'en',
    themeName: 'default',
    accentColor: '#2563eb',
    fontFamily: 'Inter',
    domainDnsStatus: 'UNVERIFIED',
    darkModeEnabled: true,
    createdAt: '2026-01-01T00:00:00Z',
  }

  const defaultProps = {
    blog: mockBlog,
    title: 'Tech Daily',
    setTitle: vi.fn(),
    description: 'Engineering stories',
    setDescription: vi.fn(),
    customDomain: 'blog.mycompany.com',
    setCustomDomain: vi.fn(),
    defaultLanguage: 'en',
    setDefaultLanguage: vi.fn(),
    themeName: 'default',
    setThemeName: vi.fn(),
    verifyingDomain: false,
    handleVerifyDomain: vi.fn(),
    domainVerifyResult: null,
    exportingArchive: false,
    handleExportArchive: vi.fn(),
  }

  it('renders custom domain input and DNS instructions table', () => {
    render(<GeneralDomainTab {...defaultProps} />)

    // Custom domain field
    const domainInput = screen.getByDisplayValue('blog.mycompany.com')
    expect(domainInput).toBeInTheDocument()

    // Required DNS Configuration table
    expect(screen.getByText('Required DNS Configuration')).toBeInTheDocument()
    expect(screen.getByText('CNAME')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()

    // Status badge: Awaiting DNS
    expect(screen.getByText('Awaiting DNS')).toBeInTheDocument()
  })

  it('triggers handleVerifyDomain when Verify DNS Now is clicked', () => {
    render(<GeneralDomainTab {...defaultProps} />)

    const verifyBtn = screen.getByRole('button', { name: /Verify DNS Now/i })
    fireEvent.click(verifyBtn)
    expect(defaultProps.handleVerifyDomain).toHaveBeenCalledTimes(1)
  })

  it('displays verified status and Visit Live Site button when verified', () => {
    const verifiedBlog: Blog = {
      ...mockBlog,
      domainDnsStatus: 'VERIFIED',
    }

    render(
      <GeneralDomainTab
        {...defaultProps}
        blog={verifiedBlog}
        domainVerifyResult={{
          domain: 'blog.mycompany.com',
          dnsStatus: 'VERIFIED',
          verified: true,
          detectedIps: ['127.0.0.1'],
          expectedCnameOrIp: 'localhost',
          sslReady: true,
          sslStatus: 'ACTIVE',
          message: 'DNS verified and SSL active',
        }}
      />
    )

    // Verified badge
    expect(screen.getByText(/Verified & Active/i)).toBeInTheDocument()

    // Auto-SSL Active indicator
    expect(screen.getByText(/Auto-SSL Certificate: Active & Encrypted/i)).toBeInTheDocument()

    // Live link
    const liveLink = screen.getByRole('link', { name: /Visit Live Site/i })
    expect(liveLink).toBeInTheDocument()
    expect(liveLink).toHaveAttribute('href', 'https://blog.mycompany.com')
  })

  it('renders supported languages (English and Thai) in Default Language select', () => {
    render(<GeneralDomainTab {...defaultProps} />)
    const select = screen.getByLabelText(/Default Language/i) as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('en')

    // Expect English and Thai options
    expect(screen.getByRole('option', { name: /English/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /ภาษาไทย/i })).toBeInTheDocument()
  })
})
