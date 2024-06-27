<script setup lang="ts">
import { matImage } from '@quasar/extras/material-icons'
</script>

<template>
  <div class="component">
    <div class="component-title">
      Icon
    </div>

    <q-icon :name="matImage" size="36px" color="secondary" />
  </div>
</template>

<style lang="scss" scoped>
.component {
  &-expansion {
    width: 200px;
  }
}
</style>
