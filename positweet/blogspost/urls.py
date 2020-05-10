from rest_framework import routers
from .api import UserViewSet,LoginUser,UserViewSetTest,postBlogs,getBlogs,BlogViewSet
from django.conf.urls import url


router = routers.DefaultRouter()
router.register('api/Users', UserViewSetTest,'allUsers')
router.register('api/Blogs', BlogViewSet,'allUsers')

urlpatterns = [
    url('api/loginUser', LoginUser.as_view()),
    url('api/addUsers', UserViewSet.as_view()),
    url('api/addPost', postBlogs.as_view()),
    url('api/getBlogs', getBlogs.as_view())
]
urlpatterns += router.urls

# {
# "id":7,
# "post":"this is working",
# "sentiment":0
# }