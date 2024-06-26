<script setup lang="ts">
import { matMenu } from '@quasar/extras/material-icons'
</script>

<template>
  <header class="container">
    <q-toolbar class="q-my-md">
      <q-btn flat round dense :icon="matMenu" class="q-mr-sm">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-space />

      <!--      <q-btn-toggle -->
      <!--        v-model="model" -->
      <!--        flat stretch -->
      <!--        toggle-color="yellow" -->
      <!--        :options="options" -->
      <!--      /> -->
    </q-toolbar>
  </header>
</template>
