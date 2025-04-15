<template>
  <v-data-table-server
    v-model:expanded="expanded"
    :headers="headers"
    :items="protocolsList"
    :items-length="pagination?.total_results || 0"
    :loading="isFetching"
    :page="currentPage"
    :items-per-page="sortFilters.pageSize || 10"
    :sort-by="sortBy"
    :mobile="!mdAndUp"
    :density="mdAndUp ? 'default' : 'compact'"
    item-key="id"
    class="elevation-1"
    show-expand
    @update:options="handleOptionsUpdate"
    @update:page="onPageChange"
    @update:items-per-page="onItemsPerPageChange"
  >
    <!-- Main Columns -->
    <template #[`item.id`]="{ item }: ProtocolItem">
      <span>{{ item.id }}</span>
    </template>

    <template #[`item.name`]="{ item }: ProtocolItem">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="sanitizedTitleHtml(item.title_html)" />
    </template>

    <template #[`item.creator`]="{ item }: ProtocolItem">
      <a
        v-if="item.creator.link"
        :href="item.creator.link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        class="text-link"
        data-testid="creator-link"
      >
        {{ item.creator.name }}
      </a>

      <span v-else data-testid="creator-name"> {{ item.creator.name }} </span>
    </template>

    <template #[`item.date`]="{ item }: ProtocolItem">
      <span>{{ formatPublishedDate(item.published_on) }}</span>
    </template>

    <template #[`item.peer_reviewed`]="{ item }: ProtocolItem">
      <v-icon :color="item.peer_reviewed ? 'green' : 'red'">
        {{ item.peer_reviewed ? 'mdi-check-circle' : 'mdi-close-circle' }}
      </v-icon>
    </template>

    <template #[`item.actions`]="{ item }: ProtocolItem">
      <v-btn
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        size="small"
      >
        <v-icon class="mr-1">mdi-eye</v-icon>
        View
      </v-btn>
    </template>

    <!-- Expandable Row -->
    <template
      #expanded-row="{
        item,
        columns,
      }: {
        item: Protocol;
        columns: InternalDataTableHeader[];
      }"
    >
      <ProtocolExpandedRow :protocol="item" :column-length="columns.length" />
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';

  import { useSanitizeHtml } from '@/composables/useSanitizeHtml';
  import { useSortFilters } from '@/composables/useSortFilters';
  import { usePagination } from '@/composables/usePagination';

  import type { Protocol } from '@/types/protocol';
  import type { DataTableHeaderType } from '@/types/data-table.ts';
  import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';
  import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/types.mjs';
  import { OrderDir, type SearchSortFilters } from '@/types/protocol/query';

  import { sortSearchFiltersDefault } from '@/constants/sortDefaults';

  import ProtocolExpandedRow from '@/components/protocol/ProtocolExpandedRow.vue';
  import { useGoToWrapper } from '@/composables/useGoToWrapper';

  interface DataTableServerOptions {
    page: number;
    itemsPerPage: number;
    sortBy: {
      key: string;
      order: 'asc' | 'desc';
    }[];
  }

  interface ProtocolItem {
    item: Protocol;
  }

  defineProps<{
    protocolsList: Protocol[];
    isFetching?: boolean;
  }>();

  const { sanitize } = useSanitizeHtml();
  const { mdAndUp } = useDisplay();

  const { sortFilters, updateSortFilters, updatePageSize } = useSortFilters();
  const { pagination, currentPage, handlePaginationChange } = usePagination();
  const { goToWrapper } = useGoToWrapper();

  // This keeps track of which rows are expanded
  const expanded = ref<string[]>([]);

  // Table headers definition
  const headers = ref<DataTableHeaderType[]>([
    { title: 'ID', align: 'start', key: 'id', sortable: true },
    { title: 'Title', align: 'start', key: 'name', sortable: true },
    { title: 'Creator', align: 'start', key: 'creator', sortable: false },
    { title: 'Published On', align: 'start', key: 'date', sortable: true },
    {
      title: 'Peer Reviewed',
      align: 'center',
      key: 'peer_reviewed',
      sortable: false,
    },
    { title: 'Actions', align: 'center', key: 'actions', sortable: false },
  ]);

  const previousSortBy = ref<SortItem[]>([]);

  const sortBy: SortItem[] = [
    {
      // Ensure the defaults are the fallback
      key: sortFilters.value.orderField!,
      order: sortFilters.value.orderDir!.toLowerCase() as 'asc' | 'desc',
    },
  ];

  /**
   * Handles updates to the Vuetify data table's server options, specifically
   * tracking changes to sorting. Emits an event with updated sort
   * configuration only when sorting options actually change, to prevent
   * infinite update loops triggered by reactive props.
   *
   * @param {DataTableServerOptions} options - The new server options from the
   * data table, including sort and pagination.
   */
  const handleOptionsUpdate = (options: DataTableServerOptions) => {
    const newSort = options.sortBy;
    const oldSort = previousSortBy.value;

    // Check if the sort options have changed compared to the last applied values
    const sortChanged =
      newSort.length !== oldSort.length ||
      newSort.some((item, index) => {
        return (
          item.key !== oldSort[index]?.key ||
          item.order !== oldSort[index]?.order
        );
      });

    // Only proceed if the sort options have changed
    if (sortChanged) {
      // Update the previous sort tracking reference
      previousSortBy.value = [...newSort];

      // This will trigger a new re-fetch, so let's scroll up
      goToWrapper(80);

      updateSortFilters({
        orderField: newSort[0]?.key ?? sortSearchFiltersDefault.orderField,
        orderDir: newSort[0]?.order === 'desc' ? OrderDir.Desc : OrderDir.Asc,
        pageSize: options.itemsPerPage,
      } as SearchSortFilters);
    }
  };

  const onItemsPerPageChange = (itemsPerPage: number) => {
    goToWrapper(80);
    updatePageSize(itemsPerPage);
  };

  const onPageChange = (pageNumber: number) => {
    // Scroll to top of the page
    goToWrapper(80);
    // Change the pagination, which will create a new API call
    handlePaginationChange(pageNumber);
  };

  // Note: we are using this twice, this might be a helper or composable
  const formatPublishedDate = (publishedDate: number | null): string | null => {
    if (!publishedDate) return null;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const date = new Date(publishedDate * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-US', options);
  };

  const sanitizedTitleHtml = (title: string): string => sanitize(title);
</script>

<style lang="scss" scoped>
  /* Optional styling to improve appearance */
  .v-data-table td {
    word-break: break-word;
  }
</style>
