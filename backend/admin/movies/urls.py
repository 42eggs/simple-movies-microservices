
from django.contrib import admin
from django.urls import path

from .views import MovieViewSet, UserAPIView

urlpatterns = [
    path('movies', MovieViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('movies/<str:pk>', MovieViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'delete': 'destroy'
    })),
    path('user', UserAPIView.as_view())
]
