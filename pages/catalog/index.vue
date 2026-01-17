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
import { defineComponent, ref, onMounted } from 'vue'
import ProductCard from '~/components/molecules/ProductCard.vue'
import { useCatalog } from '~/composables/useCatalog'
import type { Product } from '~/types/Product'
import { useCartStore } from '~/stores/useCartStore'

export default defineComponent({
  name: 'CatalogPage',
  head() {
    return { title: 'Catalog' }
  },
  components: { ProductCard },
  setup() {
    const { products, load } = useCatalog()
    const items = ref<Product[]>([])
    const cart = useCartStore()

    onMounted(async () => {
      await load()
      items.value = products.slice()
    })

    const onAddToCart = (id: number) => {
      const product = items.value.find((x) => x.id === id)
      if (!product) {
        return;
      }

      cart.add({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      })
    }

    return {
      items,
      onAddToCart
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
