import { ref, watch } from 'vue';
import { sortSearchFiltersDefault } from '@/constants/sortDefaults';
import { usePagination } from './usePagination';

import type { SearchSortFilters } from '@/types/protocol/query';

const { resetPagination } = usePagination();

/**
 * Adding defaults here to help ensure that table loads faster.
 * As the table sets these states with the sort and items per page, calling
 * the API to be re-fetched. So this is an pre-emptive band-aid solution
 */
const sortFilters = ref<SearchSortFilters>({
  ...sortSearchFiltersDefault,
});

// TODO: manage the search key in the composable
const searchKey = ref<string>();

/**
 * Display the Sort Filters dialog window
 */
const isSortDialogVisible = ref(false);

export function useSortFilters() {
  const updateSortFilters = (filters: SearchSortFilters) => {
    sortFilters.value = { ...filters };
  };

  const updatePageSize = (itemsPerPage: number) => {
    sortFilters.value.pageSize = itemsPerPage;
  };

  const toggleDialog = () => {
    isSortDialogVisible.value = !isSortDialogVisible.value;
  };

  // When filters are changed, reset pagination
  watch(
    () => ({ ...sortFilters.value }),
    () => {
      resetPagination();
    },
    { deep: true },
  );

  return {
    searchKey,
    sortFilters,
    isSortDialogVisible,
    toggleDialog,
    updateSortFilters,
    updatePageSize,
  };
}
