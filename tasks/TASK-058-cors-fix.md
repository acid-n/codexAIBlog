# TASK-058 - Исправить CORS и протестировать авторизацию

**Статус:** выполнена

## Описание

При запросах с фронтенда возникала ошибка CORS, из-за чего невозможна авторизация. Нужно настроить `django-cors-headers` и добавить тест авторизации.

## Решение

- Установлен пакет `django-cors-headers` и добавлен в `INSTALLED_APPS` и `MIDDLEWARE`.
- В `settings.py` определены `CORS_ALLOWED_ORIGINS` и `CORS_ALLOW_CREDENTIALS`.
- Обновлены `.env.example` и `README.md` с пояснениями по переменной.
- В `AuthContext` добавлено логирование ошибок, создан e2e‑тест с `msw`.

## Тесты

- `npm run build && npm test` — все тесты проходят.
- `pytest` — базовые тесты backend.
