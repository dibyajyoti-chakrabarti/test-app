# Taskboard

Minimal fullstack task app for testing GitHub-to-AWS deployment detection.

## Run With Docker Compose

From the repository root:

```bash
docker compose up --build
```

Open the app at:

```text
http://localhost:5173
```

The Django API runs at:

```text
http://localhost:8000/api/tasks/
```

## Stop The App

```bash
docker compose down
```

## Reset Local Database Data

```bash
docker compose down -v
docker compose up --build
```

## Services

- `postgres`: PostgreSQL database
- `redis`: Redis cache and local Celery broker
- `backend`: Django REST API on port `8000`
- `celery_worker`: Celery worker
- `frontend`: Vite React app on port `5173`
