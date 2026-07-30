import { useCallback, useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { ApiError } from '../services/apiClient';
import type { Task, TaskFilters, TaskInput } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({ page: 1, pageSize: 10 });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getTasks(filters);
      setTasks(result.items);
      setTotalCount(result.totalCount);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (input: TaskInput) => {
    await taskService.createTask(input);
    await fetchTasks();
  }, [fetchTasks]);

  const updateTask = useCallback(async (id: string, input: TaskInput) => {
    await taskService.updateTask(id, input);
    await fetchTasks();
  }, [fetchTasks]);

  const toggleComplete = useCallback(async (id: string) => {
    await taskService.toggleComplete(id);
    await fetchTasks();
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id: string) => {
    await taskService.deleteTask(id);
    await fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    totalCount,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    toggleComplete,
    deleteTask,
    refetch: fetchTasks,
  };
}
