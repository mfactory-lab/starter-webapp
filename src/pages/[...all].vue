<script setup lang="ts">
definePage({
  meta: {
    name: '404',
    layout: 'empty',
  },
})
useHead({
  title: 'Page not found',
})
</script>

<template>
  <div class="page-404">
    404
  </div>
</template>

<style lang="scss">
.page-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 87vh;
  font-size: 56px;
  color: #2a2e4694;
}
</style>
