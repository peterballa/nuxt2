<template>
  <nav class="navbar">
    <ul class="navbar__links">
      <li v-for="link in navLinks" :key="link.path">
        <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export type NavLink = { name: string; path: string }

export default defineComponent({
  name: 'Navbar',
  props: {
    navLinks: {
      type: (Array as unknown) as () => NavLink[],
      default: () => []
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #eee;

  &__links {
    display: flex;
    list-style: none;
    gap: 1rem;
    margin: 0;
    padding: 0;

    a {
      text-decoration: none;
      color: #555;

      &.nuxt-link-exact-active {
        color: #0070f3;
        font-weight: 600;
      }
    }
  }
}
</style>
