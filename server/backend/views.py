from django.shortcuts import render
from .serializers import RegisteredUsersSerializer, AttendanceSerializer
from .models import Registered_Users, Attendance
from rest_framework import viewsets

class ViewRegisteredUsers(viewsets.ModelViewSet):
    queryset = Registered_Users.objects.all()
    serializer_class = RegisteredUsersSerializer

class ViewAttendance(viewsets.ModelViewSet):  # Changed the name to avoid conflict
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
