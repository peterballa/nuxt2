<template>
  <div>
    <h2>{{ destination.name }}</h2>
    <p><b>Country:</b> {{ destination.country }}</p>
    <p><b>Slug:</b> {{ destination.slug }}</p>

    <p>
      <NuxtLink to="/destinations">← Back</NuxtLink>
    </p>
  </div>
</template>

<script>
const ALL = [
  { slug: 'budapest', name: 'Budapest', country: 'Hungary' },
  { slug: 'barcelona', name: 'Barcelona', country: 'Spain' },
  { slug: 'lisbon', name: 'Lisbon', country: 'Portugal' }
]

export default {
  async asyncData({ params, error }) {
    const destination = ALL.find(d => d.slug === params.slug)
    if (!destination) {
      return error({ statusCode: 404, message: 'Destination not found' })
    }
    return { destination }
  },
  head() {
    return { title: `${this.destination.name} | Mini Travel Planner` }
  }
}
</script>
