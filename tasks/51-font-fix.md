# TASK-051 - Исправить ошибку импорта шрифта Coustard

**Статус:** выполнена

## Описание

Возникла ошибка сборки из-за неправильных настроек импорта шрифта Coustard. Помимо поднабора `latin` теперь явно указаны доступные веса `400` и `900`. Для кириллицы используется системный fallback Inter.
