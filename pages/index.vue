<template>
  <div>
    <h2>Home</h2>

    <p>
      Try the query string:
      <NuxtLink :to="{ path: '/destinations', query: { q: 'spain' } }">
        Destinations?q=spain
      </NuxtLink>
    </p>

    <ul>
      <li><NuxtLink to="/destinations">Go to destinations</NuxtLink></li>
      <li><NuxtLink to="/destinations/budapest">Open Budapest detail</NuxtLink></li>
      <li><NuxtLink to="/destinations/does-not-exist">Trigger 404</NuxtLink></li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Home | Mini Travel Planner' }
  }
}
</script>
