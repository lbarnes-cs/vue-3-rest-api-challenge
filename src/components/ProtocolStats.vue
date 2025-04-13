<template>
  <ul
    class="d-flex flex-wrap list-none p-0 font-weight-medium"
    data-testid="stats"
  >
    <li v-if="stats.number_of_votes" data-testid="stats-votes" class="mr-2">
      <span class="text-grey-darken-1">Works for</span>
      {{ formatNumber(stats.number_of_votes) }}
    </li>
    <li v-if="stats.number_of_views" data-testid="stats-views" class="mr-2">
      <span class="text-grey-darken-1">Views</span>
      {{ formatNumber(stats.number_of_views) }}
    </li>
    <li v-if="stats.number_of_exports" data-testid="stats-exports" class="mr-2">
      <span class="text-grey-darken-1">Exports</span>
      {{ formatNumber(stats.number_of_exports) }}
    </li>
    <li
      v-if="stats.number_of_bookmarks"
      data-testid="stats-bookmarks"
      class="mr-2"
    >
      <span class="text-grey-darken-1">Bookmarks</span>
      {{ formatNumber(stats.number_of_bookmarks) }}
    </li>
    <li
      v-if="stats.number_of_comments"
      data-testid="stats-comments"
      class="mr-2"
    >
      <span class="text-grey-darken-1">Comments</span>
      {{ formatNumber(stats.number_of_comments) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { formatNumber } from '@/utils/formatNumber';
import type { ProtocolStats } from '@/types/protocol';

const props = defineProps<{
  stats: Partial<ProtocolStats>;
}>();

const { stats } = props;
</script>

<style lang="scss" scoped>
.list-none {
  list-style-type: none;
}

ul li {
  color: var(--v-grey-lighten1);
}
</style>
