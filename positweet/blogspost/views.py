from django.shortcuts import render
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
import tweepy

consumer_key = 'Obww2LzMiZlTHFR5Xzs4zQQIi'
consumer_secret = 'ODldKVteBOwKYIBzDkXNaGKXD0l2f4TiiubVRVgwPhiV7Q0tPb'

access_token = '1252825450474160129-wWSN88c9N0xqvpwcO9EHJu1CFTPO8p'
access_token_secret = 'LOo2WxCRgAOpGD0uiL6JqwG16EgXW5mBZmTORrNRJfioq'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

def getUser(username):
    try:
        userTwitter = api.get_user(username)
        return [{
            'name':userTwitter.name,
            'username':userTwitter.screen_name,
            'desc':userTwitter.description,
            'friend_count':userTwitter.friends_count,
            'follower_count':userTwitter.followers_count
        }
        ]
    except tweepy.TweepError as e:
        if e.args[0][0]['code'] == 50:
            return ['error']

