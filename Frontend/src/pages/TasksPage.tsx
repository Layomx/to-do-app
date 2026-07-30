import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export function TasksPage() {
  const { username, logout } = useAuth();
  const {
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
  } = useTasks();

  const totalPages = Math.max(1, Math.ceil(totalCount / filters.pageSize));

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1>Mis tareas</h1>
        <div>
          <span>Hola, {username}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </header>

      <TaskForm onSubmit={createTask} />

      <div className="filters">
        <button
          className={filters.completed === undefined ? 'active' : ''}
          onClick={() => setFilters({ ...filters, completed: undefined, page: 1 })}
        >
          Todas
        </button>
        <button
          className={filters.completed === false ? 'active' : ''}
          onClick={() => setFilters({ ...filters, completed: false, page: 1 })}
        >
          Pendientes
        </button>
        <button
          className={filters.completed === true ? 'active' : ''}
          onClick={() => setFilters({ ...filters, completed: true, page: 1 })}
        >
          Completadas
        </button>
      </div>

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggle={toggleComplete}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />

      {!loading && !error && totalCount > 0 && (
        <div className="pagination">
          <button
            disabled={filters.page <= 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          >
            Anterior
          </button>
          <span>
            Página {filters.page} de {totalPages}
          </span>
          <button
            disabled={filters.page >= totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
