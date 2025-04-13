<template>
  <v-alert :title="title" :type="type" data-testid="alert-banner">
    <div v-if="text || $slots.text" data-testid="alert-banner-text">
      <slot name="text">
        <p>{{ text }}</p>
      </slot>
    </div>

    <div v-if="$slots.append" data-testid="alert-banner-append">
      <slot name="append" />
    </div>
  </v-alert>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string;
      type?: 'error' | 'info' | 'warning';

      text?: string;
    }>(),
    {
      type: 'info',
      text: 'adding default',
    },
  );
</script>
