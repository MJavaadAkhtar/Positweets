from rest_framework import viewsets, permissions
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
import json
from .views import getUser, getTweets, getTrending



class UserData(APIView):
    def post(self, request):
        searchData = json.loads(request.body)
        UserInfo = getUser(searchData['username'])
        if UserInfo[0] != 'error':
            return Response(UserInfo[0])
        else:
            return Response({"error": "Username one found"})

class fetchTweets(APIView):
    def post(self, request):
        searchData = json.loads(request.body)
        tweets = getTweets(searchData['username'])
        return Response({"tweet":tweets})
    
class fetchTrend(APIView):
    def get(self, request):
        tr = []
        top_10 = getTrending()[0]['trends'][:10]
        print(top_10[0])
        for i in top_10:
            tr.append([i['name'], i['url']])
        return Response({'trend':tr})