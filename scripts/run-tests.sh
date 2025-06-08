#!/bin/bash
set -e

pip install -q -r backend/requirements.txt pytest pytest-django pytest-cov

if [ ! -d frontend/node_modules ]; then
  npm ci --prefix frontend
fi

pytest --cov=backend/blog
npm test --prefix frontend -- --passWithNoTests
