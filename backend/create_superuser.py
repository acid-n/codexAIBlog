import os

import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

username = os.getenv("DJANGO_SU_NAME", "admin")
email = os.getenv("DJANGO_SU_EMAIL", "admin@example.com")
password = os.getenv("DJANGO_SU_PASSWORD", "admin123")

User = get_user_model()

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser {username} created")
else:
    print(f"Superuser {username} already exists")
