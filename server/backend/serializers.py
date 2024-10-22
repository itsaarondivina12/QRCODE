from rest_framework import serializers
from .models import Registered_Users, Attendance

class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Registered_Users 
        fields = '__all__'  # This includes all fields in the model


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Attendance 
        fields = '__all__'  # This includes all fields in the model
