<template>
  <div>
    <header class="site-header">
      <div class="site-header__row">
        <h1 class="site-header__title">Nuxt2 Ecommerce Playground</h1>
        <MiniCart :count="totalQuantity" />
      </div>
      <Navbar :nav-links="navLinks" />
    </header>

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import Navbar from '~/components/molecules/Navbar.vue'
import MiniCart from '~/components/molecules/MiniCart.vue'
import { useCartStore } from '~/stores/useCartStore'

export default defineComponent({
  components: {
    Navbar,
    MiniCart
  },
  data() {
    return {
      navLinks: [
        { name: 'Home', path: '/' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'Cart', path: '/cart' }
      ]
    }
  },
  setup() {
    const cart = useCartStore()
    const { totalQuantity } = storeToRefs(cart)
    return { totalQuantity }
  }
})
</script>

<style>
.site-header {
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.site-header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.site-header__title {
  margin: 0;
  font-size: 1.25rem;
}

a.nuxt-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
