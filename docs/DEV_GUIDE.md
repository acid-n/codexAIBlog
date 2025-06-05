# Developer Guide

This guide explains how to set up the project locally and how to contribute.

## Requirements

- Docker and Docker Compose
- Python 3.11 with pip (for running tests outside Docker)
- Node.js 18 LTS
- `pre-commit`

## Running with Docker

1. Copy `.env.example` to `.env` and adjust the values.
2. Start all services:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```
3. The backend will be available at `http://localhost:8000`, the frontend at `http://localhost:3000`.

## Local Setup without Docker

1. Install dependencies for the backend (Django, DRF) and the frontend (Next.js).
2. Create a virtualenv and run migrations:
   ```bash
   python backend/manage.py migrate
   python backend/manage.py runserver
   ```
3. In another terminal start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Tests and Linters

- Python tests run with `pytest` inside the `backend` directory.
- Frontend tests (when added) run with `npm test`.
- Run `pre-commit run --all-files` before pushing changes.

## Contributing

1. Fork the repository and create a feature branch.
2. Follow the coding standards described in `AGENTS.md` and `PROJECT_PLAN.md`.
3. Update or add documentation when you change behaviour.
4. Submit a pull request referencing the relevant task.

## Where to Add Code

- **Backend** code lives under `backend/`.
- **Frontend** code lives under `frontend/`.
- Infrastructure files are under `infra/`.
- Documentation resides in `docs/`.

## Useful Commands

```bash
# Apply migrations
python backend/manage.py migrate

# Run tests
pytest backend

# Format code
pre-commit run --all-files
```
