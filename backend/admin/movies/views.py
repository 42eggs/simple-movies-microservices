from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView

from .models import Movie, User
from .producer import publish
from .serializers import MovieSerializer
import random


# Create your views here.


class MovieViewSet(viewsets.ViewSet):
    def list(self, request): #/api/movies (get)
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    def create(self, request): #/api/movies (post)
        serializer = MovieSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish("movie_created", serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): #/api/movies/<str:id>
        movie = Movie.objects.get(id=pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    def update(self, request, pk=None):  #/api/movies/<str:id>
        movie = Movie.objects.get(id=pk)
        serializer = MovieSerializer(instance=movie, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish("movie_updated", serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):  #/api/movies/<str:id>
        movie = Movie.objects.get(id=pk)
        movie.delete()
        publish("movie_deleted", pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserAPIView(APIView):
    def get(self, _):
        users = User.objects.all()
        user = random.choice(users)
        return Response({
            'id': user.id
        })