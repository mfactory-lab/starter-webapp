<script setup lang="ts">
const expanded = ref(false)
</script>

<template>
  <div class="component">
    <div class="component-title">
      Expansion item
    </div>

    <q-expansion-item
      v-model="expanded"
      label="Click me"
      class="component-expansion"
    >
      <div>
        Any text can be placed here, and this element can be used for FAQs or any other purposes.
      </div>
    </q-expansion-item>
  </div>
</template>

<style lang="scss" scoped>
.component {
  &-expansion {
    width: 200px;
  }
}
</style>
