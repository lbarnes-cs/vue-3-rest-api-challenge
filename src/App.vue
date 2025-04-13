<template>
  <v-app>
    <v-app-bar flag color="primary">
      <v-container>
        <v-row dense>
          <v-col cols="8" class="bg-primary">
            <v-tabs v-model="tab" bgColor="primary">
              <v-tab value="cards">Cards</v-tab>
              <v-tab value="table">Table</v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="4" class="bg-primary d-flex align-center">
            <SearchInput
              v-model="queryParameters.searchKey"
              :isFetching="isFetching"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        {{ queryParameters }}
        <ProtocolHeader @refresh="refetch" />

        <!-- Tabs for selecting view: Cards or Table -->

        <v-row v-if="isFetching || isError || hasEmptyState">
          <v-col cols="12" class="">
            <!-- Loading State -->
            <div v-if="isFetching" class="d-flex justify-center align-center">
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

        <v-row>
          <v-col cols="12" class="d-flex ga-2">
            <v-select
              v-model="selectedOrderField"
              :items="orderFieldOptions"
              label="Select Order Field"
              clearable
              @update:modelValue="handleOrderFieldChange"
            />

            <v-select
              v-model="selectedOrderDir"
              :items="orderDirOptions"
              label="Select Order Direction"
              clearable
              @update:modelValue="handleOrderDirChange"
            />
          </v-col>
        </v-row>

        <!-- Display returned items-->
        <ProtocolsResults
          v-if="!isFetching && protocolData?.items.length"
          :pagination="protocolData?.pagination"
          :items="protocolData?.items"
          :tab="tab"
          @update:tab="tab = $event"
          @update:pagination="handlePaginationChange"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useProtocols } from '@/composables/useProtocols';

import AlertBanner from '@/components/AlertBanner.vue';
import ProtocolHeader from '@/components/ProtocolHeader.vue';
import ProtocolsResults from './components/ProtocolsResults.vue';
import SearchInput from '@/components/SearchInput.vue';

import {
  OrderDir,
  OrderField,
  type ProtocolsQuery,
} from '@/types/protocol/query';

const tab = ref<'cards' | 'table'>('cards'); // Default to 'cards'

const queryParameters = ref<ProtocolsQuery>({
  searchKey: 'temp',
  pageId: '0', // Make sure to initialize this properly
});

const {
  data: protocolData,
  isFetching,
  isError,
  error,
  refetch,
} = useProtocols(queryParameters);

const hasEmptyState = computed(
  (): boolean => !isFetching.value && protocolData.value?.items.length === 0,
);

const selectedOrderField = ref<OrderField | null>(null);
const selectedOrderDir = ref<OrderDir | null>(null);

const orderFieldOptions = Object.keys(OrderField).map((key) => ({
  title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of each enum key
  value: OrderField[key as keyof typeof OrderField],
}));

const orderDirOptions = Object.keys(OrderDir).map((key) => ({
  title: key.charAt(0).toUpperCase() + key.slice(1),
  value: OrderDir[key as keyof typeof OrderDir],
}));

// Watch for changes in searchKey and reset pageId to 1
watch(
  () => queryParameters.value.searchKey,
  () => {
    resetPagination();
  },
);

/**
 * Reset the pagination.
 * This is useful when we change fields in the query, resetting everything
 */
function resetPagination() {
  queryParameters.value.pageId = '0'; // Reset to the first page
}
/**
 * Sets the pageId for the query parameters
 * @param newPageNumber
 */
function handlePaginationChange(newPageNumber: string) {
  queryParameters.value.pageId = newPageNumber;
}

/**
 * Sets the orderField for the query parameters
 * Also resets the pagination.
 *
 * @param newOrderField
 */
function handleOrderFieldChange(newOrderField: OrderField) {
  resetPagination();
  queryParameters.value.orderField = newOrderField;
}

/**
 * Sets the orderDir for the query parameters
 * Also resets the pagination.
 *
 * @param newOrderField
 */
function handleOrderDirChange(newOrderDir: OrderDir) {
  resetPagination();
  queryParameters.value.orderDir = newOrderDir;
}
</script>

<style lang="scss" scoped>
.custom-error {
  max-height: 300px;
  overflow: scroll;
}
</style>
