import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

import { sortSearchFiltersDefault } from '@/constants/sortDefaults';
import { OrderField } from '@/types/protocol/query';

const mockResetPagination = vi.fn();

// Apply mock before importing the composable
vi.mock('@/composables/usePagination', () => ({
  usePagination: () => ({
    resetPagination: mockResetPagination,
  }),
}));

describe('useSortFilters', () => {
  let useSortFilters: () => ReturnType<
    (typeof import('@/composables/useSortFilters'))['useSortFilters']
  >;
  let sortFiltersComposable: ReturnType<typeof useSortFilters>;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Dynamically import composable after mocks are in place
    useSortFilters = (await import('@/composables/useSortFilters'))
      .useSortFilters;

    sortFiltersComposable = useSortFilters();
  });

  it('should initialize with default sort filters', () => {
    expect(sortFiltersComposable.sortFilters.value).toEqual(
      sortSearchFiltersDefault,
    );
  });

  it('should update sort filters and call resetPagination', async () => {
    const newFilters = {
      ...sortSearchFiltersDefault,
      orderField: OrderField.Name,
    }; // Use a valid OrderField

    // Update the filters
    sortFiltersComposable.updateSortFilters(newFilters);

    await nextTick();

    // Check if the filter update was applied
    expect(sortFiltersComposable.sortFilters.value).toEqual(newFilters);

    // Ensure resetPagination was called after the update
    expect(mockResetPagination).toHaveBeenCalled();
  });

  it('should not call resetPagination on initial load', async () => {
    // Ensure resetPagination is not called on the initial load
    expect(mockResetPagination).not.toHaveBeenCalled();
  });

  it('should update page size and call resetPagination', async () => {
    const newPageSize = 100;

    // Update page size
    sortFiltersComposable.updatePageSize(newPageSize);

    await nextTick();

    // Check if page size was updated correctly
    expect(sortFiltersComposable.sortFilters.value.pageSize).toBe(newPageSize);

    // Ensure resetPagination was called after updating the page size
    expect(mockResetPagination).toHaveBeenCalled();
  });

  it('should toggle dialog visibility', () => {
    // False by default
    expect(sortFiltersComposable.isSortDialogVisible.value).toBe(false);

    // Enable dialog
    sortFiltersComposable.toggleDialog();
    expect(sortFiltersComposable.isSortDialogVisible.value).toBe(true);

    // Close dialog
    sortFiltersComposable.toggleDialog();
    expect(sortFiltersComposable.isSortDialogVisible.value).toBe(false);
  });
});
