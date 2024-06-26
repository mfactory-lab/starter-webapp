<script setup lang="ts">
const model = ref(null)
const options = ref(['Option 1', 'Option 2', 'Option 3'])

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
  <div class="home-page container">
    <h2>Starter Webapp</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <br>

    <q-btn-group>
      <q-btn color="primary">
        Action
      </q-btn>
      <q-btn color="secondary" href="hi/test">
        Hi page
      </q-btn>
    </q-btn-group>

    <br>

    <h4>Dialogs</h4>
    <q-btn-group>
      <q-btn label="Alert" color="primary" @click="alert" />
      <q-btn label="Confirm" color="primary" @click="confirm" />
      <q-btn label="Prompt" color="primary" @click="prompt" />
    </q-btn-group>

    <br>

    <q-select v-model="model" :options="options" />
  </div>
</template>
