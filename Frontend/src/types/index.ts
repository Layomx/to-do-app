export interface User {
  username: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  expiresAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface TaskFilters {
  completed?: boolean;
  page: number;
  pageSize: number;
}

export interface TaskInput {
  title: string;
  description?: string;
  isCompleted?: boolean;
}
