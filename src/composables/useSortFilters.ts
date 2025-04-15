import { ref, watch } from 'vue';
import { sortSearchFiltersDefault } from '@/constants/sortDefaults';
import { usePagination } from './usePagination';

import type { SearchSortFilters } from '@/types/protocol/query';

const { resetPagination } = usePagination();

/**
 * Adding defaults here to help ensure that table loads faster.
 * As the table sets these states with the sort and items per page, calling
 * the API to be re-fetched. So this is a pre-emptive band-aid solution
 */
const sortFilters = ref<SearchSortFilters>({
  ...sortSearchFiltersDefault,
});

/**
 * Display the Sort Filters dialog window
 */
const isSortDialogVisible = ref(false);

export function useSortFilters() {
  const updateSortFilters = (filters: SearchSortFilters) => {
    const prev = sortFilters.value;
    const hasChanged =
      filters.orderField !== prev.orderField ||
      filters.orderDir !== prev.orderDir ||
      filters.pageSize !== prev.pageSize;

    if (hasChanged) {
      sortFilters.value = { ...filters };
    }
  };

  const updatePageSize = (itemsPerPage: number) => {
    // Update page size and reset pagination immediately
    sortFilters.value.pageSize = itemsPerPage;
    resetPagination();
  };

  const toggleDialog = () => {
    isSortDialogVisible.value = !isSortDialogVisible.value;
  };

  // Watch for changes in orderField, orderDir, or pageSize
  watch(
    () => [
      sortFilters.value.orderField,
      sortFilters.value.orderDir,
      sortFilters.value.pageSize,
    ],
    ([newField, newDir, newSize], [oldField, oldDir, oldSize]) => {
      if (newField !== oldField || newDir !== oldDir || newSize !== oldSize) {
        resetPagination();
      }
    },
  );

  return {
    sortFilters,
    isSortDialogVisible,
    toggleDialog,
    updateSortFilters,
    updatePageSize,
  };
}
