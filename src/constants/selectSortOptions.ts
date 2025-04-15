import { OrderDir, OrderField } from '@/types/protocol/query';

export const orderFieldOptions = [
  { title: 'Activity', value: OrderField.Activity },
  { title: "Creator's Name", value: OrderField.Name },
  { title: 'Publish Date', value: OrderField.Date },
  { title: 'Relevance', value: OrderField.Relevance },
  { title: 'Article ID', value: OrderField.Id },
];

export const orderDirOptions = [
  { title: 'Ascending', value: OrderDir.Asc },
  { title: 'Descending', value: OrderDir.Desc },
];

export const pageSizeOptions = [5, 10, 20, 30, 40, 50];
