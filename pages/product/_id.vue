<template>
  <div v-if="!loading && product" class="product-detail">
    <div class="product-detail__top">
      <div v-if="product.image" class="product-detail__media">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-detail__info">
        <small class="product-detail__brand">{{ product.brand }}</small>
        <h1 class="product-detail__title">{{ product.name }}</h1>
        <p class="product-detail__price">{{ formatPrice(product.price) }}</p>
        <AddToCartButton :product-id="product.id" @add-to-cart="onAddToCart" />
      </div>
    </div>

    <div class="product-detail__meta">
      <table class="product-detail__table">
        <tbody>
          <tr>
            <th>SKU</th>
            <td>{{ product.sku }}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{{ product.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="loading" class="product-detail__loading">Loading...</div>
  <div v-else class="product-detail__not-found">Product not found.</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from '@nuxtjs/composition-api'
import { useCatalog } from '~/composables/useCatalog'
import type { Product } from '~/types/Product'
import AddToCartButton from '~/components/atoms/AddToCartButton.vue'
import { useCartStore } from '~/stores/useCartStore'
import { formatPrice } from '~/utils/product-utils/product-utils'

export default defineComponent({
  name: 'ProductDetailPage',
  head() {
    return { title: 'Product Detail' }
  },
  components: {
    AddToCartButton
  },
  setup() {
    const route = useRoute()
    const { loadById } = useCatalog()
    const cart = useCartStore()

    const product = ref<Product | null>(null)
    const loading = ref(true)


    onMounted(async () => {
      const idParam = route.value.params.id
      const id = parseInt(idParam, 10)

      if (!Number.isFinite(id)) {
        loading.value = false
        return
      }

      const item = await loadById(id)
      product.value = item || null
      loading.value = false
    })

    const onAddToCart = (id: number) => {
      if (!product.value) return
      cart.add({
        id,
        name: product.value.name,
        price: product.value.price,
        quantity: 1,
        image: product.value.image
      })
    }

    return {
      product,
      loading,
      formatPrice,
      onAddToCart
    }
  }
})
</script>

<style lang="scss" scoped>
.product-detail {
  &__top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }

  &__media {
    /* Allow grid item to shrink within its column to prevent overflow/overlap */
    min-width: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: auto;
      height: auto;
      max-width: 90%;
      max-height: 420px;
    }
  }

  &__info {
    /* Allow grid item to shrink within its column to prevent overflow/overlap */
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__brand {
    font-size: 0.85rem;
    color: #666;
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    /* Prevent extremely long titles from causing overflow */
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  &__price {
    margin: 4px 0 8px;
    font-weight: 600;
  }

  &__meta {
    margin-top: 24px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      width: 140px;
      color: #555;
      font-weight: 600;
    }
  }

  &__loading,
  &__not-found {
    padding: 16px;
  }
}
</style>
