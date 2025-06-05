# TASK-005 - Запустить базовый CI с линтерами

**Статус:** выполнена

## Описание
Создать workflow GitHub Actions, который запускает `pre-commit` на каждый push и pull request. Пока конфигурация pre-commit не добавлена, действие пропускается.

## Шаги выполнения
1. Создать `.github/workflows/ci.yml` с задачей `lint`.
2. Обновить `PROJECT_PLAN.md`.
