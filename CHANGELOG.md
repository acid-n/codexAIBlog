# История изменений

Все значимые изменения этого проекта документируются в этом файле.
Проект следует рекомендациям [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/).

## [Unreleased]

### Добавлено

- Начальный набор документации (`README`, `TECHNICAL_OVERVIEW`, `API_REFERENCE`, `USER_GUIDE`, `DEV_GUIDE`).
- Стартовый файл истории изменений.
- Переменная `STATIC_ROOT` со значением по умолчанию `/app/static` и описание сбора статики.
- Workflow GitHub Actions устанавливает тестовые зависимости и запускает `pytest --cov=.`.
- `package-lock.json` для детерминированной сборки фронтенда.
- Пакеты TypeScript и ESLint для стабильной сборки Next.js.

### Изменено

- Обновлены README и BUILD_REPORT с описанием CI и ограничений.
- В CI зависимости фронтенда устанавливаются через `npm ci`, если есть lock-файл.
- Во время сборки CI проверяет версии TypeScript и ESLint.

## [v0.1.0] - 2024-08-09

### Добавлено

- Базовая структура проекта с директориями backend и frontend.
- Конфигурация Docker Compose.
- Пример моделей Django и тестов.

### Изменено

- Интегрирован pre-commit с Black, isort, flake8, ESLint и Prettier.

### Безопасность

- Стандартные настройки безопасности и инструкции в `docs/server.md`.
