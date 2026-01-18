import { Context } from '@nuxt/types'

export class Validator {
  isEmail(value: string): boolean {
    if (!value) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  isBetween(value: number | string, min: number, max: number): boolean {
    if (value === null || value === undefined || value === '') return false
    const num = typeof value === 'number' ? value : Number(value)
    if (Number.isNaN(num)) return false
    return num >= min && num <= max
  }

  isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim().length === 0
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object')
      return Object.keys(value as object).length === 0
    return false
  }

  isAlpha(value: string): boolean {
    if (!value) return false
    const alphaRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/
    return alphaRegex.test(value)
  }

  isStrongPassword(value: string): boolean {
    if (!value) return false
    // min 8 chars, at least 1 letter and 1 number
    const strongPwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return strongPwRegex.test(value)
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): void => {
  const validator = new Validator()
  inject('validator', validator)
}
