import type { ProtocolsQuery } from '@/types/protocol/query';

/**
 * Converts a ProtocolsQuery object into a query string for API requests.
 *
 * @param query - An object containing query parameters. `searchKey` is required.
 * @returns A URL query string (e.g. "filter=public&key=test&page_size=10").
 * @throws Will throw an error if `searchKey` is missing.
 */
export const buildQueryParams = ({
  searchKey,
  orderField,
  orderDir,
  pageSize,
  pageId,
  filter,
}: ProtocolsQuery) => {
  // searchKey is a required field, so let's enfrce it
  if (!searchKey) {
    throw new Error('Missing required parameter: searchKey');
  }

  const params = new URLSearchParams();

  params.append('filter', filter || 'public');
  params.append('key', searchKey);

  // Append optional fields only if they exist
  if (orderField) params.append('order_field', orderField);
  if (orderDir) params.append('order_dir', orderDir);
  if (pageSize) params.append('page_size', pageSize.toString());
  if (pageId) params.append('page_id', pageId.toString());

  return params.toString();
};
