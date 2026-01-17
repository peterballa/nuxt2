import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CartItem } from '~/types/CartItem'

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
    const existing = cartItems.value.find((i) => i.id === item.id)

    if (existing) {
      existing.quantity += item.quantity
      return
    }

    cartItems.value.push({ ...item })
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
