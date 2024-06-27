<script lang="ts" setup>
const val = ref(false)
</script>

<template>
  <div class="component">
    <div class="component-title">
      Checkbox
    </div>
    <q-checkbox v-model="val" />
  </div>
</template>
