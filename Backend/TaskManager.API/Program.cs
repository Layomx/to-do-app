using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Middleware;
using TaskManager.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Servicios esenciales
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Registro del contexto y servicios (inyeccion de memorias)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Activacion del MIddleware global de errores
app.UseMiddleware<ExceptionMiddleware>();

// Pipeline de peticiones HTTP
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
