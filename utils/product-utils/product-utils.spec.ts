import { formatPrice } from './product-utils'

describe('formatPrice', () => {
  it('formats a valid number to EUR with given locale', () => {
    const result = formatPrice(1234.5, 'EUR', 'en-US')
    expect(result).toBe('€1,234.50')
  })

  it('falls back to 0 for non-finite values', () => {
    const result = formatPrice(Number.NaN, 'EUR', 'en-US')
    expect(result).toBe('€0.00')
  })

  it('can format with a different currency', () => {
    const result = formatPrice(99.99, 'USD', 'en-US')
    expect(result.includes('99.99')).toBe(true)
  })

  it('works without explicit locale (uses environment default)', () => {
    const result = formatPrice(10)
    expect(result.includes('10')).toBe(true)
  })
})
