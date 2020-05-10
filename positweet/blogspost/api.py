from blogspost.models import User,Blogs
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

class LoginUser(APIView):
    def post(self, request):
        login_req = json.loads(request.body)
        queryset = User.objects.get(username=login_req['username'])
        bool_login = check_password(login_req['password'],queryset.password)

        if bool_login:
            return Response({'username':login_req['username'],'login':True, 'id':queryset.id})
        # serializer = UserNameSerializer(queryset, many=False)
        return Response({'login':False})

class getBlogs(APIView):
    def get(self, request):
        queryset = Blogs.objects.all().order_by('date_posted').reverse()
        blog_content = {}
        for i in range(queryset.count()):
            blog_content[i]=[
                queryset[i].content,
                queryset[i].date_posted,
                queryset[i].sentiment
            ]
        return Response(blog_content)

class postBlogs(APIView):
    def post(self, request):
        blogs = json.loads(request.body)
        querysetFetch = User.objects.get(id=blogs['id'])
        
        queryset = Blogs.objects.create(
            U_ID = querysetFetch,
            content = blogs['post'],
            sentiment = blogs['sentiment']
        )

        return Response({'posted':1})
    


