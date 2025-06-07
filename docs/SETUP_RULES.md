# Правила подготовки окружения

Перед запуском тестов и `pre-commit` необходимо установить зависимости проекта.

## Backend

```bash
pip install -r backend/requirements.txt pytest pytest-django pytest-cov
```

## Frontend

```bash
cd frontend && npm ci
```

Затем можно запустить `pre-commit run --all-files` или отдельные тесты.
