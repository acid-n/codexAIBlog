# Musson Blog

Репозиторий содержит исходный код **Musson** — безголовой блог-платформы на Django и Next.js.

## Быстрый старт

1. Скопируйте `.env.example` в `.env` и при необходимости измените значения.
2. Соберите и запустите окружение:
   ```bash
   cd infra
   docker compose up --build
   ```
   Бэкенд будет доступен на `http://localhost:8000`, фронтенд — на `http://localhost:3000`.
3. При первом запуске автоматически создаётся суперпользователь `admin`/`admin123`.
   Зайдите на `http://localhost:8000/admin/` и смените пароль.

Современная headless-платформа блога на **Django** и **Next.js**.

## Возможности

- REST API на базе Django REST Framework
- Фронтенд SSR/SSG на Next.js и Tailwind CSS
- Рейтинги пользователей и навигация по тегам
- Сервис коротких ссылок для обмена постами
- Разработка в Docker-окружении

## Главная страница

Главная страница фронтенда реализована в `frontend/src/app/page.tsx`.
Сейчас она содержит:

- заголовок и краткое описание блога;
- навигацию по разделам **AI**, **ART**, **LIFE**;
- список последних постов (данные пока мокируются);
- строку поиска без функционала;
- базовые SEO-теги (`<title>`, `<meta name="description">`).

После подключения API список постов будет загружаться с сервера.

## Полезные ссылки

- [Технический обзор](docs/TECHNICAL_OVERVIEW.md)
- [Описание API](docs/API_REFERENCE.md)
- [Руководство пользователя](docs/USER_GUIDE.md)
- [Руководство разработчика](docs/DEV_GUIDE.md)

## Технологии

- Python 3.11, Django 5, Django REST Framework
- Next.js 13+, React, TypeScript
- PostgreSQL, Redis
- Docker, Docker Compose, GitHub Actions

## Структура репозитория

```
backend/   # проект Django
frontend/  # приложение Next.js
infra/     # docker-compose и файлы деплоя
docs/      # документация
```

## Локальная установка

1. Клонируйте репозиторий и скопируйте `.env.example` в `.env`.
2. Соберите и запустите сервисы через Docker:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```
3. Перейдите на `http://localhost:3000` для фронтенда и `http://localhost:8000` для API бэкенда.
4. Для входа в админку используется пользователь `admin` с паролем `admin123` (создаётся автоматически).

## Пример использования

```bash
# Получить список постов
curl http://localhost:8000/api/v1/posts/

# Создать рейтинг
curl -X POST http://localhost:8000/api/v1/ratings/ \
  -H 'Content-Type: application/json' \
  -d '{"post": 1, "score": 5, "user_hash": "123"}'
```

## Статические файлы / collectstatic

Бэкенд выполняет команду `collectstatic` на этапе сборки Docker. Файлы собираются в каталог, указанный в переменной окружения `STATIC_ROOT` (по умолчанию `/app/static`). Убедитесь, что путь существует и задан в `.env`, если вы его меняете.

Собранные файлы доступны по пути `/static/` при запуске стека.

## Docker и CI

Codex не выполняет docker-команды напрямую. Для гарантии сборки используется GitHub Actions:

- `.github/workflows/ci.yml` автоматически:
  - устанавливает зависимости и пакеты `pytest`, `pytest-django`, `pytest-cov`;
  - запускает `pytest --cov=.` для backend;
  - устанавливает зависимости фронтенда через `npm ci` при наличии `package-lock.json`, иначе `npm install`;
  - проверяет наличие пакетов TypeScript и ESLint;
  - собирает фронтенд и запускает тесты бэкенда;
  - только затем строит Docker-образы.

Если Docker недоступен локально, ориентируйтесь на результаты CI. Перед деплоем убедитесь, что workflow завершился без ошибок.

## Участие

Будем рады pull request'ам! Изучите `AGENTS.md` и придерживайтесь описанного стиля кодирования. Перед PR запустите `pre-commit` и тесты.

## 🧪 Тестирование

Перед запуском убедитесь, что установлены все зависимости:

```bash
pip install -r backend/requirements.txt pytest pytest-django pytest-cov
cd frontend && npm install
cd ..
```

Локально тесты запускаются из корня проекта:

```bash
pre-commit run --all-files
pytest --cov=backend/blog
cd frontend && npm test -- --coverage
```

Полный отчёт о покрытии хранится в файле `COVERAGE_REPORT.md`.

## Лицензия

Проект распространяется под лицензией MIT. Подробности — в файле [LICENSE](LICENSE).

## Project Automation

- [Tasks](tasks/) — список задач
- [Reports](reports/) — отчёты и метрики

## Автоматизация Codex

Файлы в каталоге `tasks/` описывают отдельные задачи. Их статусы фиксируются в `STATE.md` (`pending`, `in progress`, `done`). В каталоге `reports/` сохраняются отчёты о сборке и тестах. Codex обновляет эти файлы автоматически при выполнении задач.

Проект полностью русифицирован: вся документация и комментарии переведены на русский язык.
