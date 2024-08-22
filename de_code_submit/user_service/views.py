from django.shortcuts import render
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import Http404
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import logout
from rest_framework.decorators import api_view


# Create your views here.

class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        print("using signup authenticated ")
        if serializer.is_valid():
            print("before signup save ")
            serializer.save()
            # login(request, user)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        print("authenticated using authenticate fn before login")

        serializer.is_valid(raise_exception=True)
        # print(
        #     "authenticated using serializer fn" + serializer.validated_data['email'] + " " + serializer.validated_data[
        #         'password'])
        UserModel = get_user_model()
        user = UserModel.objects.get(email=serializer.validated_data['email'])
        if not user.check_password(serializer.validated_data['password']):
            return Response({"error": "Invalid password"}, status=400)

        user = authenticate(email=serializer.validated_data['email'],
                            password=serializer.validated_data['password'])
        print("authenticated using authenticate fn after login")
        if user and user.is_active:
            # token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            user_serializer = UserSerializer(user)
            # return user
            return JsonResponse({'message': 'Login successful', 'user': user_serializer.data}, status=200)
        else:
            print('User not found or inactive')
            return Response({"error": "Invalid credentials"}, status=400)
        return Response({"error": "Error Unknown"}, status=400)


class LogOutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Logged out successfully."})


class UserProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)


class UserStatsView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            stats = UserStats.objects.get(user=request.user)
        except UserStats.DoesNotExist:
            # You can create a new instance of UserStats with default values
            stats = UserStats(user=request.user)  # Don't save it to the database if you want to return just default values

        serializer = UserStatsSerializer(stats)
        return Response(serializer.data)


class CurrentUserView(APIView):
    def get_object(self, request):
        user = request.user
        if user.is_authenticated:
            return user
        else:
            raise Http404

    def get(self, request, format=None):
        user = self.get_object(request)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CheckAuthenticationView(APIView):
    def get(self, request):
        if request.user and request.user.is_authenticated:
            return Response({'detail': 'User is authenticated'})
        return Response({'detail': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
