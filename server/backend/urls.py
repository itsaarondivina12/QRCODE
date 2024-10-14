from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ViewRegisteredUsers

router = DefaultRouter()
router.register(r'registered-users-list', ViewRegisteredUsers)  # Register your ViewSet here

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
]
