export function formatPrice(
  value: number,
  currency: string = 'EUR',
  locale?: string
): string {
  const amount = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}
