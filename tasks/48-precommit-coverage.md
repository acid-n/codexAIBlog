# TASK-048 - Починить падение pre-commit из-за файлов покрытия

**Статус:** выполнена

## Описание

Файлы отчётов покрытия (`htmlcov`, `frontend/coverage`, `coverage.xml`, `.coverage` и т.п.) попадали в индекс git, из-за чего `pre-commit` отмечал изменения после запуска тестов и завершался ошибкой.

## Итоги

- Все артефакты покрытия добавлены в `.gitignore`.
- Каталоги `htmlcov/` и `frontend/coverage/` удалены из git‑индекса.
- Запуск `pre-commit` проходит без модификации файлов.
