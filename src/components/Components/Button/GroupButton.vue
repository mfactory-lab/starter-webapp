<script setup lang="ts">
type Action = 'popup' | 'route'
const router = useRouter()
const popup = ref(false)

function actionHandler(props: { action: Action }) {
  if (props.action === 'popup') {
    popup.value = !popup.value
  } else {
    router.push('/hi/test')
  }
}
</script>

<template>
  <div class="component">
    <div class="component-title">
      Group
    </div>
    <q-btn-group>
      <q-btn color="primary" @click="actionHandler({ action: 'popup' })">
        popup
        <q-popup-edit v-model="popup" :offset="[0, 5]" :cover="false">
          Hello world
        </q-popup-edit>
      </q-btn>
      <q-btn color="secondary" text-color="black" @click="actionHandler({ action: 'route' })">
        route
      </q-btn>
    </q-btn-group>
  </div>
</template>
