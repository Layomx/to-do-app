using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;

namespace TaskManager.API.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<TaskItem> Items, int TotalCount)> GetForUserAsync(Guid userId, TaskQueryOptions options)
    {
        var query = _context.Tasks.Where(t => t.UserId == userId);

        if (options.IsCompleted.HasValue)
        {
            query = query.Where(t => t.IsCompleted == options.IsCompleted.Value);
        }

        var totalCount = await query.CountAsync();

        var page = options.Page < 1 ? 1 : options.Page;
        var pageSize = options.PageSize is < 1 or > 100 ? 10 : options.PageSize;

        var items = await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public Task<TaskItem?> GetByIdAsync(Guid id) =>
        _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

    public async Task AddAsync(TaskItem task) => await _context.Tasks.AddAsync(task);

    public void Update(TaskItem task) => _context.Tasks.Update(task);

    public void Remove(TaskItem task) => _context.Tasks.Remove(task);

    public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
}
