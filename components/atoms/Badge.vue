<template>
  <span class="badge"> {{ count > 999 ? '999+' : count }} </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Badge',
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  letter-spacing: 0;
  color: #092867;
  border-radius: 9999px;
  background-color: #dbeafe;
  width: max-content;
  min-width: 1.25rem;
  height: 1.25rem;
  padding-inline: 6px;
}
</style>
