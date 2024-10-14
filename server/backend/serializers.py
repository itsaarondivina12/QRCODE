from rest_framework import serializers
from .models import Registered_Users 

class RegisteredUsersSerializers (serializers.ModelSerializer):
    class Meta: 
        model = Registered_Users 
        fields = '__all__'