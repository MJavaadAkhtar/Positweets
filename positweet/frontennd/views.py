from django.shortcuts import render

# Create your views here.
def index(request, name=None):
    return render(request,'frontend/index.html')