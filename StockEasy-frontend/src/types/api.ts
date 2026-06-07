export type Role = "ADMIN" | "STAFF";

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface Page<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
