// https://apidocs.protocols.io/#pagination-object
export type Pagination = {
  current_page: number; // Current page number
  total_pages: number; // Total number of pages
  total_results: number; // Total number of results available
  next_page: string | null; // URL to the next page, or null if no next page
  prev_page: string | null; // URL to the previous page, or null if no previous page
  page_size: number; // Number of items per page
  first: number; // ID of the first item on the current page
  last: number; // ID of the last item on the current page
  changed_on: number; // Unix timestamp of when the list was last changed
};
