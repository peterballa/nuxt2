import { getActivePinia } from 'pinia'
import { Context } from '@nuxt/types'

// Shape of Pinia instance extended by pinia-nuxt-context plugin
interface PiniaWithNuxtCtx {
  _nuxtCtx?: Context
}

/**
 * Returns the Nuxt Context injected into Pinia by the pinia-nuxt-context plugin.
 * Throws if called before Pinia is initialized or before the plugin ran.
 */
export function getPiniaContext(): Context {
  const pinia = (getActivePinia() as unknown) as PiniaWithNuxtCtx | null

  if (!pinia || !pinia._nuxtCtx) {
    throw new Error(
      'Nuxt context is not available from Pinia. Make sure pinia-nuxt-context plugin is registered and Pinia is active.'
    )
  }

  return pinia._nuxtCtx
}
