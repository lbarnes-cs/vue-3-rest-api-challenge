<template>
  <v-dialog
    :model-value="showDialog"
    :fullscreen="!mdAndUp"
    max-width="600px"
    close-on-back
    persistent
    @update:model-value="emit('update:showDialog', $event)"
  >
    <v-form @submit.prevent="handleSubmit">
      <v-card class="pa-2">
        <v-card-title class="mt-2 d-flex align-center">
          <span class="text-h5"> Sort Filters </span>
          <v-spacer />
          <v-btn icon size="small" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="sortQuery.orderField"
                :items="orderFieldOptions"
                label="Order Field"
                clearable
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="sortQuery.orderDir"
                :items="orderDirOptions"
                label="Order Direction"
                clearable
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="sortQuery.pageSize"
                :items="pageSizeOptions"
                label="Page Size"
                clearable
              />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-btn color="red" @click="closeDialog"> Cancel </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="primary" type="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import {
    OrderDir,
    OrderField,
    type SearchSortFilters,
  } from '@/types/protocol/query';
  import { ref, watch } from 'vue';

  // Default values, which can be found on https://apidocs.protocols.io/#get-list
  const sortSearchFiltersDefault: SearchSortFilters = {
    orderField: OrderField.Activity,
    orderDir: OrderDir.Desc,
    pageSize: 10,
  };

  const props = defineProps<{
    sortFilters?: Partial<SearchSortFilters>;
    showDialog: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:showDialog', value: boolean): void;
    (e: 'update:sortResults', filters: SearchSortFilters): void;
  }>();

  /**
   * Added this little part to change the view of the dialog window
   * based upon the screen size. Making it more mobile friendly
   */
  const { mdAndUp } = useDisplay();

  const sortQuery = ref<SearchSortFilters>({} as SearchSortFilters);

  // Populate the default values if none are selected
  watch(
    () => props.sortFilters,
    (newFilters) => {
      sortQuery.value = {
        orderField:
          newFilters?.orderField ?? sortSearchFiltersDefault.orderField,
        orderDir: newFilters?.orderDir ?? sortSearchFiltersDefault.orderDir,
        pageSize: newFilters?.pageSize ?? sortSearchFiltersDefault.pageSize,
      };
    },
    { immediate: true },
  );

  // Handle form submission
  const handleSubmit = () => {
    emit('update:sortResults', sortQuery.value);
    closeDialog();
  };

  // Close dialog
  const closeDialog = () => {
    emit('update:showDialog', false);
  };

  // Options for selects
  const orderFieldOptions = Object.keys(OrderField).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    value: OrderField[key as keyof typeof OrderField],
  }));

  const orderDirOptions = Object.keys(OrderDir).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    value: OrderDir[key as keyof typeof OrderDir],
  }));

  const pageSizeOptions = [10, 20, 30, 40, 50];
</script>
