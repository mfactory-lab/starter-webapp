<script setup lang="ts">
const $q = useQuasar()

function alert() {
  $q.dialog({
    title: 'Alert',
    message: 'Some message',
  })
}

function confirm() {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to turn on the wifi?',
    cancel: true,
    persistent: true,
  })
}

function prompt() {
  $q.dialog({
    title: 'Prompt',
    message: 'What is your name?',
    prompt: {
      model: '',
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  })
}
</script>

<template>
  <div class="component">
    <div class="component-title">
      Default
    </div>
    <q-btn-group>
      <q-btn label="Alert" color="primary" @click="alert" />
      <q-btn label="Confirm" color="primary" @click="confirm" />
      <q-btn label="Prompt" color="primary" @click="prompt" />
    </q-btn-group>
  </div>
</template>
