<script lang="ts" setup>
useSeoMeta({
  title: 'Finance Tracker',
  description: 'A simple finance tracker',
  ogTitle: 'A simple finance tracker',
  ogDescription: 'A simple finance tracker',
  ogImage: '/assets/images/logo-512x512.png',
  ogUrl: 'https://nuxt-finance-tracker-two.vercel.app/login',
  twitterTitle: 'Finance Tracker',
  twitterDescription: 'A simple finance tracker',
  twitterImage: '/assets/images/logo-512x512.png',
  twitterCard: 'summary_large_image'
})
// Link to Google Fonts
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
      crossorigin: ''
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<template>
  <div class="container mx-auto max-w-5xl">
    <app-header />
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>
<style>
/* Set the font family for the entire site */
body {
  font-family: 'Inter';
}

/* Set the background color for the entire site */
body {
  @apply dark:bg-gray-900 bg-white
}
</style>