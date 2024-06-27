<script setup lang="ts">
const genre = ref('rock')
</script>

<template>
  <div class="component">
    <div class="component-title">
      Toggle
    </div>

    <q-btn-toggle
      v-model="genre"
      color="primary"
      text-color="white"
      toggle-color="secondary"
      toggle-text-color="black"
      :options="[
        { label: 'Rock', value: 'rock' },
        { label: 'Funk', value: 'funk' },
        { label: 'Pop', value: 'pop' },
      ]"
    />
  </div>
</template>
