from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.user.username


class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    questions_solved = models.IntegerField(default=0)
    questions_attempted = models.IntegerField(default=0)
    easy_questions = models.IntegerField(default=0)
    medium_questions = models.IntegerField(default=0)
    hard_questions = models.IntegerField(default=0)
    # store a dictionary here like {"Python": 5, "JavaScript": 10}
    technology_questions = models.JSONField(default=dict)

    def __str__(self):
        return f'{self.user.username} - {self.questions_solved} solved'


@receiver(post_save, sender=User)
def create_user_stats_and_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
        UserStats.objects.create(user=instance)
