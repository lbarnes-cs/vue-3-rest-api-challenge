import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

const mockResetPagination = vi.fn();

// Mock usePagination before importing the composable
vi.mock('@/composables/usePagination', () => ({
  usePagination: () => ({
    resetPagination: mockResetPagination,
  }),
}));

describe('useSearchKey', () => {
  let useSearchKey: () => ReturnType<
    (typeof import('@/composables/useSearchKey'))['useSearchKey']
  >;
  let searchTermComposable: ReturnType<typeof useSearchKey>;

  beforeEach(async () => {
    vi.clearAllMocks();
    useSearchKey = (await import('@/composables/useSearchKey')).useSearchKey;
    searchTermComposable = useSearchKey();
  });

  it('should set a valid search term and call resetPagination', async () => {
    searchTermComposable.updateSearchKey('biology');
    await nextTick();

    expect(searchTermComposable.searchKey.value).toBe('biology');
    expect(mockResetPagination).toHaveBeenCalled();
  });

  it('should throw if empty search term is set', () => {
    expect(() => searchTermComposable.updateSearchKey('')).toThrow(
      'A search key needs to be set',
    );
  });
});
