from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Post, Tag, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "first_published_at", "is_published")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("is_published", "tags")
    search_fields = ("title", "description")
    date_hierarchy = "first_published_at"


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
