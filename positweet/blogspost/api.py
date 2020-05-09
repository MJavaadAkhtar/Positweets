from blogspost.models import User
from rest_framework import viewsets, permissions
from .serializer import UserSerializer, UserNameSerializer
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
import json
from django.contrib.auth.hashers import make_password,check_password

class UserViewSetTest(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class UserViewSet(APIView):
    def post(self, request):
        login_req = json.loads(request.body)
        pwd = make_password(login_req['password'])
        print(login_req)
        queryset = User.objects.create(
            full_name = login_req['full_name'],
            username = login_req['username'],
            password = pwd
        )
        return Response({'true':1})

class MyAPI(APIView):
    def post(self, request):
        login_req = json.loads(request.body)
        queryset = User.objects.get(username=login_req['username'])
        print(queryset.password)
        print(check_password(login_req['password'],queryset.password))
        # serializer = UserNameSerializer(queryset, many=True)
        serializer = UserNameSerializer(queryset, many=False)
        print(serializer.data)
        return Response({'true':1})

