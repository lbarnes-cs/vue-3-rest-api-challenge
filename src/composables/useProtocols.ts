import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { usePagination } from '@/composables/usePagination';

import { buildQueryParams } from '@/utils/buildQueryParams';

import { useSortFilters } from './useSortFilters';
import { useSearchKey } from './useSearchKey';

import type { ProtocolsResponse } from '@/types/protocol/response';
import type { Pagination } from '@/types/pagination';

const API_BASE = 'https://www.protocols.io/api/v3';
const TOKEN = import.meta.env.VITE_PROTOCOLS_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

/**
 * Fetches protocol data from the Protocols.io API.
 *
 * This function makes an API call to fetch protocols based on the provided query parameters.
 * It supports cancellation via an `AbortSignal`. If the request is canceled, the function
 * returns default values for the protocol data without throwing an error.
 *
 * @param query - The query parameters for fetching the protocols. It should contain fields like
 *                searchKey, pageId, pageSize, etc.
 * @param signal - The `AbortSignal` to cancel the request if needed.
 *
 * @returns A `ProtocolsResponse` object containing the protocol data and pagination information.
 *          In case of a canceled request, it returns default values for `items` and `pagination`,
 *          but no error is thrown.
 *
 * @throws Will throw an error if the request fails due to a non-canceled issue (e.g., network failure,
 *         server error).
 *
 * @example
 * const protocols = await fetchProtocols(query, signal);
 *
 * @see https://apidocs.protocols.io/#get-list for more details on the API endpoint.
 */
const fetchProtocols = async (
  signal: AbortSignal,
): Promise<ProtocolsResponse> => {
  try {
    const { currentPageQuery } = usePagination();
    const { sortFilters } = useSortFilters();
    const { searchKey } = useSearchKey();

    const queryString = buildQueryParams({
      searchKey: searchKey.value!,
      orderField: sortFilters.value.orderField,
      orderDir: sortFilters.value.orderDir,
      pageSize: sortFilters.value.pageSize,
      pageId: currentPageQuery.value,
    });

    const url = `/protocols?${queryString}`;

    const { data } = await axiosInstance.get(url, {
      signal, // 🔥 Enable cancellation, reducing network requests
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_CANCELED') {
        console.log('Request was canceled');

        // Return an object with all required properties even when canceled
        return {
          items: [], // Empty array as fallback for canceled request
          pagination: {
            current_page: 0,
            total_pages: 0,
            total_results: 0,
            page_size: 0,
            first: 0,
            last: 0,
            changed_on: 0,
          } as Pagination,
          status_code: 200, // Or any default status code if needed
          total: 0, // Ensure total is included
          total_pages: 0, // Ensure total_pages is included
        } satisfies ProtocolsResponse;
      } else {
        console.error('Response protocols status:', error.response?.status);
        console.error('Response protocols body:', error.response?.data);
      }
    }

    console.error('Failed to fetch protocols:', error);
    throw error;
  }
};

/**
 * Fetches protocol data from the Protocols.io API and returns a queried object.
 *
 * This function uses Vue Query to fetch data from the Protocols.io API.
 * The query will be retried twice in case of failure, and it will not refetch on window focus.
 * If the `searchKey` is missing, an error is thrown.
 *
 * @returns The result of the protocol fetch request wrapped in a Vue Query object.
 *
 * @throws Will throw an error if `searchKey` is missing from the `query` object.
 */
export function useProtocols() {
  const { currentPage } = usePagination();
  const { sortFilters } = useSortFilters();
  const { searchKey } = useSearchKey();

  return useQuery<ProtocolsResponse>({
    queryKey: ['protocols', searchKey, sortFilters, currentPage],
    queryFn: async ({ signal }) => {
      if (!searchKey.value) {
        throw new Error('Missing Search Key, one is required for API request');
      }

      return fetchProtocols(signal);
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!searchKey.value,
    placeholderData: keepPreviousData, // Keeps old data while loading new page
    staleTime: 1000 * 60 * 2, // Cache stays fresh for 2 minutes
  });
}
