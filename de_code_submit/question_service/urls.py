from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, FrameworkLanguageList

router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='questions')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/frameworklanguages/', FrameworkLanguageList.as_view(), name='frameworklanguages'),
]

# path('api/questions/<int:question_id>/', QuestionDetailView.as_view(), name='question-detail'),
# ... any other URL patterns you might have
