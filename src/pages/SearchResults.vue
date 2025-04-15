<template>
  <LayoutDefault>
    <template #header>
      <v-container>
        <v-row dense>
          <v-col cols="7" class="bg-primary d-flex align-center gc-2">
            <span class="text-subtitle-2 hidden-xs">View:</span>
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="cards" aria-label="View protocols in card format">
                Cards
              </v-tab>
              <v-tab value="table" aria-label="View protocols in table format">
                Table
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="5" class="bg-primary d-flex align-center">
            <v-fade-transition>
              <SearchInput :is-loading="isLoading" />
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <ProtocolHeader @refresh="refetch" />

    <v-row v-if="isLoading || isError || hasEmptyState">
      <v-col cols="12" class="">
        <!-- Loading State -->
        <v-fade-transition>
          <div
            v-if="isLoading"
            class="d-flex justify-center align-center"
            data-testid="results-init-loading"
          >
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
            data-testid="results-fetching-error"
            role="alert"
            aria-live="assertive"
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
            data-testid="results-non-found"
            role="alert"
            aria-live="assertive"
          >
            <template #text>
              <p>
                No items were found based on the keyword "<strong>{{
                  searchKey
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
          :data-testid="`view-${tab}`"
          aria-live="polite"
          :aria-label="
            tab === 'cards'
              ? 'View protocols in cards format'
              : 'View protocols in table format'
          "
          @update:tab="tab = $event"
        />
      </v-fade-transition>
    </keep-alive>

    <SortFilterDialog />
  </LayoutDefault>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref, watch } from 'vue';

  import { useProtocols } from '@/composables/useProtocols';
  import { usePagination } from '@/composables/usePagination';

  import LayoutDefault from '@/layout/default.vue';
  import ProtocolHeader from '@/components/protocol/ProtocolHeader.vue';
  import SearchInput from '@/components/SearchInput.vue';

  import { useSearchKey } from '@/composables/useSearchKey';

  const AlertBanner = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "alert-banner" */
    () => import('@/components/AlertBanner.vue'),
  );

  const ProtocolsResults = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "protocols-results" */
    () => import('@/components/results/ProtocolsResults.vue'),
  );

  const SortFilterDialog = defineAsyncComponent(
    /* @rollup/plugin-chunk-name: "sort-filter-dialog" */
    () => import('@/components/SortFilterDialog.vue'),
  );

  const { setPagination } = usePagination();
  const { searchKey } = useSearchKey();

  const tab = ref<'cards' | 'table'>('cards');

  const {
    data: protocolData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProtocols();

  const hasEmptyState = computed(
    (): boolean => !isFetching.value && protocolData.value?.items.length === 0,
  );

  // Get the pagination from the useQuery and save it to the composable
  // TODO: Work out why onSucceed isn't working, this is not the cleanest way to manage setting pagination
  watch(
    () => protocolData.value?.pagination,
    (newPagination) => {
      setPagination(newPagination);
    },
  );
</script>

<style lang="scss" scoped>
  .custom-error {
    max-height: 300px;
    overflow: scroll;
  }
</style>
