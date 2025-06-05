# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Initial documentation set (`README`, `TECHNICAL_OVERVIEW`, `API_REFERENCE`, `USER_GUIDE`, `DEV_GUIDE`).
- Starter change log.
- `STATIC_ROOT` setting with default `/app/static` and documentation on collecting static files.
- GitHub Actions workflow installs test requirements and runs `pytest --cov=.`.
- `package-lock.json` for deterministic frontend builds.
- TypeScript and ESLint packages added for stable Next.js build.

### Changed

- Updated README and BUILD_REPORT with CI usage notes and limitations.
- CI installs frontend dependencies with `npm ci` when lock file is present.
- CI verifies TypeScript and ESLint versions during build.

## [v0.1.0] - 2024-08-09

### Added

- Base project structure with backend and frontend directories.
- Docker compose configuration.
- Example Django models and tests.

### Changed

- Integrated pre-commit with Black, isort, flake8, ESLint and Prettier.

### Security

- Default security settings and instructions in `docs/server.md`.
