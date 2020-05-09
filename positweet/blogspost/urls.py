from rest_framework import routers
from .api import UserViewSet,MyAPI,UserViewSetTest
from django.conf.urls import url

router = routers.DefaultRouter()
router.register('api/Users', UserViewSetTest,'allUsers')

urlpatterns = [
    url('api/loginUser', MyAPI.as_view()),
    url('api/addUsers', UserViewSet.as_view())
]
urlpatterns += router.urls
