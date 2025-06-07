# TASK-049 - Починить отображение стилей

**Статус:** запланирована

## Описание

На фронтенде и в админке Django отсутствуют стили. Нужно восстановить работу Tailwind CSS и корректную отдачу статических файлов.

## Шаги выполнения

1. Настроить Tailwind CSS в каталоге `frontend` (`tailwind.config.js`, `postcss.config.js`, `globals.css`).
2. Подключить `globals.css` в `layout.tsx` и убедиться, что `npm run build` генерирует стили.
3. Добавить `whitenoise.middleware.WhiteNoiseMiddleware` в Django и настроить `STATIC_URL`, `STATIC_ROOT`, `STATICFILES_DIRS`.
4. Проверить выполнение `collectstatic` при сборке контейнера и наличие тома для статики в `docker-compose.yml`.
5. Обновить `README.md` и документацию.
