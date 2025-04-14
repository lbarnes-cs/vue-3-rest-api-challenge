<!-- src/pages/SearchLanding.vue -->
<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="12">
      <v-container>
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
  import WelcomeBanner from '@/components/WelcomeBanner.vue';
</script>
