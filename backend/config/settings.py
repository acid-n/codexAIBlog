"""
Настройки Django для проекта config.

Проект создан командой ``django-admin startproject`` с использованием Django 5.0.

Подробнее о файле настроек смотрите в
https://docs.djangoproject.com/en/5.0/topics/settings/

Полный список параметров приведён в
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from datetime import timedelta
from pathlib import Path

# Пути формируются так: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Быстрые настройки для разработки — не использовать в продакшене
# См. https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# ВАЖНО: держите секретный ключ в тайне при работе в продакшене
SECRET_KEY = "django-insecure-yj)7kmh^$@zr@ax84gbcv5)e&-h9$m)#$hlxr6=+in@i!ag$7-"

# ВАЖНО: не включайте DEBUG в продакшене!
DEBUG = True

ALLOWED_HOSTS = []


# Определение установленных приложений

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "blog",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# База данных
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Проверка паролей
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Интернационализация
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Статические файлы (CSS, JavaScript, изображения)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.environ.get("STATIC_ROOT", str(BASE_DIR / "static"))
STATICFILES_DIRS = [BASE_DIR / "staticfiles"]

MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# CORS settings allow frontend on localhost:3000 to access API during
# development. In production this list should be restricted.
CORS_ALLOWED_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS", "http://localhost:3000"
).split(",")
CORS_ALLOW_CREDENTIALS = True

# Тип первичного ключа по умолчанию
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "blog.User"
