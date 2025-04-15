<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="12">
      <v-container max-width="800">
        <v-row>
          <v-col cols="12">
            <WelcomeBanner />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  const WelcomeBanner = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "search-landing" */
    () => import('@/components/WelcomeBanner.vue'),
  );
</script>
