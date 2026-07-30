import { useState } from 'react';
import type { Task, TaskInput } from '../types';
import { TaskForm } from './TaskForm';

interface TaskListItemProps {
  task: Task;
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, input: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskListItem({ task, onToggle, onUpdate, onDelete }: TaskListItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="task-item">
        <TaskForm
          initialTask={task}
          onSubmit={async (input) => {
            await onUpdate(task.id, input);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <label className="task-item-main">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
        />
        <div>
          <p className="task-title">{task.title}</p>
          {task.description && <p className="task-description">{task.description}</p>}
        </div>
      </label>
      <div className="task-item-actions">
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  );
}
