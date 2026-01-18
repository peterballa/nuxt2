import { Context } from '@nuxt/types'
import { Logger } from '~/plugins/logger'

export class Analytics {
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  track(event: string, payload?: Record<string, unknown>): void {
    //TODO : Here is the place of the real analytics service

    this.logger.info('[Analytics] Event', { event, ...(payload || {}) })
  }
}

// Nuxt plugin definition
export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): void => {
  // @ts-ignore
  const logger = context.$logger as Logger

  const analytics = new Analytics(logger)

  inject('analytics', analytics)
}
