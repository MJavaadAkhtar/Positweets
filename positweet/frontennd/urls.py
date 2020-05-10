from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('signup', views.index),
    path('tweeterFeed/<str:name>', views.index),
    path('blog/<str:name>', views.index)
]