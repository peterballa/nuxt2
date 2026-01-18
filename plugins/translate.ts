// @ts-strict-ignore
export function translate(
  i18n: {
    te: (key: string) => boolean
    t: (
      key: string,
      interpolation?: { [key: string]: string | number }
    ) => string
  },
  key: string,
  interpolation: { [key: string]: string | number } = {},
  options: { defaultValue?: string } = {}
): string {
  return i18n.te(key)
    ? i18n.t(key, interpolation)
    : options?.defaultValue ?? key
}

export default (context: any, inject: any): void => {
  inject(
    'translate',
    (
      key: string,
      interpolation: { [key: string]: string | number } = {},
      options: { defaultValue?: string } = {}
    ) => translate(context.app.i18n, key, interpolation, options)
  )
}
