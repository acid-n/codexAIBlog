# Руководство разработчика

В этом документе описано, как настроить проект локально и как принимать участие в разработке.

## Требования

- Docker и Docker Compose
- Python 3.11 с pip (для запуска тестов вне Docker)
- Node.js 18 LTS
- `pre-commit`

## Запуск в Docker

1. Скопируйте `.env.example` в `.env` и при необходимости измените значения.
2. Запустите все сервисы:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```
3. Бэкенд будет доступен по адресу `http://localhost:8000`, фронтенд — `http://localhost:3000`.

## Локальная установка без Docker

1. Установите зависимости для бэкенда (Django, DRF) и фронтенда (Next.js).
2. Создайте виртуальное окружение и примените миграции:
   ```bash
   python backend/manage.py migrate
   python backend/manage.py runserver
   ```
3. В другом терминале запустите фронтенд:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Тесты и линтеры

- Python-тесты запускаются с помощью `pytest` в каталоге `backend`.
- Фронтенд-тесты (когда появятся) выполняются командой `npm test`.
- Перед отправкой изменений запускайте `pre-commit run --all-files`.

## Внесение изменений

1. Сделайте форк репозитория и создайте ветку для своей функции.
2. Соблюдайте стандарты кодирования из `AGENTS.md` и `PROJECT_PLAN.md`.
3. Обновляйте документацию при изменении поведения.
4. Отправляйте pull request со ссылкой на соответствующую задачу.

## Где писать код

- **Backend** — каталог `backend/`.
- **Frontend** — каталог `frontend/`.
- Инфраструктурные файлы — в `infra/`.
- Документация — в `docs/`.

## Полезные команды

```bash
# Применить миграции
python backend/manage.py migrate

# Запустить тесты
pytest backend

# Отформатировать код
pre-commit run --all-files
```
