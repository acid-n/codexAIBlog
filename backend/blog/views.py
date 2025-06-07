from rest_framework import permissions, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Post, Tag
from .serializers import PostImageSerializer, PostSerializer, TagSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Allow read-only access for everyone, write for staff users."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().prefetch_related("tags", "images")
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

    @action(detail=True, methods=["post"], parser_classes=[MultiPartParser, FormParser])
    def images(self, request, slug=None):
        post = self.get_object()
        serializer = PostImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(post=post)
        return Response(serializer.data, status=201)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = "slug"


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_token(request):
    return Response({"user": request.user.email})


class StaffTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Token serializer that allows only staff users."""

    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_staff:
            raise AuthenticationFailed("User is not staff")
        return data


class StaffTokenObtainPairView(TokenObtainPairView):
    serializer_class = StaffTokenObtainPairSerializer
