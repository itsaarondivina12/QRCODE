from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ViewRegisteredUsers
from .views import ViewAttendance

router = DefaultRouter()
router.register(r'registered-users-list', ViewRegisteredUsers)  # Register your ViewSet here
router.register(r'attendance-list', ViewAttendance)  # Register the Attendance ViewSet


urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
]
