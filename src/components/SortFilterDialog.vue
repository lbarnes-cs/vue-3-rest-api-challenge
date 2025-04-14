<template>
  <v-dialog
    :model-value="isSortDialogVisible"
    :fullscreen="!mdAndUp"
    max-width="600px"
    close-on-back
    persistent
    @update:model-value="toggleDialog"
  >
    <v-form class="fill-height" @submit.prevent="handleSubmit">
      <v-card class="pa-2">
        <v-card-title class="mt-2 d-flex align-center">
          <span class="text-h5"> Sort Filters </span>
          <v-spacer />
          <v-btn icon size="small" @click="toggleDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="filter.orderField"
                :items="orderFieldOptions"
                label="Sort by"
                clearable
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="filter.orderDir"
                :items="orderDirOptions"
                label="Sort direction"
                clearable
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="filter.pageSize"
                :items="pageSizeOptions"
                label="Items per page"
                clearable
              />
            </v-col>
          </v-row>
        </v-container>

        <v-spacer />

        <v-card-actions>
          <v-btn color="red" @click="toggleDialog"> Cancel </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="primary" type="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';

  import {
    orderFieldOptions,
    orderDirOptions,
    pageSizeOptions,
  } from '@/constants/selectSortOptions';

  import { useSortFilters } from '@/composables/useSortFilters';

  import type { SearchSortFilters } from '@/types/protocol/query';

  const { isSortDialogVisible, sortFilters, toggleDialog } = useSortFilters();

  /**
   * Added this little part to change the view of the dialog window
   * based upon the screen size. Making it more mobile friendly
   */
  const { mdAndUp } = useDisplay();

  const filter = ref<SearchSortFilters>({
    ...sortFilters.value,
  });

  const handleSubmit = () => {
    sortFilters.value = { ...filter.value };
    toggleDialog();
  };
</script>
