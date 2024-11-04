<script setup lang="ts">
// TODO: think about `vite-plugin-sass-dts` here
const primaryColor = '#28414c'
const baseURL = import.meta.env.BASE_URL || '/'

useHead({
  title: import.meta.env.VITE_APP_NAME || 'Starter',
  meta: [
    { name: 'description', content: import.meta.env.VITE_APP_DESCRIPTION },
    { name: 'keywords', content: import.meta.env.VITE_APP_KEYWORDS },
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
