from rest_framework import serializers
from blogspost.models import User,status

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields='__all__'

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['username']