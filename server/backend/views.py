from django.shortcuts import render
from .serializers import RegisteredUsersSerializers
from .models import Registered_Users
from rest_framework import viewsets

class ViewRegisteredUsers(viewsets.ModelViewSet):
    queryset = Registered_Users.objects.all()
    serializer_class = RegisteredUsersSerializers
    