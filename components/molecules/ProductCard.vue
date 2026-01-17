<template>
  <div class="product-card">
    <NuxtLink class="product-card__link" :to="`/product/${product.id}`">
      <div v-if="product.image" class="product-card__image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <small class="product-card__brand">{{ product.brand }}</small>
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__price">{{ formatPrice(product.price) }}</p>
    </NuxtLink>
    <AddToCartButton :product-id="product.id" @add-to-cart="onAddToCart" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '~/types/Product'
import AddToCartButton from '~/components/atoms/AddToCartButton.vue'
import { formatPrice } from '~/utils/product-utils/product-utils'

interface Props {
  product: Product
}

export default defineComponent({
  name: 'ProductCard',
  components: { AddToCartButton },
  props: {
    product: {
      type: (Object as unknown) as () => Product,
      required: true
    }
  },
  setup() {
    return { formatPrice }
  },
  methods: {
    onAddToCart(id: number) {
      this.$emit('add-to-cart', id)
    }
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid #6f6f6f;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  height: 380px;

  &__link {
    display: block;
    cursor: pointer;
  }

  &__image {
    width: 100%;
    margin-bottom: 0.5rem;
    overflow: hidden;
    border-radius: 6px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: auto;
      height: auto;
      max-width: 90%;
      max-height: 90%;
    }
  }

  &__brand {
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 0.25rem;
  }

  &__title {
    margin: 0 0 0.25rem;
  }

  &__price {
    margin: 0.25rem 0;
    font-weight: 600;
  }
}

/* The button styling is encapsulated in AddToCartButton */
</style>
