# Архитектура

Проект разделён на два основных сервиса: Django backend и Next.js frontend. Они разворачиваются в Docker‑контейнерах и взаимодействуют через REST API.

```
sequenceDiagram
  participant Browser
  participant Frontend
  participant Backend
  participant DB
  Browser->>Frontend: HTTP request
  Frontend->>Backend: API request
  Backend->>DB: query
  DB-->>Backend: data
  Backend-->>Frontend: JSON
  Frontend-->>Browser: HTML
```

База данных — PostgreSQL, кэш и брокер задач — Redis. Для фоновых задач используется Celery.

## ERD

```mermaid
erDiagram
    users {
        int id PK
        varchar username
        varchar email
    }
    post_post {
        int id PK
        varchar title
        varchar slug
        text body
        int author_id FK
    }
    post_tag {
        int id PK
        varchar name
        varchar slug
    }
    post_rating {
        int id PK
        int value
        int user_id FK
        int post_id FK
    }
    post_shortlink {
        int id PK
        varchar key
        varchar url
    }
    users ||--o{ post_post : author
    post_post ||--o{ post_rating : ratings
    users ||--o{ post_rating : user
    post_post ||--o{ post_tag : tags
```
