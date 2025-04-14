<template>
  <v-app>
    <component :is="currentPage" />
  </v-app>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent } from 'vue';

  const SearchLanding = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "search-landing" */
    () => import('@/pages/SearchLanding.vue'),
  );

  const SearchResults = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "protocols-results" */
    () => import('@/pages/SearchResults.vue'),
  );

  import { useSearchKey } from '@/composables/useSearchKey';

  const { searchKey } = useSearchKey();

  const currentPage = computed(() =>
    searchKey.value === null ? SearchLanding : SearchResults,
  );
</script>
