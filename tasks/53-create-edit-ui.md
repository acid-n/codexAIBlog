# TASK-053 - Обновление UI создания и редактирования поста

## Изменения

- Реализованы компоненты `TiptapEditor`, `ImageUploader`, `TagsInput`.
- Страницы `/admin/create-post` и `/admin/edit-post/[slug]` подключены к API и защищены `ProtectedRoute`.
- Формы поддерживают SEO-поля, загрузку изображений и автодополнение тегов.
- Обновлены pre-commit хуки и инструкции по установке зависимостей.

## Тесты

- `pre-commit` запускает скрипт `scripts/run-tests.sh` для проверки Django и React.
