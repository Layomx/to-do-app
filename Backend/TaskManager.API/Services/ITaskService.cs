using TaskManager.API.DTOs;
using TaskManager.API.Repositories;

namespace TaskManager.API.Services;

public interface ITaskService
{
    Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(Guid userId, TaskQueryOptions options);
    Task<TaskResponseDto> GetByIdAsync(Guid userId, Guid taskId);
    Task<TaskResponseDto> CreateAsync(Guid userId, TaskCreateDto dto);
    Task<TaskResponseDto> UpdateAsync(Guid userId, Guid taskId, TaskUpdateDto dto);
    Task<TaskResponseDto> ToggleCompleteAsync(Guid userId, Guid taskId);
    Task DeleteAsync(Guid userId, Guid taskId);
}
