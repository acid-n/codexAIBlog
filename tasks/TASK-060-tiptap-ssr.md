# TASK-060 - Исправить предупреждение SSR в TipTap

**Статус:** выполнена

## Описание

В консоли браузера при разработке появлялось предупреждение о некорректной гидратации TipTap:
`TipTap Error: SSR has been detected, please set immediatelyRender explicitly to false to avoid hydration mismatches.`

## Решение

- В компоненте `tiptap-editor` опция `immediatelyRender` установлена в `false`.
- Добавлен комментарий на русском, поясняющий причину настройки.
- Запущены линтеры, тесты и сборка — всё проходит без ошибок.
