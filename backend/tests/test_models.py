from blog.models import Post, Rating, ShortLink, Tag, User
from django.test import TestCase
from django.utils import timezone


class BlogModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="alice", email="alice@example.com", password="pass"
        )
        self.tag = Tag.objects.create(name="Test", slug="test")
        self.post = Post.objects.create(
            author=self.user,
            title="Hello",
            slug="hello",
            description="text",
            body={},
            first_published_at=timezone.now(),
        )
        self.post.tags.add(self.tag)

    def test_rating_unique_constraint(self):
        Rating.objects.create(post=self.post, score=5, user_hash="123")
        with self.assertRaises(Exception):
            Rating.objects.create(post=self.post, score=4, user_hash="123")

    def test_shortlink_redirect(self):
        short = ShortLink.objects.create(post=self.post, code="abc")
        self.assertEqual(short.get_redirect_url(), f"/posts/{self.post.slug}/")
