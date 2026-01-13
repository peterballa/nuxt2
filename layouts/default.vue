<template>
  <div>
    <header class="p-4 border-b">
      <h1>Mini Travel Planner</h1>

      <nav class="mt-2">
        <NuxtLink to="/" exact>Home</NuxtLink>
        <span> | </span>
        <NuxtLink to="/destinations">Destinations</NuxtLink>
      </nav>
    </header>

    <main class="p-4">
      <Nuxt />
    </main>

    <footer class="p-4 border-t">
      <small>Nuxt2 playground</small>
    </footer>
  </div>
</template>

<style>
a.nuxt-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
