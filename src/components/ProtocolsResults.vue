<template>
  <!-- Display protocols in Cards View -->
  <v-window v-model="localTab" @input="updateTab">
    <v-window-item value="cards">
      <v-row>
        <v-col
          v-for="protocol in items"
          :key="protocol.id"
          cols="12"
          md="6"
          lg="3"
          class="d-flex"
        >
          <ProtocolCard :protocol="protocol" class="w-100" />
        </v-col>
      </v-row>

      <!-- TODO: Add pagination -->
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          Results: {{ pagination.total_results }}
        </v-col>

        <v-col cols="12">
          <v-pagination
            :length="pagination.total_pages"
            :model-value="pagination.current_page"
            @update:model-value="handlePaginationChange"
          />
        </v-col>
      </v-row>
    </v-window-item>

    <!-- Display protocols in Table View -->
    <v-window-item value="table">
      <v-row>
        <v-col cols="12">
          <ProtocolsTable :protocols-list="items" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  import ProtocolCard from '@/components/ProtocolCard.vue';
  import ProtocolsTable from '@/components/ProtocolsTable.vue';

  import type { Protocol } from '@/types/protocol';
  import type { Pagination } from '@/types/pagination';

  // Define the props that the component will receive
  const props = defineProps<{
    pagination: Pagination;
    items: Protocol[];
    tab: 'cards' | 'table';
  }>();

  // Define the events that the component will emit
  const emit = defineEmits<{
    (event: 'update:tab', value: 'cards' | 'table'): void;
    (event: 'update:pagination', value: string): void;
  }>();

  const localTab = ref<'cards' | 'table'>(props.tab); // Use localTab to bind with v-model

  const updateTab = (newTab: 'cards' | 'table') => {
    // Emit an event to notify the parent of the tab change
    emit('update:tab', newTab);
  };

  // Watch for changes in tab prop and update localTab
  watch(
    () => props.tab,
    (newTab) => {
      localTab.value = newTab;
    },
  );

  function handlePaginationChange(newPage: number) {
    // we are using an index: 0 based on the page, so we need to update this accordingly
    emit('update:pagination', (newPage - 1).toString()); // Pass as string back to parent
  }
</script>
