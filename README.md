# Musson Blog

This repository contains the source code for **Musson** – a headless blog powered by Django and Next.js.

## Quick start

1. Copy `.env.example` to `.env` and adjust values if needed.
2. Build and start the stack:

```bash
cd infra
docker compose up --build
```

The backend will be available on `http://localhost:8000`, frontend on `http://localhost:3000`.

A modern headless blogging platform powered by **Django** and **Next.js**.

## Features

- REST API built with Django REST Framework
- SSR/SSG frontend using Next.js and Tailwind CSS
- User ratings and tag navigation
- Short link service for sharing posts
- Dockerized development environment

## Quick Links

- [Technical Overview](docs/TECHNICAL_OVERVIEW.md)
- [API Reference](docs/API_REFERENCE.md)
- [User Guide](docs/USER_GUIDE.md)
- [Developer Guide](docs/DEV_GUIDE.md)

## Technology Stack

- Python 3.11, Django 5, Django REST Framework
- Next.js 13+, React, TypeScript
- PostgreSQL, Redis
- Docker, Docker Compose, GitHub Actions

## Repository Structure

```
backend/   # Django project
frontend/  # Next.js app
infra/     # docker-compose and deployment files
docs/      # documentation
```

## Local Installation

1. Clone the repository and copy `.env.example` to `.env`.
2. Build and run services with Docker:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```
3. Visit `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend API.

## Example Usage

```bash
# Fetch posts via API
curl http://localhost:8000/api/v1/posts/

# Create a rating
curl -X POST http://localhost:8000/api/v1/ratings/ \
  -H 'Content-Type: application/json' \
  -d '{"post": 1, "score": 5, "user_hash": "123"}'
```

## Static files / collectstatic

The backend uses Django's `collectstatic` command during the Docker build step.
Static files are collected into the directory defined by the `STATIC_ROOT`
environment variable (default `/app/static`). Ensure this path exists and is set
in your `.env` if you override it.

Collected files will be served from `/static/` when running the stack.

## Docker & CI

Codex не выполняет docker-команды напрямую. Для гарантии сборки используется GitHub Actions:

- `.github/workflows/ci.yml` автоматически:
  - устанавливает зависимости и пакеты `pytest`, `pytest-django`, `pytest-cov`;
  - запускает `pytest --cov=.` для backend;
  - проверяет `Dockerfile` и `docker-compose.yml` на успешную сборку образов.

Если docker недоступен локально, полагайтесь на результаты CI. Перед деплоем обязательно убедитесь, что workflow завершился без ошибок.

## Contributing

Contributions are welcome! Please read `AGENTS.md` and follow the coding style guidelines. Run `pre-commit` and tests before opening a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
