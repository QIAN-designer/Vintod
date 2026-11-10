export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data?: T;
  pagination?: PaginationMeta;
  error?: string;
  message?: string;
}
