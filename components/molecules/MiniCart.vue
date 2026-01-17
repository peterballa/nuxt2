<template>
  <div class="mini-cart">
    <NuxtLink to="/cart" aria-label="Open cart" class="mini-cart__link">
      <IconCart class="mini-cart__icon" />
      <Badge v-if="count > 0" class="mini-cart__badge" :count="count" />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconCart from '~/components/icons/IconCart.vue'
import Badge from '~/components/atoms/Badge.vue'

export default defineComponent({
  name: 'MiniCart',
  components: { IconCart, Badge },
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.mini-cart {
  position: relative;

  &__link {
    position: relative;
    display: inline-block;
    line-height: 0;
  }

  &__icon {
    width: 28px;
    height: 28px;
  }

  &__badge {
    position: absolute;
    top: -6px;
    right: -10px;
  }
}
</style>
