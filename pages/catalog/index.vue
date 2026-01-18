<template>
  <div class="catalog">
    <div class="catalog__grid">
      <ProductCard
        v-for="p in items"
        :key="p.id"
        :product="p"
        @add-to-cart="onAddToCart"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '~/components/molecules/ProductCard.vue'
import { useCatalog } from '~/composables/useCatalog'
import type { Product } from '~/types/Product'
import { useCartStore } from '~/stores/useCartStore'
import { Logger } from '~/plugins/logger'

export default defineComponent({
  name: 'CatalogPage',
  head() {
    return { title: 'Catalog' }
  },
  components: { ProductCard },
  // NOTE: We intentionally use classic asyncData + data() + methods here
  // instead of setup(), because for SSR the items are injected into the
  // component's data by asyncData and are not directly available inside setup().
  async asyncData(context) {
    const { app } = context
    const logger = (app.$logger as unknown) as Logger
    const { products, load } = useCatalog(logger)
    await load()
    // On SSR this will end up in the component instance data as this.items
    return {
      items: products.slice()
    }
  },
  data() {
    return {
      // asyncData-populated items will be placed here on SSR
      items: [] as Product[]
    }
  },
  methods: {
    onAddToCart(this: any, id: number) {
      const cart = useCartStore()
      const items = this.items as Product[]
      const product = items.find((p) => p.id === id)
      if (!product) {
        return
      }

      cart.add({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      })
    }
  }
})
</script>
<style scoped lang="scss">
@media (min-width: 1024px) {
  :root {
    --grid-left-pad: 32px;
    --grid-right-pad: 32px;
  }
}

@media (min-width: 768px) and (max-width: 1023.9px) {
  :root {
    --grid-left-pad: 16px;
    --grid-right-pad: 16px;
  }
}

.catalog {
  padding-left: var(--grid-left-pad, 0);
  padding-right: var(--grid-right-pad, 0);

  &__grid {
    display: grid;
    gap: 16px;
  }
}

/* Columns per breakpoint */
@media (min-width: 1119px) {
  .catalog__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 911px) and (max-width: 1118.9px) {
  .catalog__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 623px) and (max-width: 910.9px) {
  .catalog__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 467px) and (max-width: 622.9px) {
  .catalog__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 320px) and (max-width: 466.9px) {
  .catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 0) and (max-width: 319.9px) {
  .catalog__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
