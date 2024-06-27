<script lang="ts" setup>
import { matMail, matNetworkPing, matPublic } from '@quasar/extras/material-icons'

const model = ref(null)
const options = ref([
  {
    label: 'Email',
    value: 'Email',
    description: 'User email',
    icon: matMail,
  },
  {
    label: 'Social',
    value: 'Social',
    description: 'Social media',
    icon: matPublic,
  },
  {
    label: 'Other',
    value: 'Other',
    description: 'Quick updates',
    icon: matNetworkPing,
  },
])
</script>

<template>
  <div class="component">
    <div class="component-title">
      Select Options
    </div>
    <q-select
      v-model="model"
      :options="options"
      label="Standard"
      color="teal"
      clearable
      options-selected-class="text-deep-orange"
      class="component-select"
    >
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
            <q-item-label caption>
              {{ scope.opt.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style lang="scss">
</style>
