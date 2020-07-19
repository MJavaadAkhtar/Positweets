from rest_framework import serializers
from blogspost.models import User, Blogs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=["id", 'full_name', 'username']

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['username']

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields='__all__'  