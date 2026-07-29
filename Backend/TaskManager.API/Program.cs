using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Middleware;
using TaskManager.API.Repositories;
using TaskManager.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Servicios esenciales
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Registro del contexto y servicios (inyeccion de memorias)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro de la capa de Autenticacion
builder.Services.AddScoped<IAuthService, AuthService>();

// Registro de la capa de Tareas y servicios
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

var app = builder.Build();

// Activacion del Middleware global de errores
app.UseMiddleware<ExceptionMiddleware>();

// Pipeline de peticiones HTTP
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
