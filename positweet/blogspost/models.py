from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=50,unique=True)
    password = models.CharField(max_length=50)


class Blogs(models.Model):
    U_ID = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    sentiment = models.IntegerField()

