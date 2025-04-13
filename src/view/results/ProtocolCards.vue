<template>
  <v-row>
    <v-col
      cols="12"
      class="d-flex align-center ga-3 text-body-2 text-grey-darken-1"
    >
      <span>
        Results:
        <span class="text-grey-darken-4">{{ pagination.total_results }}</span>
      </span>

      <span>
        Page:
        <span class="text-grey-darken-4"
          >{{ pagination.current_page }} / {{ pagination.total_pages }}</span
        >
      </span>

      <span v-if="sortFilters.orderField">
        Sort by:
        <span class="text-grey-darken-4 text-capitalize">{{
          sortFilters.orderField
        }}</span>
      </span>

      <span v-if="sortFilters.orderDir">
        Sort Order:
        <span class="text-grey-darken-4 text-capitalize">{{
          sortFilters.orderDir
        }}</span>
      </span>

      <span v-if="sortFilters.pageSize">
        Page Size:
        <span class="text-grey-darken-4">{{ sortFilters.pageSize }}</span>
      </span>

      <v-spacer />

      <v-btn
        color="blue-lighten-1"
        size="small"
        @click="emit('update:displaySortDialog', true)"
      >
        <v-icon class="mr-2">mdi-sort</v-icon>
        Change Sort Order
      </v-btn>
    </v-col>
  </v-row>

  <template v-if="isFetching">
    <v-row>
      <v-col
        v-for="item in 8"
        :key="item"
        cols="12"
        md="6"
        lg="3"
        class="d-flex"
      >
        <v-skeleton-loader type="card" class="w-100" />
      </v-col>
    </v-row>
  </template>

  <template v-else>
    <v-row>
      <v-col
        v-for="protocol in protocolsList"
        :key="protocol.id"
        cols="12"
        md="6"
        lg="3"
        class="d-flex"
      >
        <ProtocolCard :protocol="protocol" class="w-100" />
      </v-col>
    </v-row>
  </template>

  <v-row>
    <v-col cols="12">
      <v-pagination
        :length="pagination.total_pages"
        :model-value="pagination.current_page"
        @update:model-value="handlePaginationChange"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import ProtocolCard from '@/components/ProtocolCard.vue';

  import type { Protocol } from '@/types/protocol';
  import type { Pagination } from '@/types/pagination';
  import type { SearchSortFilters } from '@/types/protocol/query';

  defineProps<{
    pagination: Pagination;
    protocolsList: Protocol[];
    sortFilters: Partial<SearchSortFilters>;
    isFetching?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'update:displaySortDialog', value: boolean): void;
    (event: 'update:pagination', value: number): void;
  }>();

  /**
   * We are using an index: 0 based on the page, so we need to update this accordingly
   * @param newPage {number}
   */
  function handlePaginationChange(newPage: number) {
    emit('update:pagination', newPage - 1);
  }
</script>
