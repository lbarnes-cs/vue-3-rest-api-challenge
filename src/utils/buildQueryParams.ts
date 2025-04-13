import type { ProtocolsQuery } from '@/types/protocol/query';

/**
 * Converts a ProtocolsQuery object into a query string for API requests.
 *
 * @param query - An object containing query parameters. `searchKey` is required.
 * @returns A URL query string (e.g. "filter=public&key=test&page_size=10").
 * @throws Will throw an error if `searchKey` is missing.
 */
export const buildQueryParams = (query: ProtocolsQuery) => {
  // searchKey is a required field, so let's enfrce it
  if (!query.searchKey) {
    throw new Error('Missing required parameter: searchKey');
  }

  const params = new URLSearchParams();

  params.append('filter', query.filter || 'public');
  params.append('key', query.searchKey);

  // Append optional fields only if they exist
  if (query.orderField) params.append('order_field', query.orderField);
  if (query.orderDir) params.append('order_dir', query.orderDir);
  if (query.pageSize) params.append('page_size', query.pageSize);
  if (query.pageId) params.append('page_id', query.pageId);

  return params.toString();
};
