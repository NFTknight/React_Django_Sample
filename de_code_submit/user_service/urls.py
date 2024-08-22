from user_service.views import CheckAuthenticationView, UserProfileView, UserStatsView,\
    CurrentUserView, RegisterUserView, LoginView, LogOutView
from django.urls import path, include

urlpatterns = [
    path('api/account/login/', LoginView.as_view(), name='account_login'),
    path('api/logout/', LogOutView.as_view(), name='logout'),
    path('api/signup/', RegisterUserView.as_view(), name='account_signup'),
    path('api/check-auth-status/', CheckAuthenticationView.as_view(), name='check-auth-status'),
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),
    path('api/userprofile/', UserProfileView.as_view(), name='user_profile'),
    path('api/userstats/', UserStatsView.as_view(), name='user_stats'),
    # ... any other URL patterns you might have
]

