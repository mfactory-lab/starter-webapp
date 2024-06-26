<script setup lang="ts">
const model = ref(null)
const options = ref(['Option 1', 'Option 2', 'Option 3'])
</script>

<template>
  <div class="home-page container">
    body

    <q-btn color="primary">
      test
    </q-btn>

    <br>

    <q-select v-model="model" :options="options" />
  </div>
</template>
