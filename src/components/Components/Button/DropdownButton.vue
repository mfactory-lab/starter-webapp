<template>
  <div class="component">
    <div class="component-title">
      Dropdown
    </div>
    <q-btn-dropdown color="primary" label="Dropdown Button">
      <q-list>
        <q-item v-close-popup clickable>
          <q-item-section>
            <q-item-label>Photos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-close-popup clickable>
          <q-item-section>
            <q-item-label>Videos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-close-popup clickable>
          <q-item-section>
            <q-item-label>Articles</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>
