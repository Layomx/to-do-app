# Administrador de tareas sencillo

Aplicacion de Task Manager sencilla con Backennd en C# / .NET y Frontend en React, con autenticacion JWT y persistencia en PostgreSQL. Cada usuario podra registrarse, iniciar sesion y gestionar sus PROPIAS tareas.

El Backend junto con el Frontend ya han sido acabados, el proyecto esta completo, el backend ya realiza migraciones automaticas al arrancar, asi que no hace falta correr comandos de EF Core por separado. La arquitectura esta pensada para Linux principalmente y deben tenerse todas las dependencias y herramientas instaladas para correr localmente la aplicacion. 

## Arquitectura

**Tecnologías Principales**
- Backend: C#, .NET 10, Entity Framework Core, PostgreSQL.
- Frontend: React + TypeScript, la API se consume via Fetch nativo.
- Base de datos: PostgreSQL, ejecutandose en un contenedor aislado de Docker.
- Arquitectura: Diseno por capas con Middleware global que maneja excepciones.

**Puertos usados en este setup local**
- Backend: `5115`
- Frontend: `5173`
- PostgreSQL: `5432`

## 1. Requisitos previos
 
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) y npm
- Docker (para levantar PostgreSQL localmente)
## 2. Clonar el repositorio
 
```bash
git clone git@github.com:Layomx/to-do-app.git
cd to-do-app
```
 
## 3. Levantar la base de datos con Docker
 
```bash
sudo docker run --name taskmanager-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=taskmanager \
  -p 5432:5432 \
  -d postgres:latest
```
 
Verifica que el contenedor esté corriendo con `sudo docker ps`.
 
## 4. Levantar el backend (puerto 5115)
 
```bash
cd Backend/TaskManager.API
dotnet restore
dotnet run --urls http://localhost:5115
```
 
La API queda disponible en `http://localhost:5115` (y Swagger, si está habilitado, en `http://localhost:5115/swagger`).

## 5. Levantar el frontend (puerto 5173)
 
En otra terminal:
 
```bash
cd Frontend
cp .env.example .env
```
 
Edita `.env` para que apunte al backend del paso 4:
 
```
VITE_API_URL=http://localhost:5115/api
```
 
Luego instala dependencias y corre el servidor de desarrollo:
 
```bash
npm install
npm run dev
```
 
El frontend queda disponible en `http://localhost:5173`.
 
## 6. Probar que todo esté conectado
 
1. Abre `http://localhost:5173`, regístrate con un usuario nuevo.
2. Crea una tarea desde la interfaz.
3. Refresca la página: la sesión y las tareas deben seguir ahí (la sesión se guarda en
   el navegador y se valida contra el backend en cada carga).
4. Si algo no responde, revisa el orden: Docker (paso 3) → backend (paso 4) → frontend
   (paso 5). El frontend depende de que el backend esté arriba, y el backend depende de
   que Postgres esté arriba.

## 7. Apagar el entorno

EL Backend y el Frontend se detiene con `CTRL + C` en sus respectivas terminales pero Docker se detiene con:
 
```bash
sudo docker stop taskmanager-db
```
 
## 8. Volver a levantar todo sin perder datos
 
```bash
sudo docker start taskmanager-db
cd Backend/TaskManager.API && dotnet run --urls http://localhost:5115
cd Frontend && npm run dev
```

Los datos de PostgreSQL persisten mientras no se elimine el contenedor.
 
## Notas
 
- Este setup es para **uso local/desarrollo**. La produccion se planea a futuro.
- Si se cambia el puerto del Backend debe actualizar tambien `VITE_API_URL` en el `.env` sino se tendran muchisimos errores.
