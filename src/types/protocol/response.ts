import type { Protocol } from './index';
import type { Pagination } from '../pagination';

// https://apidocs.protocols.io/#get-list
export type ProtocolsResponse = {
  items: Protocol[]; // List of protocol objects (can be empty)
  total?: number; // Total number of items
  total_pages?: number; // Total number of pages
  pagination: Pagination; // Pagination object
  status_code: number; // Status code of request (0 means OK)
};
