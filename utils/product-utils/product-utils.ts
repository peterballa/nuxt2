/**
 * Product related utilities
 */

/**
 * Formats a price number to a localized currency string.
 *
 * - Default currency: EUR
 * - Optional locale parameter allows deterministic output in tests
 */
export function formatPrice(
  value: number,
  currency: string = 'EUR',
  locale?: string
): string {
  const amount = Number.isFinite(value) ? value : 0
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount)
  } catch (_err) {
    // Fallback for environments without Intl currency support
    const fixed = amount.toFixed(2)
    const symbol = currency === 'EUR' ? '€' : `${currency} `
    return `${symbol}${fixed}`
  }
}
