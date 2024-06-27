<script setup lang="ts">
import { matClose } from '@quasar/extras/material-icons'

const dialog = ref(false)

function dialogHandler() {
  dialog.value = !dialog.value
}
</script>

<template>
  <div class="component">
    <div class="component-title">
      Custom
    </div>

    <q-btn color="primary" @click="dialogHandler">
      dialog
    </q-btn>

    <q-dialog v-model="dialog">
      <div class="custom-dialog">
        <div class="custom-dialog__bar">
          <q-icon :name="matClose" @click="dialogHandler" />
        </div>

        <div class="custom-dialog__body">
          You are viewing a custom dialog that can be modified to suit your needs. This dialog serves as a
          flexible foundation that you can customize according to your requirements. You can change styles,
          add or remove elements, and integrate any additional features necessary for your project.
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<style lang="scss">
.custom-dialog {
  background-color: #fff;
  width: 100%;

  &__bar {
    background: $primary;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    height: 22px;

    .q-icon {
      cursor: pointer;
    }
  }

  &__body {
    padding: 20px;
  }
}
</style>
