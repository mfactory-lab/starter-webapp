<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')
const user = useUserStore()

watchEffect(() => {
  user.setNewName(route.params.name)
})
</script>

<template>
  <div class="container">
    <div class="">
      <div />
    </div>
    <h3>
      Hi {{ user.savedName }}!
    </h3>

    <div>
      <q-btn @click="router.back()">
        Back
      </q-btn>
    </div>
  </div>
</template>
