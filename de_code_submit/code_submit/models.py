# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from question_service.models import Question, FrameworkLanguage


class CodeSubmission(models.Model):
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE)
    framework_languages = models.ForeignKey(FrameworkLanguage, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    TODO = 'todo'
    SOLVED = 'solved'
    ATTEMPTED = 'attempted'
    STATUS_CHOICES = [
        (TODO, 'Todo'),
        (SOLVED, 'Solved'),
        (ATTEMPTED, 'Attempted')
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=TODO
    )

    # def __str__(self):
    #     return f"CodeSubmission {self.id}"
