# API Reference

The backend exposes a RESTful API under the `/api/v1/` prefix. All responses are JSON encoded and most endpoints are read‑only for anonymous users. Authentication is handled via JWT.

## Authentication

### Obtain Token

```
POST /api/token/
```

Request body:

```json
{
  "username": "alice",
  "password": "secret"
}
```

Response:

```json
{
  "access": "<jwt-access-token>",
  "refresh": "<jwt-refresh-token>"
}
```

### Refresh Token

```
POST /api/token/refresh/
```

Request body:

```json
{
  "refresh": "<jwt-refresh-token>"
}
```

Response contains a new `access` token.

Include the access token in the `Authorization` header for protected requests:

```
Authorization: Bearer <jwt-access-token>
```

## Endpoints

### Posts

- `GET /api/v1/posts/` – list posts. Supports pagination (`page`), filter by `status`, `tag` and `search` query.
- `GET /api/v1/posts/{id}/` – retrieve a single post.
- `POST /api/v1/posts/` – create a post (admin only).

Example:

```
curl -X GET 'https://example.com/api/v1/posts/?page=1'
```

### Tags

- `GET /api/v1/tags/` – list all tags.
- `GET /api/v1/tags/{id}/` – retrieve a tag.

### Ratings

- `GET /api/v1/ratings/` – list ratings.
- `GET /api/v1/ratings/{post_id}/` – list ratings for a post.
- `GET /api/v1/ratings/{post_id}/average/` – average rating for a post.
- `POST /api/v1/ratings/` – create or update a rating.

Request body:

```json
{
  "post": 1,
  "score": 5,
  "user_hash": "abc123"
}
```

### Short Links

- `GET /s/{code}/` – redirect to the full post URL.

### Analytics

- `POST /api/v1/analytics/` – send analytics event.

Body example:

```json
{
  "event_type": "page_view",
  "event_data": { "path": "/posts/hello" },
  "page_url": "/posts/hello",
  "session_id": "uuid"
}
```

### Contact Messages

- `POST /api/v1/contact/` – send feedback.

Body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "subject": "Hi",
  "message": "Hello there"
}
```

## Error Codes

- `400 Bad Request` – validation error.
- `401 Unauthorized` – missing or invalid token.
- `403 Forbidden` – not enough permissions.
- `404 Not Found` – object does not exist.

## Interactive Docs

A browsable interface is available at `/api/docs/` when running the backend in debug mode. It is generated with Django REST Framework and shows all fields and example requests.
