from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
import json
import tweepy
import re
import requests
import os


if 'CONSUMER_KEY' in os.environ and 'CONSUMER_SECRET' in os.environ and 'ACCESS_TOKEN' in os.environ and 'ACCESS_TOKEN_SECRET' in os.environ:
    consumer_key = os.environ.get('CONSUMER_KEY')
    consumer_secret = os.environ.get('CONSUMER_SECRET')

    access_token = os.environ.get('ACCESS_TOKEN')
    access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET')

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)
else:
    api=""

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

def getTweets(username, cnt):
    tweets = api.user_timeline(screen_name=username,tweet_mode='extended', count=cnt)
    tweets_text=[]
    
    # sentiment_data = []
    # for tweet in tweets:
    #     tweet_data = tweet._json
    #     sentiment_data.append([])


    for tweet in tweets:
        tweet_data = tweet._json
        if 'retweeted_status' in tweet_data: 
            clean_tweet = re.match('(.*?)http.*?\s?(.*?)', tweet_data['retweeted_status']['full_text'])
            if clean_tweet:
                temp = []
                temp.append({
                    'text':clean_tweet.group(1),
                    'sentiment':1,
                    'is_RT':True,
                    'media': tweet_data['extended_entities']['media'][0]['media_url_https'] if 'extended_entities' in tweet_data else "",
                    'sentiment':None
                    })
                # tweets_text.append(clean_tweet.group(1))
                tweets_text.append(temp)
            else:
                temp = []
                temp.append({
                    'text':tweet_data['retweeted_status']['full_text'],
                    'sentiment':1,
                    'is_RT':True,
                    'media': tweet_data['extended_entities']['media'][0]['media_url_https'] if 'extended_entities' in tweet_data else "",
                    'sentiment':None
                })

                # tweets_text.append(tweet_data['retweeted_status']['full_text'])
                tweets_text.append(temp)
        else:
            clean_tweet = re.match('(.*?)http.*?\s?(.*?)', tweet_data['full_text'])

            if 'extended_entities' in tweet_data:
                print(tweet_data['extended_entities']['media'][0]['media_url_https'])

            if clean_tweet:
                temp = []
                temp.append({
                    'text':clean_tweet.group(1),
                    'sentiment':1,
                    'is_RT':False,
                    'media': tweet_data['extended_entities']['media'][0]['media_url_https'] if 'extended_entities' in tweet_data else "",
                    'sentiment':None
                })
                # tweets_text.append(clean_tweet.group(1))
                tweets_text.append(temp)
            else:
                temp = []
                temp.append({
                    'text':tweet_data['full_text'],
                    'sentiment':1,
                    'is_RT':False,
                    'media': tweet_data['extended_entities']['media'][0]['media_url_https'] if 'extended_entities' in tweet_data else "",
                    'sentiment':None
                })
                # tweets_text.append(tweet_data['full_text'])
                tweets_text.append(temp)

    url = 'https://www.sentiment-analysis-api.site/api/positweet'
    data = {"data": tweets_text}
    r = requests.post(url,  json=data)

    # print(tweets_text)
    # print('---')
    # print(r.json()['data'])

    return r.json()['data']

def getTrending():
    trend = api.trends_place(id=3369)
    return trend