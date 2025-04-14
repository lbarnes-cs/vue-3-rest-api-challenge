// https://apidocs.protocols.io/#get-list
export enum OrderField {
  Activity = 'activity',
  Relevance = 'relevance',
  Date = 'date',
  Name = 'name',
  Id = 'id',
}

export enum OrderDir {
  Asc = 'asc',
  Desc = 'desc',
}

export type SearchSortFilters = {
  orderField: OrderField | null;
  orderDir: OrderDir | null;
  pageSize: number | null;
};

export enum FilterQuery {
  Public = 'public',
  UserPublic = 'user_public',
  UserPrivate = 'user_private',
  SharedWithUser = 'shared_with_user',
}

export type ProtocolsQuery = {
  filter?: FilterQuery;
  searchKey: string;
  pageId?: string | number;
  orderField?: OrderField | null;
  orderDir?: OrderDir | null;
  pageSize?: string | number | null;
  // fields is another query parameter, but leaving it out for this version
};
