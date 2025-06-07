#!/bin/bash
set -e

pip install -q -r backend/requirements.txt pytest pytest-django pytest-cov

if [ ! -d frontend/node_modules ]; then
  (cd frontend && npm ci)
fi

pytest --cov=backend/blog
(cd frontend && npm test -- --coverage)
