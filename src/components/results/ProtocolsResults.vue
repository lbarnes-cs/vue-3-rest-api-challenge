<template>
  <!-- Display protocols in Cards View -->
  <v-window v-model="localTab" @input="updateTab">
    <v-window-item value="cards">
      <ProtocolCards :protocols-list="items" :is-fetching="isFetching" />
    </v-window-item>

    <!-- Display protocols in Table View -->
    <v-window-item value="table">
      <v-row>
        <v-col cols="12">
          <ProtocolTable :protocols-list="items" :is-fetching="isFetching" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  import type { Protocol } from '@/types/protocol';

  import ProtocolCards from '@/components/results/ProtocolCards.vue';
  import ProtocolTable from '@/components/results/ProtocolTable.vue';

  const props = defineProps<{
    items: Protocol[];
    tab: 'cards' | 'table';
    isFetching?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'update:tab', value: 'cards' | 'table'): void;
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
