from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.template.defaultfilters import slugify
from PIL import Image


class User(AbstractUser):
    """Custom user model."""

    email = models.EmailField(unique=True)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self) -> str:
        return self.name


class Post(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posts",
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    body = models.JSONField()
    announcement_image = models.ImageField(
        upload_to="posts/announcements/", null=True, blank=True
    )
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=255, blank=True)
    sitemap_include = models.BooleanField(default=True)
    sitemap_priority = models.FloatField(default=0.5)
    sitemap_changefreq = models.CharField(
        max_length=16,
        default="monthly",
        choices=[
            ("always", "always"),
            ("hourly", "hourly"),
            ("daily", "daily"),
            ("weekly", "weekly"),
            ("monthly", "monthly"),
            ("yearly", "yearly"),
            ("never", "never"),
        ],
    )
    tags = models.ManyToManyField(Tag, related_name="posts")
    first_published_at = models.DateTimeField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-first_published_at"]
        indexes = [models.Index(fields=["slug"])]

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self) -> str:
        return f"/posts/{self.slug}/"

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class PostImage(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="posts/images/")

    def __str__(self) -> str:
        return self.image.name

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        webp_path = self.image.path.rsplit(".", 1)[0] + ".webp"
        img.save(webp_path, "WEBP", quality=80)
        self.image.name = self.image.name.rsplit(".", 1)[0] + ".webp"
        super().save(update_fields=["image"])


class Rating(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="ratings")
    score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    user_hash = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("post", "user_hash")


class ShortLink(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="shortlinks")
    code = models.CharField(max_length=12, unique=True)

    def get_redirect_url(self) -> str:
        return self.post.get_absolute_url()
