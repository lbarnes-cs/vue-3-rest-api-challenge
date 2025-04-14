import {
  OrderField,
  OrderDir,
  type SearchSortFilters,
} from '@/types/protocol/query';

// Default values, which can be found on https://apidocs.protocols.io/#get-list
export const sortSearchFiltersDefault: NonNullable<SearchSortFilters> = {
  orderField: OrderField.Activity,
  orderDir: OrderDir.Desc,
  pageSize: 10,
};
