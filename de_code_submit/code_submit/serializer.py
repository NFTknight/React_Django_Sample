from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class CodeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSubmission
        fields = ['language_id', 'code', 'submitted_at']


