# Generated by Django 5.2.2 on 2025-06-07 20:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("blog", "0003_shortlink"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="image",
        ),
        migrations.AddField(
            model_name="post",
            name="announcement_image",
            field=models.ImageField(
                blank=True, null=True, upload_to="posts/announcements/"
            ),
        ),
        migrations.AddField(
            model_name="post",
            name="meta_description",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="post",
            name="meta_keywords",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="post",
            name="sitemap_changefreq",
            field=models.CharField(
                choices=[
                    ("always", "always"),
                    ("hourly", "hourly"),
                    ("daily", "daily"),
                    ("weekly", "weekly"),
                    ("monthly", "monthly"),
                    ("yearly", "yearly"),
                    ("never", "never"),
                ],
                default="monthly",
                max_length=16,
            ),
        ),
        migrations.AddField(
            model_name="post",
            name="sitemap_include",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="post",
            name="sitemap_priority",
            field=models.FloatField(default=0.5),
        ),
        migrations.CreateModel(
            name="PostImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="posts/images/")),
                (
                    "post",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="blog.post",
                    ),
                ),
            ],
        ),
    ]
