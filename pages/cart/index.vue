<template>
  <div class="cart">
    <h1 class="cart__title">{{ $translate('page.cart.headline') }}</h1>

    <div v-if="cartItems.length === 0" class="cart__empty">
      {{ $translate('page.cart.empty') }}
    </div>

    <table v-else class="cart__table">
      <thead>
        <tr>
          <th class="cart__col-media">{{ $translate('page.cart.item') }}</th>
          <th
            class="cart__col-name"
            :aria-label="$translate('page.cart.productName')"
          ></th>
          <th class="cart__col-price">{{ $translate('page.cart.price') }}</th>
          <th class="cart__col-qty">{{ $translate('page.cart.quantity') }}</th>
          <th class="cart__col-subtotal">{{ $translate('page.cart.subtotal') }}</th>
          <th
            class="cart__col-actions"
            :aria-label="$translate('page.cart.actions')"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td class="cart__media">
            <img v-if="item.image" :src="item.image" :alt="item.name" />
          </td>
          <td class="cart__name">
            <div class="cart__name-text">
              {{ item.name }}
            </div>
          </td>
          <td class="cart__price">{{ formatPrice(item.price) }}</td>
          <td class="cart__qty">{{ item.quantity }}</td>
          <td class="cart__subtotal">
            {{ formatPrice(item.price * item.quantity) }}
          </td>
          <td class="cart__actions">
            <button type="button" class="cart__remove" @click="remove(item.id)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="cart__total-label">Total</td>
          <td class="cart__total-value">{{ formatPrice(totalPrice) }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/useCartStore'
import type { CartItem } from '~/types/CartItem'
import { formatPrice } from '~/utils/product-utils/product-utils'

export default defineComponent({
  name: 'CartPage',
  head() {
    return { title: (this as any).$translate('page.cart.title') as string }
  },
  setup() {
    const cart = useCartStore()
    const { cartItems, totalPrice } = storeToRefs(cart)

    const remove = (id: CartItem['id']) =>{
      cart.remove(id)
    }

    return {
      cartItems,
      totalPrice,
      remove,
      formatPrice
    }
  }
})
</script>

<style lang="scss" scoped>
.cart {
  &__title {
    margin: 0 0 16px;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &__empty {
    padding: 16px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 8px 12px;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
  }

  thead th {
    font-weight: 600;
    color: #555;
  }

  &__media {
    width: 72px;
  }

  &__media img {
    display: block;
    width: 56px;
    height: 56px;
    object-fit: contain;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 4px;
  }

  &__name-text {
    overflow-wrap: anywhere;
  }

  &__remove {
    background: none;
    border: 1px solid #d1d5db;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }

  &__total-label {
    text-align: right;
    font-weight: 700;
  }
  &__total-value {
    font-weight: 700;
  }
}
</style>
