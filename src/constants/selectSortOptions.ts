import { OrderDir, OrderField } from '@/types/protocol/query';

export const orderFieldOptions = [
  { title: 'Activity', value: OrderField.Activity },
  { title: "Creator's Name", value: OrderField.Name },
  { title: 'Publish Date', value: OrderField.Date },
  { title: 'Relevance', value: OrderField.Relevance },
  { title: 'Article ID', value: OrderField.Id },
];

export const orderDirOptions = Object.keys(OrderDir).map((key) => ({
  title: key.charAt(0).toUpperCase() + key.slice(1),
  value: OrderDir[key as keyof typeof OrderDir],
}));

export const pageSizeOptions = [10, 20, 30, 40, 50];
