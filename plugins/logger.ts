// @ts-strict-ignore
import { Context } from '@nuxt/types'

export class Logger {
  info(message: string, payload?: unknown): void {
    if (payload !== undefined) {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`, payload)
    } else {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`)
    }
  }

  error(message: string, payload?: unknown): void {
    if (payload !== undefined) {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`, payload)
    } else {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`)
    }
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): void => {
  const logger = new Logger()
  inject('logger', logger)
}
