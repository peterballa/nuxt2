import { Context } from '@nuxt/types'
import { useCatalog } from '~/composables/useCatalog'

export default async function productExistsMiddleware(
  context: Context
): Promise<void> {
  const { params, redirect, app } = context
  const idParam = params.id

  const id = parseInt(idParam as string, 10)

  if (!Number.isFinite(id)) {
    redirect('/catalog')
    return
  }

  const { loadById } = useCatalog(app.$logger)
  const product = await loadById(id)

  if (!product) {
    redirect('/catalog')
  }
}
