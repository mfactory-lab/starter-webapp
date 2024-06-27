<script lang="ts" setup>
const shape = ref('line')
</script>

<template>
  <div class="component">
    <div class="component-title">
      Radio
    </div>
    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="line" label="Line" />
      <q-radio v-model="shape" val="rectangle" label="Rectangle" />
    </div>
  </div>
</template>
