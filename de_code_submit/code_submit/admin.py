from django.contrib import admin

# Register your models here.
from question_service.models import Question, TestCase, Language, Framework,FrameworkLanguage,Tag
from user_service.models import UserProfile,\
    UserStats
from .models import CodeSubmission


admin.site.register(Question)
admin.site.register(CodeSubmission)
admin.site.register(Language)
admin.site.register(Framework)
admin.site.register(TestCase)
admin.site.register(UserProfile)
admin.site.register(UserStats)
admin.site.register(FrameworkLanguage)
admin.site.register(Tag)




