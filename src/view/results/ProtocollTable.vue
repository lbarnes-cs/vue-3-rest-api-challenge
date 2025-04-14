<template>
  <v-data-table-server
    v-model:expanded="expanded"
    :headers="headers"
    item-key="id"
    :items="protocolsList"
    :items-length="pagination?.total_results || 0"
    :loading="isFetching"
    :page="pagination.current_page"
    :items-per-page="pagination.page_size"
    :sort-by="sortBy"
    class="elevation-1"
    show-expand
    @update:options="handleOptionsUpdate"
    @update:page="handlePageUpdate"
    @update:items-per-page="handleItemsPerPage"
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
      <span>{{ item.creator.name }}</span>
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
        columns: DataTableHeaderType[];
      }"
    >
      <tr>
        <td :colspan="columns.length" class="px-0">
          <v-table class="w-100 bg-grey-lighten-5 border-b-lg">
            <tbody>
              <tr>
                <td>
                  <ProtocolImage :image="item.image" :alt="item.title" />
                </td>
                <td colspan="4">
                  <span class="font-weight-bold">Description:</span>
                  <ProtocolDescription
                    v-if="item.description"
                    :description="item.description"
                  />
                </td>
              </tr>
              <tr>
                <td v-if="item.creator.affiliation">
                  <span class="font-weight-bold">Affiliation:</span>
                  <div>{{ item.creator.affiliation }}</div>
                </td>

                <td v-if="item.guidelines">
                  <span class="font-weight-bold">Guidelines:</span>
                  <!-- <div>{{ item.guidelines }}</div> -->
                </td>
                <td v-if="item.image?.source">
                  <span class="font-weight-bold">Image Source:</span>
                  <div>{{ item.image.source }}</div>
                </td>
                <td v-if="item.link">
                  <span class="font-weight-bold">Link:</span>
                  <a :href="item.link" target="_blank">{{ item.link }}</a>
                </td>
                <td v-if="item.stats" class="flex-2-0">
                  <span class="font-weight-bold">Stats:</span>
                  <ProtocolStats :stats="item.stats" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useSanitizeHtml } from '@/composables/useSanitizeHtml';

  import ProtocolDescription from '@/components/ProtocolDescription.vue';
  import ProtocolImage from '@/components/ProtocolImage.vue';
  import ProtocolStats from '@/components/ProtocolStats.vue';

  import type { Protocol } from '@/types/protocol';
  import type { DataTableHeaderType } from '@/types/data-table.ts';
  import type { Pagination } from '@/types/pagination';
  import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';

  import {
    OrderDir,
    OrderField,
    type SearchSortFilters,
  } from '@/types/protocol/query';

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

  const props = defineProps<{
    protocolsList: Protocol[];
    pagination: Pagination;
    sortFilters: Partial<SearchSortFilters>;
    isFetching?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'update:pagination', value: number): void;
    (event: 'update:sortResults', value: SearchSortFilters): void;
  }>();

  const { sanitize } = useSanitizeHtml();

  // This keeps track of which rows are expanded
  const expanded = ref<Protocol[]>([]);

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

  const sortBy: SortItem[] = [
    {
      key: props.sortFilters.orderField || OrderField.Activity,
      order: (props.sortFilters.orderDir || OrderDir.Desc).toLowerCase() as
        | 'asc'
        | 'desc',
    },
  ];

  const handleOptionsUpdate = (options: DataTableServerOptions) => {
    emit('update:sortResults', {
      orderField: options.sortBy[0]?.key as OrderField,
      orderDir: options.sortBy[0]?.order as OrderDir,
      pageSize: options.itemsPerPage,
    });
  };

  const handleItemsPerPage = (itemsPerPage: number) => {
    emit('update:sortResults', {
      pageSize: itemsPerPage,
    } as SearchSortFilters);
  };

  const handlePageUpdate = (page: number) => {
    emit('update:pagination', page - 1); // Still 0-based page index
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

<style scoped>
  /* Optional styling to improve appearance */
  .v-data-table td {
    word-break: break-word;
  }
</style>
