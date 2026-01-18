import 'pinia'
import type { Context } from '@nuxt/types'

declare module 'pinia' {
  export interface Pinia {
    /**
     * Nuxt context injected by our pinia-nuxt-context plugin
     */
    _nuxtCtx?: Context
  }

  export interface PiniaCustomProperties {
    /**
     * Access to the Nuxt context injected into Pinia stores
     */
    $nuxtCtx: Context
  }
}
