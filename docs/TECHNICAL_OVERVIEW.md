# Technical Overview

This document gives an overview of the architecture of **codexAIBlog**. It is intended for developers and DevOps engineers who need to understand how the system is structured and how its components interact.

## Architecture

The project follows a classic headless architecture with two main services:

- **Backend** – a Django 5 application providing a REST API.
- **Frontend** – a Next.js application that consumes the API and renders pages using SSR and SSG.

Both services run in Docker containers and communicate over HTTP. PostgreSQL is used as the primary database and Redis is planned for caching and Celery tasks.

```
sequenceDiagram
  participant Browser
  participant Frontend
  participant Backend
  participant DB
  Browser->>Frontend: HTTP request
  Frontend->>Backend: API request
  Backend->>DB: query
  DB-->>Backend: data
  Backend-->>Frontend: JSON
  Frontend-->>Browser: HTML/JSON
```

### Components

- **Django REST API** – exposes endpoints for posts, tags, ratings, short links, analytics and contacts. JWT is used for authentication.
- **Next.js** – renders the UI, fetches data from the API at build time (SSG) or on demand (SSR) and provides a small CLI for development.
- **PostgreSQL** – stores all persistent data. The schema is described in `docs/DATABASE_SCHEMA.txt`.
- **Redis** – used for caching and as a message broker for Celery (not yet implemented in the repository).
- **Docker & Compose** – local development and deployment run in containers defined in `infra/docker-compose.yml`.
- **CI/CD** – GitHub Actions builds and pushes images to a registry and can deploy to Yandex Cloud.

### Data Models

The main models are defined in the Django app `blog`:

- `User` – custom user model with a unique email field.
- `Post` – blog post containing title, slug, description, JSON body, optional image and publishing metadata.
- `Tag` – simple tag linked to posts via a many‑to‑many relationship.
- `Rating` – user rating for a post (1–5 stars) with a unique constraint on `(post, user_hash)`.
- `ShortLink` – stores a short code for each post and redirects to the full URL.

More detailed model descriptions can be found in `docs/DATA_MODELS.txt` and `docs/DATA_MODELS_DETAIL.txt`.

### Security and Performance

- HTTPS termination and HTTP/2 via Nginx (see `docs/server.md`).
- JWT tokens for authentication.
- Dockerized services allow horizontal scaling. PostgreSQL and Redis are external services so the application containers remain stateless.
- Static files are served by `whitenoise` or directly by Nginx. Next.js generates optimized assets during build.

### Deployment

The recommended stack for production is documented in `docs/server.md`. It includes Netdata monitoring, UFW/Fail2Ban for security, Gunicorn for Django, and optional Sentry for logging. Docker images are built by CI and can be deployed to Yandex Cloud using `docker-compose` or Kubernetes.

## Directory Structure

```
backend/   # Django project and apps
frontend/  # Next.js application
infra/     # Docker and infrastructure configs
 docs/      # documentation
```

## Database Schema

ERD and SQL DDL can be found in `docs/DATABASE_SCHEMA.txt`. The models are also visualised in `docs/architecture.md` using Mermaid.

## CI/CD

GitHub Actions is configured to lint the codebase (`pre-commit`) and build Docker images. To enable full deployment, secrets for Yandex Cloud must be configured as described in `docs/audit_recommendations.md`.
