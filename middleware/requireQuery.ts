import { Context } from '@nuxt/types'

export default function ({ query, redirect }: Context): void {
  if (!query.q) {
    redirect('/destinations?q=budapest')
  }
}
