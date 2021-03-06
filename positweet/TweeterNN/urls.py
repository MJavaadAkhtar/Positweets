from rest_framework import routers
from django.conf.urls import url
from .api import UserData, fetchTweets, fetchTrend,checkOSvariable


urlpatterns = [
    url('api/SearchUser', UserData.as_view()),
    url('api/getTweets', fetchTweets.as_view()),
    url('api/getTrend', fetchTrend.as_view()),
    url('api/checkOSvariable',checkOSvariable.as_view())
]

