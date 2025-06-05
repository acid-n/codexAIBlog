# Run Guide

This guide explains how to run Musson locally and in production.

## Local development

1. Install Docker and Docker Compose.
2. Copy `.env.example` to `.env`.
3. Start all services:

```bash
cd infra
docker compose up --build
```

## Production

Build images and run them on your server. An example compose file is provided in `infra/`.
