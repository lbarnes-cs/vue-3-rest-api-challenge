import { computed, ref } from 'vue';

import type { Pagination } from '@/types/pagination';

const FIRST_PAGE_ID = 1;

const currentPage = ref<number>(FIRST_PAGE_ID);
const pagination = ref<Pagination>({} as Pagination);

export function usePagination() {
  const setPagination = (newPagination?: Pagination | null) => {
    if (newPagination?.current_page) {
      pagination.value = newPagination;
    }
  };
  /**
   * Reset the pagination.
   * This is useful when we change fields in the query, resetting everything
   */
  const resetPagination = () => {
    currentPage.value = FIRST_PAGE_ID;
    pagination.value = {} as Pagination;
  };

  /**
   * We are using an index: 0 based on the page, so we need to update this accordingly
   * @param newPage {number}
   */
  function handlePaginationChange(newPageNumber: number) {
    currentPage.value = newPageNumber;
  }

  const currentPageQuery = computed(() => currentPage.value - 1);

  return {
    pagination,
    currentPage,
    currentPageQuery,
    setPagination,
    handlePaginationChange,
    resetPagination,
  };
}
