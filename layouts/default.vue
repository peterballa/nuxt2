<template>
  <div>
    <header>
      <h1>Nuxt2 Ecommerce Playground</h1>

      <nav>
        <NuxtLink to="/" exact>Home</NuxtLink>
        <span> | </span>
        <NuxtLink to="/catalog">Catalog</NuxtLink>
        <NuxtLink to="/checkout">Checkout</NuxtLink>
      </nav>
    </header>

    <main>
      <Nuxt />
    </main>

    <footer>
      <small>Nuxt2 Ecommerce Playground</small>
    </footer>
  </div>
</template>

<style>
a.nuxt-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
