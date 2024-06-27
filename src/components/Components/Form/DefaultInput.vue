<script lang="ts" setup>
const data = ref(null)
</script>

<template>
  <div class="component">
    <div class="component-title">
      Input
    </div>
    <q-input v-model="data" placeholder="Input" />
  </div>
</template>

<style lang="scss">
.component-select {
  width: 200px;
}
</style>
