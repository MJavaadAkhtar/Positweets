from blogspost.models import User,Blogs
from rest_framework import viewsets, permissions
from .serializer import UserSerializer, UserNameSerializer,BlogsSerializer
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
import json
from django.contrib.auth.hashers import make_password,check_password
import requests

class UserViewSetTest(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BlogsSerializer


class UserViewSet(APIView):
    def post(self, request):
        login_req = json.loads(request.body)
        pwd = make_password(login_req['password'])
        print(login_req['email'])

        check_user = User.objects.filter(username=login_req['username']).count() == 1
        if (check_user):
            return Response({'login':False})
        

        queryset = User.objects.create(
            full_name = login_req['full_name'],
            username = login_req['username'],
            email=login_req['email'],
            password = pwd
        )

        id_ = User.objects.filter(username=login_req['username'])[0].id

        return Response({'login':True, "id":id_})

class LoginUser(APIView):
    def post(self, request):
        login_req = json.loads(request.body)
        queryset = User.objects.get(username=login_req['username'])
        bool_login = check_password(login_req['password'],queryset.password)

        if bool_login:
            return Response({'username':login_req['username'],'login':True, 'id':queryset.id,'fullname':queryset.full_name})
        # serializer = UserNameSerializer(queryset, many=False)
        return Response({'login':False})

class getBlogs(APIView):
    def get(self, request):
        queryset = Blogs.objects.all().order_by('date_posted').reverse()
        blog_content = {}

        # print(type(queryset[0].date_posted))
        for i in range(queryset.count()):
            blog_content[i]=[
                queryset[i].content,
                queryset[i].date_posted,
                queryset[i].sentiment,
                queryset[i].U_ID.username,
                queryset[i].title,
                queryset[i].U_ID.id
            ]
        return Response(blog_content)


class getBlogsUser(APIView):
    def post(self, request):
        userObj = json.loads(request.body)
        queryset = Blogs.objects.filter(U_ID=userObj['id']).order_by('date_posted').reverse()
        blog_content = {}

        print(queryset)
        for i in range(queryset.count()):
            blog_content[i]=[
                queryset[i].content,
                queryset[i].date_posted,
                queryset[i].sentiment,
                queryset[i].U_ID.username,
                queryset[i].title,
                queryset[i].U_ID.id
            ]
        return Response(blog_content)

class postBlogs(APIView):
    def post(self, request):
        blogs = json.loads(request.body)
        querysetFetch = User.objects.get(username=blogs['uname'])

        if blogs['uname'] == 'Shakespeare_bot':
            total = len(Blogs.objects.filter(U_ID=querysetFetch)) +1
            blogs['title'] = "Sonnet: "+ str(total)

        if blogs['post'] == '' and blogs['title'] == '':
            return Response({'error':'Please enter both title and blog'})

        url = 'https://www.sentiment-analysis-api.site/api/one'
        data = {"data": blogs['post']}
        r = requests.post(url,  json=data)
       

        
        queryset = Blogs.objects.create(
            U_ID = querysetFetch,
            content = blogs['post'],
            sentiment = r.json(),
            title=blogs['title']
        )

        return Response({'posted':1, 'error':""})
        
    


class getUsers(APIView):
    def get(self, request, username):
        print("comes hhere")
        return Response({"hello":"hi"})