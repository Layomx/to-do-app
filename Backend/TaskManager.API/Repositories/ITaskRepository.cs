using TaskManager.API.Models;

namespace TaskManager.API.Repositories;

public class TaskQueryOptions
{
    public bool? IsCompleted { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public interface ITaskRepository
{
    Task<(IEnumerable<TaskItem> Items, int TotalCount)> GetForUserAsync(Guid userId, TaskQueryOptions options);
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task AddAsync(TaskItem task);
    void Update(TaskItem task);
    void Remove(TaskItem task);
    Task<bool> SaveChangesAsync();
}
