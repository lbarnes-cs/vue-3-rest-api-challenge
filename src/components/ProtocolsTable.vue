<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="protocolsList"
    item-key="id"
    show-expand
  >
    <!-- Main Columns -->
    <template #[`item.id`]="{ item }">
      <span>{{ item.id }}</span>
    </template>
    <template #[`item.title`]="{ item }">
      <span>{{ item.title }}</span>
    </template>
    <template #[`item.authors`]="{ item }">
      <span>{{ item.authors.join(', ') }}</span>
    </template>
    <template #[`item.description`]="{ item }">
      <span>{{ item.description }}</span>
    </template>
    <template #[`item.published_date`]="{ item }">
      <span>{{ item.published_date }}</span>
    </template>
    <template #[`item.peer_reviewed`]="{ item }">
      <v-icon :color="item.peer_reviewed ? 'green' : 'red'">
        {{ item.peer_reviewed ? 'mdi-check-circle' : 'mdi-close-circle' }}
      </v-icon>
    </template>

    <!-- Expandable Row -->
    <template #expanded-item="{ item }">
      <td :colspan="headers.length">
        <v-row>
          <v-col v-if="item.acknowledgements">
            <strong>Acknowledgements:</strong>
            <div>{{ item.acknowledgements }}</div>
          </v-col>
          <v-col v-if="item.guidelines">
            <strong>Guidelines:</strong>
            <div>{{ item.guidelines }}</div>
          </v-col>
          <v-col v-if="item.image?.source">
            <strong>Image Source:</strong>
            <div>{{ item.image.source }}</div>
          </v-col>
          <v-col v-if="item.link">
            <strong>Link:</strong>
            <a :href="item.link" target="_blank">{{ item.link }}</a>
          </v-col>
          <v-col v-if="item.stats">
            <strong>Stats:</strong>
            <div>{{ item.stats }}</div>
          </v-col>
        </v-row>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Protocol } from '@/types/protocol'; // Adjust path as needed
  import type { DataTableHeaderType } from '@/types/data-table.ts';

  // Define the props with TypeScript using `defineProps`
  defineProps<{
    protocolsList: Protocol[];
  }>();

  const expanded = ref<Protocol[]>([]);

  // Table headers definition
  const headers = ref<DataTableHeaderType[]>([
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Title', align: 'start', key: 'title' },
    { title: 'Authors', align: 'start', key: 'authors' },
    { title: 'Description', align: 'start', key: 'description' },
    { title: 'Published On', align: 'start', key: 'published_date' },
    { title: 'Peer Reviewed', align: 'center', key: 'peer_reviewed' },
    { title: 'Actions', align: 'center', key: 'actions', sortable: false },
  ]);
</script>

<style scoped>
  /* Optional styling to improve appearance */
  .v-data-table td {
    word-break: break-word;
  }
</style>
