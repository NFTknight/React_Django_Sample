from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from .serializer import *
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer


class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['email'],
                                        email=validated_data['email'], password=validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'is_superuser', 'is_staff')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested Serializer

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'location']


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = ['questions_solved', 'questions_attempted', 'easy_questions', 'medium_questions', 'hard_questions',
                  'technology_questions']
