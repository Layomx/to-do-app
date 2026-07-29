using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskManager.API.Models;

// Tabla de usuarios en el sistema
public class User
{
    // Guid como modelo autoincremental
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    // Contrasena en hash
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
