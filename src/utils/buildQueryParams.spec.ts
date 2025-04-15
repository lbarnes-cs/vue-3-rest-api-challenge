import {
  FilterQuery,
  OrderDir,
  OrderField,
  type ProtocolsQuery,
} from '@/types/protocol/query';
import { buildQueryParams } from './buildQueryParams';

describe('buildQueryParams', () => {
  it('should return a query parameter with search key, and filter is default', () => {
    expect(buildQueryParams({ searchKey: 'australia' })).toBe(
      'filter=public&key=australia',
    );
  });

  it('should return a query parameter with search key, orderField and orderDir, filter is default', () => {
    expect(
      buildQueryParams({
        searchKey: 'australia',
        orderField: OrderField.Date,
        orderDir: OrderDir.Asc,
      }),
    ).toBe('filter=public&key=australia&order_field=date&order_dir=asc');
  });

  it('should return a query parameter with search key, and change the filter from the default default', () => {
    expect(
      buildQueryParams({
        searchKey: 'australia',
        filter: FilterQuery.UserPublic,
      }),
    ).toBe('filter=user_public&key=australia');
  });

  it('should return a query parameter with search key, and page size is set. Filter is default', () => {
    expect(
      buildQueryParams({
        searchKey: 'australia',
        pageSize: 20,
      }),
    ).toBe('filter=public&key=australia&page_size=20');
  });

  it('should return a full query parameter for all possible fields', () => {
    expect(
      buildQueryParams({
        searchKey: 'searchKey',
        orderField: OrderField.Activity,
        orderDir: OrderDir.Asc,
        pageSize: 10,
        pageId: 0,
        filter: FilterQuery.Public,
      }),
    ).toBe(
      'filter=public&key=searchKey&order_field=activity&order_dir=asc&page_size=10',
    );
  });

  it('should return a query parameter with two words joined by the plus symbol. Filter is default', () => {
    expect(
      buildQueryParams({
        searchKey: 'two words',
      }),
    ).toBe('filter=public&key=two+words');
  });

  it('should throw an error if searchKey is missing', () => {
    expect(() => buildQueryParams({} as ProtocolsQuery)).toThrow(
      'Missing required parameter: searchKey',
    );
  });
});
