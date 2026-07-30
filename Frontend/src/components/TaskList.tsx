import type { Task, TaskInput } from '../types';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, input: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

// FE-03: this component is the single place that decides which of the
// three UI states (loading / error / empty) to render.
export function TaskList({ tasks, loading, error, onToggle, onUpdate, onDelete }: TaskListProps) {
  if (loading) {
    return <p className="state-message">Cargando tareas…</p>;
  }

  if (error) {
    return <p className="state-message error-text">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="state-message">Todavía no tienes tareas. ¡Agrega la primera!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
