<template>
  <v-row>
    <v-col cols="12" sm="auto" class="d-flex align-center">
      <v-row dense>
        <v-col
          cols="12"
          sm="auto"
          class="d-flex align-center ga-3 pb-0 pb-sm-3 text-body-2 text-grey-darken-1"
        >
          <span class="d-flex align-center">
            <span class="mr-1">Results:</span>
            <v-skeleton-loader v-if="isFetching" type="text" width="20" />

            <span v-else class="text-grey-darken-4">
              {{ pagination.total_results }}</span
            >
          </span>

          <span class="d-flex align-center mr-1">
            <span class="mr-1">Page:</span>
            <template v-if="isFetching">
              <v-skeleton-loader type="text" width="12" />
              <span class="mx-2">/</span>
              <v-skeleton-loader type="text" width="12" />
            </template>
            <span v-else class="text-grey-darken-4"
              >{{ currentPage }} / {{ pagination.total_pages }}</span
            >
          </span>
        </v-col>
        <v-col
          cols="12"
          sm="auto"
          class="d-flex align-center ga-3 pb-0 pb-sm-3 text-body-2 text-grey-darken-1"
        >
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
        </v-col>
      </v-row>
    </v-col>

    <v-spacer />
    <v-col cols="12" sm="auto">
      <v-btn color="blue-lighten-1" size="small" @click="toggleDialog">
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
        sm="6"
        md="4"
        lg="3"
        xl="2"
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
        sm="6"
        md="4"
        lg="3"
        xl="2"
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
        :model-value="currentPage"
        @update:model-value="onPageChange"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { Protocol } from '@/types/protocol';

  import { useSortFilters } from '@/composables/useSortFilters';
  import { usePagination } from '@/composables/usePagination';
  import { useGoToWrapper } from '@/composables/useGoToWrapper';

  import ProtocolCard from '@/components/protocol/ProtocolCard.vue';

  defineProps<{
    protocolsList: Protocol[];
    isFetching?: boolean;
  }>();

  const { sortFilters, toggleDialog } = useSortFilters();
  const { pagination, currentPage, handlePaginationChange } = usePagination();
  const { goToWrapper } = useGoToWrapper();

  const onPageChange = (pageNumber: number) => {
    // Scroll to top of the page
    goToWrapper(80);
    // Change the pagination, which will create a new API call
    handlePaginationChange(pageNumber);
  };
</script>

<style lang="scss" scoped>
  ::v-deep(.v-skeleton-loader__text) {
    margin-left: 0;
    margin-right: 0;
  }
</style>
