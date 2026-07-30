# Administrador de tareas sencillo

Aplicacion de Task Manager sencilla con Backend escrito en C# y Frontend planeado para realizarse con React.

Hasta el momento el Backend en C# ha sido terminado y puede ser probado en distitntas computadoras (principalmente equipadas con Linux) a traves de comandos en terminal, la forma mas facil de utilizarlo puede ser configurando un servidor en Postgre Local o utilizando Docker, el Backend realiza migraciones automaticas asi que se ahorran algunos comandos extra en la terminal.

## Arquitectura
Tecnologías Principales
- Backend: C#, .NET 10, Entity Framework Core, PostgreSQL, Autenticación JWT (JSON Web Tokens).
- Base de Datos: PostgreSQL (ejecutándose mediante un contenedor aislado en Docker).
- Arquitectura: Diseño en capas con middleware global de manejo de excepciones y migraciones automatizadas al arranqu

## Guia de inicio rapida
### 1. Clonar el repositorio
```bash
git clone [https://github.com/Layomx/to-do-app.git](https://github.com/Layomx/to-do-app.git)
cd to-do-app/Backend/TaskManager.API
```
### 2. Levantar base de datos con Docker
Preferiblemente usar el puerto 5432, aunque pueden usar cualquiera
```bash
sudo docker run --name taskmanager-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=taskmanager \
  -p 5432:5432 \
  -d postgres:latest
```
### 3. Ejecutar aplicacion .NET
```bash
dotnet run
```
### 4. Apagar el entorno
Detener el API con `CTRL + C` y detener Docker con el siguiente comando
```bash
sudo docker stop taskmanager-db
```
En caso de querer volver a usarlo sin perder datos usar
```bash
sudo docker start taskmanager-db
```
