namespace TaskManager.API.DTOs;

public record TaskCreateDto(string Title, string? Description);

public record TaskUpdateDto(string Title, string? Description, bool IsCompleted);

public record TaskResponseDto(
    Guid Id,
    string Title,
    string? Description,
    bool IsCompleted,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

public record PagedResultDto<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int Page,
    int PageSize
);
