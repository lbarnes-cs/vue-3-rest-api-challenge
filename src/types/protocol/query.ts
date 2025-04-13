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

export type ProtocolsQuery = {
  filter?: 'public' | 'user_public' | 'user_private' | 'shared_with_user';
  searchKey: string;
  orderField?: OrderField;
  orderDir?: OrderDir;
  pageSize?: string;
  pageId?: string;
  // fields is another query parameter, but leaving it out for this version
};
