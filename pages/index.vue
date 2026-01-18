<template>
  <div class="home">
    <h1 class="home__title">Nuxt 2 / Vue 2 Practice Sandbox</h1>
    <p class="home__intro">
      This project is a small training playground built with Nuxt 2 on top of
      Vue 2. It is designed to experiment with core concepts of the Nuxt 2
      ecosystem and typical patterns used in real-world applications.
    </p>
    <ul class="home__list">
      <li>
        Practice Vue components (atoms, molecules, organisms) and layouts.
      </li>
      <li>Work with plugins and Nuxt-specific modules.</li>
      <li>Use Pinia stores for state management.</li>
      <li>Try composables to reuse logic across components.</li>
      <li>Explore Nuxt 2 features like SSR, routing, and middleware.</li>
      <li>
        Experiment with API calls, data fetching, and SEO-friendly rendering.
      </li>
      <li>Write and run tests to validate your components and utilities.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomePage',
  head() {
    return { title: (this as any).$translate('page.index.title') as string }
  }
})
</script>

<style lang="scss" scoped>
.home {
  max-width: 720px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  &__title {
    margin-bottom: 0.75rem;
    font-size: 2rem;
    font-weight: 600;
  }

  &__intro {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #444;
  }

  &__list {
    padding-left: 1.25rem;
    margin: 0;
    list-style-type: disc;
  }

  &__list li {
    margin-bottom: 0.4rem;
    line-height: 1.5;
  }
}
</style>
