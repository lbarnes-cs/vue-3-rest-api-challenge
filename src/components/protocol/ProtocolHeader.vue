<template>
  <v-row data-id="results-header">
    <v-col cols="auto" class="align-self-center">
      <h1 class="text-h6 text-sm-h5">
        Search <span class="text-grey-darken-2">Protocols.io</span>
      </h1>
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
