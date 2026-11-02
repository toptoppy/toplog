import { describe, it, expect, beforeEach } from 'vitest'
import { getToken, setToken, clearToken } from './api'

describe('Auth Token Storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stores and retrieves the authentication token', () => {
    expect(getToken()).toBeNull()

    setToken('test-jwt-token-123')
    expect(getToken()).toBe('test-jwt-token-123')
  })

  it('clears the authentication token correctly', () => {
    setToken('sample-token')
    expect(getToken()).toBe('sample-token')

    clearToken()
    expect(getToken()).toBeNull()
  })
})
