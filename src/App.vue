<!-- App.vue -->
<template>
  <v-app>
    <component :is="currentPage" />
  </v-app>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import WelcomeBanner from '@/pages/SearchLanding.vue';
  import SearchResults from '@/pages/SearchResults.vue';
  import { useSearchTerm } from '@/composables/useSearchKey';

  const { searchKey } = useSearchTerm();

  const currentPage = computed(() =>
    searchKey.value === null ? WelcomeBanner : SearchResults,
  );
</script>
