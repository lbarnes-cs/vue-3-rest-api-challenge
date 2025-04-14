<template>
  <!-- Display protocols in Cards View -->
  <v-window v-model="localTab" @input="updateTab">
    <v-window-item value="cards">
      <ProtocolCards
        :pagination="pagination"
        :protocols-list="items"
        :sort-filters="sortFilters"
        :is-fetching="isFetching"
        @update:display-sort-dialog="$emit('update:showDialog', true)"
        @update:pagination="(newPage) => $emit('update:pagination', newPage)"
      />
    </v-window-item>

    <!-- Display protocols in Table View -->
    <v-window-item value="table">
      <v-row>
        <v-col cols="12">
          <ProtocolsTable
            :pagination="pagination"
            :protocols-list="items"
            :sort-filters="sortFilters"
            :is-fetching="isFetching"
            @update:pagination="
              (newPage) => $emit('update:pagination', newPage)
            "
            @update:sort-results="
              (sortResults: SearchSortFilters) =>
                $emit('update:sortResults', sortResults)
            "
          />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
  import { defineAsyncComponent, ref, watch } from 'vue';

  import type { Protocol } from '@/types/protocol';
  import type { Pagination } from '@/types/pagination';
  import type { SearchSortFilters } from '@/types/protocol/query';

  const ProtocolCards = defineAsyncComponent(
    () =>
      /* webpackChunkName: "result-cards" */
      import('@/view/results/ProtocolCards.vue'),
  );
  const ProtocolsTable = defineAsyncComponent(
    () =>
      /* webpackChunkName: "result-table" */
      import('@/view/results/ProtocollTable.vue'),
  );

  const props = defineProps<{
    pagination: Pagination;
    items: Protocol[];
    tab: 'cards' | 'table';
    sortFilters: Partial<SearchSortFilters>;
    isFetching?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'update:pagination', value: number): void;
    (event: 'update:sortResults', value: SearchSortFilters): void;
    (event: 'update:tab', value: 'cards' | 'table'): void;
    (event: 'update:showDialog', value: boolean): void;
  }>();

  watch(
    () => props.tab,
    (newTab) => {
      localTab.value = newTab;
    },
  );

  const localTab = ref<'cards' | 'table'>(props.tab);

  const updateTab = (newTab: 'cards' | 'table') => {
    emit('update:tab', newTab);
  };
</script>
