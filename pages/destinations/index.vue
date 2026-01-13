<template>
  <div>
    <h2>Destinations</h2>

    <p>
      Query: <code>{{ $route.query.q || '(none)' }}</code>
    </p>

    <ul>
      <li v-for="d in filtered" :key="d.slug">
        <NuxtLink :to="`/destinations/${d.slug}`">
          {{ d.name }} ({{ d.country }})
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
const ALL = [
  { slug: 'budapest', name: 'Budapest', country: 'Hungary' },
  { slug: 'barcelona', name: 'Barcelona', country: 'Spain' },
  { slug: 'lisbon', name: 'Lisbon', country: 'Portugal' }
]

export default {
  middleware: 'requireQuery',
  async asyncData({ query }) {
    // SSR-ben is lefut, itt szimulálunk "adatbetöltést"
    const q = (query.q || '').toString().toLowerCase()
    return { q, destinations: ALL }
  },
  computed: {
    filtered() {
      if (!this.q) return this.destinations
      return this.destinations.filter(d =>
        (d.name + ' ' + d.country).toLowerCase().includes(this.q)
      )
    }
  },
  head() {
    return { title: 'Destinations | Mini Travel Planner' }
  }
}
</script>
