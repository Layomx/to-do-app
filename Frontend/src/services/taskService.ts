import { apiFetch } from './apiClient';
import type { PagedResult, Task, TaskFilters, TaskInput } from '../types';

function buildQuery(filters: TaskFilters): string {
  const params = new URLSearchParams();
  if (filters.completed !== undefined) params.set('completed', String(filters.completed));
  params.set('page', String(filters.page));
  params.set('pageSize', String(filters.pageSize));
  return params.toString();
}

export const taskService = {
  async getTasks(filters: TaskFilters): Promise<PagedResult<Task>> {
    return apiFetch<PagedResult<Task>>(`/tasks?${buildQuery(filters)}`);
  },

  async createTask(input: TaskInput): Promise<Task> {
    return apiFetch<Task>('/tasks', { method: 'POST', body: input });
  },

  async updateTask(id: string, input: TaskInput): Promise<Task> {
    return apiFetch<Task>(`/tasks/${id}`, { method: 'PUT', body: input });
  },

  async toggleComplete(id: string): Promise<Task> {
    return apiFetch<Task>(`/tasks/${id}/complete`, { method: 'PATCH' });
  },

  async deleteTask(id: string): Promise<void> {
    return apiFetch<void>(`/tasks/${id}`, { method: 'DELETE' });
  },
};
