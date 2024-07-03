<script setup lang="ts">
const router = useRouter()

definePage({
  meta: {
    layout: 'empty',
  },
})
</script>

<template>
  <div class="container">
    <div class="q-pt-lg">
      <q-btn @click="router.back()">
        Back
      </q-btn>

      <div class="row justify-center">
        <h6>Test</h6>
      </div>
    </div>
  </div>
</template>
