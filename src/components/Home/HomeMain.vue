<script lang="ts" setup>
import { matGridView, matRoute } from '@quasar/extras/material-icons'

enum Tabs {
  Components = 'Components',
  Routes = 'Routes',
}

const tab = useStorage('active-tab', Tabs.Components)
</script>

<template>
  <q-tabs v-model="tab">
    <q-tab :name="Tabs.Components" :icon="matGridView" :label="Tabs.Components" />
    <q-tab :name="Tabs.Routes" :icon="matRoute" :label="Tabs.Routes" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel :name="Tabs.Components">
      <components-tab />
    </q-tab-panel>
    <q-tab-panel :name="Tabs.Routes">
      <routes-tab />
    </q-tab-panel>
  </q-tab-panels>
</template>
