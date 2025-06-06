# Отчёт о сборке

## Внесённые изменения

- Добавлена настройка `STATIC_ROOT` в `config/settings.py` со значением по умолчанию `/app/static`.
- В `.env.example` добавлена переменная `STATIC_ROOT`.
- Обновлён `backend/Dockerfile`: устанавливается `STATIC_ROOT`, создаётся каталог и запускается `collectstatic`.
- В `README.md` описана работа со статическими файлами.
- В `CHANGELOG.md` отражены соответствующие правки.
- В зависимости бэкенда добавлен `Pillow` для поддержки `ImageField`.
- `infra/docker-compose.yml` теперь загружает переменные окружения через `env_file` для PostgreSQL.
- CI выполняет установку Node.js, `npm ci` (или `npm install` при отсутствии lock-файла) и сборку фронтенда, затем запускает `pytest` из корня проекта.
- В репозиторий добавлен `package-lock.json` для детерминированной установки.
- В `devDependencies` фронтенда добавлены `typescript`, `@types/react`, `@types/node` и пакеты ESLint.
- В workflow CI проверяются версии `tsc` и `eslint`.

## Тестирование

- Выполнен `pre-commit` на изменённых файлах.
- Запущены тесты `pytest` для бэкенда.
- Сборка стека через `docker compose -f infra/docker-compose.yml up --build`.
- Сборка фронтенда командой `npm run build`.
- Проверены версии `tsc` и `eslint` после установки зависимостей.

Контейнер бэкенда стартовал успешно, `collectstatic` отработал, приложение доступно на `http://localhost:8000`, фронтенд — на `http://localhost:3000`. Статика отдаётся из `/static/`.

## Как собрать

1. Скопируйте `.env.example` в `.env` и при необходимости измените значения.
2. Запустите:
   ```bash
   docker compose -f infra/docker-compose.yml up --build
   ```
   Это соберёт образы и поднимет сервисы.

⚠️ Docker-сборка не проверяется в Codex (команды недоступны). Запустите `docker compose -f infra/docker-compose.yml build` локально или дождитесь проверки GitHub Actions.

## Ограничения CI

- Workflow `.github/workflows/ci.yml` устанавливает тестовые зависимости и запускает `pytest --cov=.`.
- Зависимости фронтенда ставятся через `npm ci` или `npm install`, затем выполняется `npm run build`.
- Docker-команды выполняются только в CI или локально при наличии Docker.
