<script setup lang="ts">
// TODO: think about `vite-plugin-sass-dts` here
const primaryColor = '#28414c'
const baseURL = import.meta.env.BASE_URL || '/'

useHead({
  title: 'Starter Webapp',
  meta: [
    { name: 'description', content: '' },
    { name: 'keywords', content: '' },
    {
      name: 'theme-color',
      content: () => isDark.value ? primaryColor : '#ffffff',
    },
    {
      name: 'msapplication-TileColor',
      content: () => primaryColor,
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? `${baseURL}favicon-dark.svg` : `${baseURL}favicon.svg`,
    },
    {
      rel: 'apple-touch-icon',
      href: () => `${baseURL}pwa-192x192.png`,
    },
    {
      rel: 'mask-icon',
      href: () => `${baseURL}safari-pinned-tab.svg`,
      color: primaryColor,
    },
  ],
})
</script>

<template>
  <router-view />
</template>
