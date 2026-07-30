import { useState, type FormEvent } from 'react';
import type { Task, TaskInput } from '../types';

interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (input: TaskInput) => Promise<void>;
  onCancel?: () => void;
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('El título es obligatorio.');
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        isCompleted: initialTask?.isCompleted ?? false,
      });
      if (!initialTask) {
        setTitle('');
        setDescription('');
      }
    } catch {
      setFormError('No se pudo guardar la tarea.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {formError && <p className="error-text">{formError}</p>}
      <div className="task-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : initialTask ? 'Actualizar' : 'Agregar tarea'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
