<script setup lang="ts">
enum NotifyType {
  Positive = 'positive',
  Negative = 'negative',
  Warning = 'warning',
  Info = 'info',
  Ongoing = 'grey-8',
  Progress = 'deep-purple-12',
}

const { notify } = useQuasar()

function notifyHandler(type: NotifyType, progress = false) {
  notify({
    type,
    progress,
    color: type,
    message: notifyLabel(type),
  })
}

function notifyLabel(type: NotifyType) {
  switch (type) {
    case NotifyType.Positive: return 'Trigger \'positive\''
    case NotifyType.Negative: return 'Trigger \'negative\''
    case NotifyType.Warning: return 'Trigger \'warning\''
    case NotifyType.Info: return 'Trigger \'info\''
    case NotifyType.Ongoing: return 'Trigger \'ongoing\''
    case NotifyType.Progress: return 'Trigger \'progress\''
  }
}
</script>

<template>
  <div class="components-wrapper">
    <h4>Notifications</h4>

    <div class="components-wrapper__block">
      <div class="row q-gutter-sm">
        <q-btn no-caps unelevated color="positive" label="Trigger 'positive'" @click="notifyHandler(NotifyType.Positive)" />
        <q-btn no-caps unelevated color="negative" label="Trigger 'negative'" @click="notifyHandler(NotifyType.Negative)" />
        <q-btn no-caps unelevated color="warning" text-color="dark" label="Trigger 'warning'" @click="notifyHandler(NotifyType.Warning)" />
        <q-btn no-caps unelevated color="info" label="Trigger 'info'" @click="notifyHandler(NotifyType.Info)" />
        <q-btn no-caps unelevated color="grey-8" label="Trigger 'ongoing'" @click="notifyHandler(NotifyType.Ongoing)" />
        <q-btn no-caps unelevated color="deep-purple-12" label="Trigger 'progress'" @click="notifyHandler(NotifyType.Progress, true)" />
      </div>
    </div>
  </div>
</template>
