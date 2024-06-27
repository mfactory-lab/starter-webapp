<script setup lang="ts">
const selected = ref(null)

const props = [
  {
    label: '[page_name]',
    children: [
      {
        label: 'index.vue',
      },
      {
        label: '[props]',
      },
    ],
  },
]
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      v-model:selected="selected"
      :nodes="props"
      default-expand-all
      node-key="label"
    />
  </div>
</template>
