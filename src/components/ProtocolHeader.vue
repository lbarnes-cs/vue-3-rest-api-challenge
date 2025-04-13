<template>
  <v-row>
    <v-col cols="auto">
      <h1>Protocols.io</h1>
    </v-col>

    <v-spacer />

    <v-col cols="auto">
      <BtnTooltip
        tooltip-text="Refetch Query"
        tooltip-location="bottom center"
        icon="mdi-reload"
        size="large"
        @click="$emit('refresh')"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import BtnTooltip from '@/components/BtnTooltip.vue';

  defineEmits<{
    (e: 'refresh'): void;
  }>();
</script>
