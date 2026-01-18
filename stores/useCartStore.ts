import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CartItem } from '~/types/CartItem'
import type { Logger } from '~/plugins/logger'
import { getPiniaContext } from '~/utils/pinia/get-pinia-context'
import type { Analytics } from '~/plugins/analytics'

export const useCartStore = defineStore('cart', () => {
  // state
  const cartItems = ref<CartItem[]>([])

  // getters (computed)
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  })

  const totalQuantity = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)
  })

  // actions (methods)
  function add(item: CartItem) {
    const { $logger, $analytics } = getPiniaContext() as unknown as {
      $logger: Logger,
      $analytics: Analytics
    }
    const existing = cartItems.value.find((i) => i.id === item.id)

    if (existing) {
      existing.quantity += item.quantity
      $analytics.track('cart_item_updated', {itemId: item.id, quantity: existing.quantity, price: existing.price});
      $logger.info(`Item already in cart, updating quantity: ${item.id}`)
      return
    }

    cartItems.value.push({ ...item })

    $analytics.track('cart_item_added', {itemId: item.id, quantity: item.quantity, price: item.price});
    $logger.info(`Item added to cart: ${item.id}`)
  }

  const remove = (itemId: CartItem['id']) => {
    cartItems.value = cartItems.value.filter((i) => i.id !== itemId)
  }

  const clear = () => {
    cartItems.value = []
  }

  return {
    // state
    cartItems,

    // getters
    totalPrice,
    totalQuantity,

    // actions
    add,
    remove,
    clear
  }
})
