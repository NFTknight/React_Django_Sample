from rest_framework.response import Response
from .serializer import *
from rest_framework import viewsets
from .models import Question
from .serializer import QuestionSerializer
from rest_framework import generics
from django.db.models import Exists, OuterRef, Subquery, Value
from code_submit.models import CodeSubmission
from django.db.models.functions import Coalesce
from rest_framework import status

class QuestionViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        # If user is authenticated, annotate each question with has_submission
        if user.is_authenticated:
            print(user.email)
            submission_statuses = CodeSubmission.objects.filter(
                user=user,
                question_id=OuterRef('pk')
            ).order_by('-submitted_at').values('status')[:1]  # get the latest submission status

            # print(submission_statuses)
            return Question.objects.annotate(
                user_submission_status=Coalesce(Subquery(submission_statuses), Value('todo'))
            )
            # return Question.objects.annotate(user_submission_status=Subquery(submission_statuses))

        # Otherwise, simply return all questions without the annotation
        else:
            return Question.objects.all()

    def create(self, request, *args, **kwargs):
        # You can add custom logic here
        #print(request.data)
        if request.method == 'POST':
            print("request in view", request.data)
            serializer = QuestionSerializer(data=request.data)
            #print("serializer", serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        question = self.get_object()
        tags_data = request.data.pop('tags', [])
        serializer = QuestionSerializer(question, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            self._handle_tags(question, tags_data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _handle_tags(self, question, tags_data):
        tags = []
        for tag_data in tags_data:
            tag_name = tag_data.get('name')
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tags.append(tag)
        question.tags.set(tags)


    def destroy(self, request, *args, **kwargs):
        question = self.get_object()
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer_class = QuestionSerializer


class FrameworkLanguageList(generics.ListAPIView):
    queryset = FrameworkLanguage.objects.all()
    serializer_class = FrameworkLanguageSerializer


class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer