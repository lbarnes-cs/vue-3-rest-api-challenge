import { describe, it, expect, beforeEach } from 'vitest';
import type { Pagination } from '@/types/pagination';

describe('usePagination', () => {
  let usePagination: () => ReturnType<
    (typeof import('@/composables/usePagination'))['usePagination']
  >;
  let paginationComposable: ReturnType<typeof usePagination>;

  beforeEach(async () => {
    const module = await import('@/composables/usePagination');
    usePagination = module.usePagination;
    paginationComposable = usePagination();
  });

  it('should initialize with default values', () => {
    expect(paginationComposable.currentPage.value).toBe(1);
    expect(paginationComposable.pagination.value).toEqual({});
    expect(paginationComposable.currentPageQuery.value).toBe(0);
  });

  it('should set pagination if current_page exists from the injected pagination object', () => {
    const mockPagination: Pagination = {
      changed_on: null,
      current_page: 1,
      first: 0,
      last: 514,
      next_page: '',
      page_size: 10,
      prev_page: null,
      total_pages: 52,
      total_results: 515,
    };

    paginationComposable.setPagination(mockPagination);
    expect(paginationComposable.pagination.value).toEqual(mockPagination);
  });

  it('should not update pagination if current_page is missing from the injected pagination object', () => {
    const initial = paginationComposable.pagination.value;
    paginationComposable.setPagination({} as Pagination);
    expect(paginationComposable.pagination.value).toEqual(initial);
  });

  it('should reset pagination to defaults', () => {
    paginationComposable.resetPagination();
    expect(paginationComposable.currentPage.value).toBe(1);
    expect(paginationComposable.pagination.value).toEqual({});
  });

  it('should handle pagination change and update currentPage', () => {
    paginationComposable.handlePaginationChange(4);
    expect(paginationComposable.currentPage.value).toBe(4);
    expect(paginationComposable.currentPageQuery.value).toBe(3);
  });
});
