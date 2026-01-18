// @ts-strict-ignore
import { Context } from '@nuxt/types'

/**
 * Nuxt plugin to inject Nuxt Context into Pinia so all stores can access it without passing around.
 * - Adds `store.$nuxtCtx` on every Pinia store instance (typed via module augmentation in types/stores)
 * - Stores the context on the Pinia root instance for retrieval via getActivePinia()
 */
export default function piniaNuxtContextPlugin(context: Context): void {
  const pinia = (context as any).$pinia
  if (!pinia) {
    return
  }

  // store the ctx on Pinia instance (non-typed internal field)
  ;(pinia as any)._nuxtCtx = context

  // expose ctx on every store instance (typed via PiniaCustomProperties augmentation)
  pinia.use(({ pinia, store }: any) => {
    ;(store as any).$nuxtCtx = (pinia as any)._nuxtCtx
  })
}
