<script setup lang="ts">
const router = useRouter()
const input = ref()

function onSubmit() {
  console.log(11)
  router.push(`/hi/${input.value}`)
}
</script>

<template>
  <div class="container hi-page">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
    >
      <q-input v-model="input" placeholder="Enter name" :rules="[val => val && val.length > 0 || 'Please type something']" />

      <q-btn type="submit">
        GO
      </q-btn>
    </q-form>
  </div>
</template>
