<template>
  <v-app>
    <v-app-bar flag color="primary">
      <v-container>
        <v-row dense>
          <v-col cols="8" class="bg-primary">
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="cards">Cards</v-tab>
              <v-tab value="table">Table</v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="4" class="bg-primary d-flex align-center">
            <SearchInput
              v-model="queryParameters.searchKey"
              :is-loading="isLoading"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <ProtocolHeader @refresh="refetch" />

        <v-row v-if="isLoading || isError || hasEmptyState">
          <v-col cols="12" class="">
            <!-- Loading State -->
            <div v-if="isLoading" class="d-flex justify-center align-center">
              <v-progress-circular indeterminate class="mr-4" />
              Loading Data...
            </div>

            <!-- Error State -->
            <AlertBanner
              v-if="isError"
              title="Cannot load Protocols"
              type="error"
            >
              <template #text>
                <p>
                  There was an error fetching the protocols. Please check that
                  you have entered a search value and try again.
                </p>
              </template>

              <template #append>
                <v-code
                  v-if="error"
                  class="d-block text-break custom-error mt-4"
                >
                  {{ error?.message }}
                </v-code>
              </template>
            </AlertBanner>

            <!-- No items to display -->
            <AlertBanner
              v-if="hasEmptyState"
              title="No Protocols Found"
              type="info"
            >
              <template #text>
                <p>
                  No items were found based on the keyword "<strong>{{
                    queryParameters.searchKey
                  }}</strong
                  >". Please try a different keyword.
                </p>
              </template>
            </AlertBanner>
          </v-col>
        </v-row>

        <!-- Display returned items-->
        <ProtocolsResults
          v-if="!isLoading && protocolData?.items.length"
          :is-fetching="isFetching"
          :pagination="protocolData?.pagination"
          :items="protocolData?.items"
          :tab="tab"
          :sort-filters="searchSortFilters"
          @update:pagination="handlePaginationChange"
          @update:sort-results="handleSortFilter"
          @update:tab="tab = $event"
          @update:show-dialog="isSortDialogVisible = $event"
        />
      </v-container>
    </v-main>

    <SortQueryDialog
      v-if="!isFetching && protocolData?.items.length"
      :sort-filters="searchSortFilters"
      :show-dialog="isSortDialogVisible"
      @update:show-dialog="isSortDialogVisible = $event"
      @update:sort-results="handleSortFilter"
    />
  </v-app>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useProtocols } from '@/composables/useProtocols';

  import AlertBanner from '@/components/AlertBanner.vue';
  import ProtocolHeader from '@/components/ProtocolHeader.vue';
  import ProtocolsResults from './view/ProtocolsResults.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import SortQueryDialog from '@/components/SortQueryDialog.vue';

  import {
    type ProtocolsQuery,
    type SearchSortFilters,
  } from '@/types/protocol/query';

  const tab = ref<'cards' | 'table'>('table'); // Default to 'cards'

  const queryParameters = ref<ProtocolsQuery>({
    searchKey: 'temp',
    pageId: '0', // Make sure to initialize this properly
  });

  const {
    data: protocolData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProtocols(queryParameters);

  const hasEmptyState = computed(
    (): boolean => !isFetching.value && protocolData.value?.items.length === 0,
  );

  const searchSortFilters = ref<SearchSortFilters>({
    orderField: null,
    orderDir: null,
    pageSize: null,
  });

  // Watch for changes in searchKey and reset pageId to the first page
  watch(
    () => queryParameters.value.searchKey,
    () => {
      resetPagination();
    },
  );

  /**
   * Display the Sort Filters dialog window
   */
  const isSortDialogVisible = ref(false);

  /**
   * Reset the pagination.
   * This is useful when we change fields in the query, resetting everything
   */
  function resetPagination() {
    queryParameters.value.pageId = '0'; // Reset to the first page
  }
  /**
   * Sets the pageId for the query parameters
   *
   * pageId is handled as a string acording to the API.
   * But it might be safe to keep it as a number, something to consider for the future as clean up
   *
   * @param newPageNumber {number}
   */
  function handlePaginationChange(newPageNumber: number) {
    queryParameters.value.pageId = newPageNumber.toString();
  }

  /**
   * Sets the sort query parameters.
   *
   * We need to resets the pagination, as we will restart the
   * results when we change the query parameters
   *
   * @param querySortSearch
   */
  function handleSortFilter(querySortSearch: SearchSortFilters) {
    resetPagination();

    // We can clean this up and use `queryParameters` as our main source of truth
    searchSortFilters.value = { ...querySortSearch };

    queryParameters.value.orderField = querySortSearch.orderField;
    queryParameters.value.orderDir = querySortSearch.orderDir;
    queryParameters.value.pageSize = querySortSearch.pageSize?.toString();
  }
</script>

<style lang="scss" scoped>
  .custom-error {
    max-height: 300px;
    overflow: scroll;
  }
</style>
