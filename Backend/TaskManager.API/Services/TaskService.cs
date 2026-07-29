using TaskManager.API.DTOs;
using TaskManager.API.Middleware;
using TaskManager.API.Models;
using TaskManager.API.Repositories;

namespace TaskManager.API.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(Guid userId, TaskQueryOptions options)
    {
        var (items, total) = await _repository.GetForUserAsync(userId, options);
        var dtos = items.Select(ToDto);
        return new PagedResultDto<TaskResponseDto>(dtos, total, options.Page, options.PageSize);
    }

    public async Task<TaskResponseDto> GetByIdAsync(Guid userId, Guid taskId)
    {
        var task = await GetOwnedTaskOrThrow(userId, taskId);
        return ToDto(task);
    }

    public async Task<TaskResponseDto> CreateAsync(Guid userId, TaskCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new BadRequestException("Title is required.");

        var task = new TaskItem
        {
            Title = dto.Title.Trim(),
            Description = dto.Description,
            UserId = userId
        };

        await _repository.AddAsync(task);
        await _repository.SaveChangesAsync();

        return ToDto(task);
    }

    public async Task<TaskResponseDto> UpdateAsync(Guid userId, Guid taskId, TaskUpdateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new BadRequestException("Title is required.");

        var task = await GetOwnedTaskOrThrow(userId, taskId);

        task.Title = dto.Title.Trim();
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;
        task.UpdatedAt = DateTime.UtcNow;

        _repository.Update(task);
        await _repository.SaveChangesAsync();

        return ToDto(task);
    }

    public async Task<TaskResponseDto> ToggleCompleteAsync(Guid userId, Guid taskId)
    {
        var task = await GetOwnedTaskOrThrow(userId, taskId);

        task.IsCompleted = !task.IsCompleted;
        task.UpdatedAt = DateTime.UtcNow;

        _repository.Update(task);
        await _repository.SaveChangesAsync();

        return ToDto(task);
    }

    public async Task DeleteAsync(Guid userId, Guid taskId)
    {
        var task = await GetOwnedTaskOrThrow(userId, taskId);
        _repository.Remove(task);
        await _repository.SaveChangesAsync();
    }

    // Central place that enforces AU-03: a task is only visible/mutable by its owner.
    // Returning NotFound (instead of Forbidden) for another user's task avoids
    // leaking whether the task id exists at all.
    private async Task<TaskItem> GetOwnedTaskOrThrow(Guid userId, Guid taskId)
    {
        var task = await _repository.GetByIdAsync(taskId);

        if (task is null || task.UserId != userId)
            throw new NotFoundException("Task not found.");

        return task;
    }

    private static TaskResponseDto ToDto(TaskItem task) => new(
        task.Id,
        task.Title,
        task.Description,
        task.IsCompleted,
        task.CreatedAt,
        task.UpdatedAt
    );
}

