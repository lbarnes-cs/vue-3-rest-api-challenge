<template>
  <LayoutDefault>
    <template #header>
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
    </template>

    <ProtocolHeader @refresh="refetch" />

    <v-row v-if="isLoading || isError || hasEmptyState">
      <v-col cols="12" class="">
        <!-- Loading State -->
        <v-fade-transition>
          <div v-if="isLoading" class="d-flex justify-center align-center">
            <v-progress-circular indeterminate class="mr-4" />
            Loading Data...
          </div>
        </v-fade-transition>

        <!-- Error State -->
        <v-fade-transition>
          <AlertBanner
            v-if="isError"
            key="error-state"
            title="Cannot load Protocols"
            type="error"
          >
            <template #text>
              <p>
                There was an error fetching the protocols. Please check that you
                have entered a search value and try again.
              </p>
            </template>

            <template #append>
              <v-code v-if="error" class="d-block text-break custom-error mt-4">
                {{ error?.message }}
              </v-code>
            </template>
          </AlertBanner>
        </v-fade-transition>

        <!-- No items to display -->
        <v-fade-transition>
          <AlertBanner
            v-if="hasEmptyState"
            key="empty-state"
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
        </v-fade-transition>
      </v-col>
    </v-row>

    <!-- Display returned items-->
    <keep-alive>
      <v-fade-transition>
        <ProtocolsResults
          v-if="!isLoading && protocolData?.items.length"
          :key="tab"
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
      </v-fade-transition>
    </keep-alive>

    <SortQueryDialog
      v-if="!isFetching && protocolData?.items.length"
      :sort-filters="searchSortFilters"
      :show-dialog="isSortDialogVisible"
      @update:show-dialog="isSortDialogVisible = $event"
      @update:sort-results="handleSortFilter"
    />
  </LayoutDefault>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref, watch } from 'vue';
  import { useProtocols } from '@/composables/useProtocols';

  import LayoutDefault from '@/layout/default.vue';
  import ProtocolHeader from '@/components/ProtocolHeader.vue';
  import SearchInput from '@/components/SearchInput.vue';

  const ProtocolsResults = defineAsyncComponent(
    () => import('@/view/ProtocolsResults.vue'),
  );

  const AlertBanner = defineAsyncComponent(
    () => import('@/components/AlertBanner.vue'),
  );

  const SortQueryDialog = defineAsyncComponent(
    () => import('@/components/SortQueryDialog.vue'),
  );

  import {
    OrderDir,
    OrderField,
    type ProtocolsQuery,
    type SearchSortFilters,
  } from '@/types/protocol/query';

  const tab = ref<'cards' | 'table'>('table'); // Default to 'cards'

  /**
   * Adding defaults here to help ensure that table loads faster.
   * As the table sets these states with the sort and items per page, calling
   * the API to be re-fetched. So this is an pre-emptive band-aid solution
   */
  const searchSortFilters = ref<SearchSortFilters>({
    orderField: OrderField.Activity,
    orderDir: OrderDir.Desc,
    pageSize: 10,
  });

  const queryParameters = ref<ProtocolsQuery>({
    searchKey: 'temp',
    pageId: '0', // Make sure to initialize this properly
    orderField: searchSortFilters.value.orderField,
    orderDir: searchSortFilters.value.orderDir,
    pageSize: searchSortFilters.value.pageSize?.toString(),
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
