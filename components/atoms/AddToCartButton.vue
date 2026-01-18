<template>
  <button class="add-to-cart" type="button" @click="handleClick">
    <span class="add-to-cart__label">{{ $translate('component.addToCart.label') }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddToCartButton',
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleClick() {
      // Emit a semantic event carrying the product id
      this.$emit('add-to-cart', this.productId)
    }
  }
})
</script>

<style lang="scss" scoped>
.add-to-cart {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #0ea5e9; // flat sky blue
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: #0284c7; // slightly darker
  }
  &:active {
    background: #0369a1; // pressed
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.35);
  }

  &__label {
    pointer-events: none;
  }
}
</style>
