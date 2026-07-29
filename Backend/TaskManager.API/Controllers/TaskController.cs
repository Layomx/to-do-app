using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.API.DTOs;
using TaskManager.API.Repositories;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers;

[ApiController]
[Authorize]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    // Every action reads the user id from the JWT claims (set at login).
    // This is what guarantees AU-03: a user can never pass another user's id.
    private Guid CurrentUserId =>
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<PagedResultDto<TaskResponseDto>>> GetTasks(
        [FromQuery] bool? completed,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var options = new TaskQueryOptions { IsCompleted = completed, Page = page, PageSize = pageSize };
        var result = await _taskService.GetTasksAsync(CurrentUserId, options);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TaskResponseDto>> GetById(Guid id)
    {
        var result = await _taskService.GetByIdAsync(CurrentUserId, id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> Create(TaskCreateDto dto)
    {
        var result = await _taskService.CreateAsync(CurrentUserId, dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TaskResponseDto>> Update(Guid id, TaskUpdateDto dto)
    {
        var result = await _taskService.UpdateAsync(CurrentUserId, id, dto);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/complete")]
    public async Task<ActionResult<TaskResponseDto>> ToggleComplete(Guid id)
    {
        var result = await _taskService.ToggleCompleteAsync(CurrentUserId, id);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _taskService.DeleteAsync(CurrentUserId, id);
        return NoContent();
    }
}

