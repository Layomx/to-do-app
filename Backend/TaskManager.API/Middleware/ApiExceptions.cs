namespace TaskManager.API.Middleware;

// Base exception for predictable, "expected" API errors.
// The global exception middleware maps these to correct HTTP status codes,
// while anything else falls back to a generic 500.
public abstract class ApiException : Exception
{
    protected ApiException(string message) : base(message) { }
}

public class NotFoundException : ApiException
{
    public NotFoundException(string message) : base(message) { }
}

public class ForbiddenException : ApiException
{
    public ForbiddenException(string message) : base(message) { }
}

public class ConflictException : ApiException
{
    public ConflictException(string message) : base(message) { }
}

public class BadRequestException : ApiException
{
    public BadRequestException(string message) : base(message) { }
}

public class UnauthorizedAppException : ApiException
{
    public UnauthorizedAppException(string message) : base(message) { }
}
