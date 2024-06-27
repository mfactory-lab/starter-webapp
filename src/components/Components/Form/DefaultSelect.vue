<script lang="ts" setup>
const model = ref(null)
const options = ref(['Option 1', 'Option 2', 'Option 3'])
</script>

<template>
  <div class="component">
    <div class="component-title">
      Select
    </div>
    <q-select v-model="model" :options="options" class="component-select" />
  </div>
</template>

<style lang="scss">
.component-select {
  width: 200px;
}
</style>
