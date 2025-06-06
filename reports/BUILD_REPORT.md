## TASK-003-dev-docker-setup

- Обновлён `infra/docker-compose.yml`: убрано поле `version`, переменные окружения
  загружаются через `env_file`, добавлен запуск миграций и `collectstatic` перед
  `gunicorn`. Для фронтенда настроен том `node_modules` и команда `npm install && npm run dev`.
- Создан Dockerfile фронтенда с поддержкой разработки.
- Добавлен файл `tasks/TASK-003-dev-docker-setup.md` и обновлён `STATE.md`.
