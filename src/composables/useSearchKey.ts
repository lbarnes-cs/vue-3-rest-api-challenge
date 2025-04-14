import { readonly, ref, watch } from 'vue';
import { usePagination } from './usePagination';

const searchKey = ref<string | null>(null);

const { resetPagination } = usePagination();

export function useSearchKey() {
  const updateSearchKey = (searchTerm: string) => {
    if (!searchTerm) {
      throw new Error('A search key needs to be set');
    }

    searchKey.value = searchTerm;
  };

  // Watch for changes in searchKey and reset pageId to the first page
  watch(
    () => searchKey.value,
    () => {
      resetPagination();
    },
  );

  return {
    searchKey: readonly(searchKey),
    updateSearchKey,
  };
}
