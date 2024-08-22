# Create your models here.
from django.db import models

class Language(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Framework(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class FrameworkLanguage(models.Model):
    framework = models.ForeignKey(Framework, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    skeleton_code = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ['framework', 'language']

    @property
    def framework_language(self):
        return f"{self.framework.name}-{self.language.name}"


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    id = models.AutoField(primary_key=True)
    question_name = models.CharField(max_length=1000, default="test")
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)
    framework_languages = models.ManyToManyField(FrameworkLanguage, related_name='questions')
    is_premium = models.BooleanField(default=False)
    EASY = 'Easy'
    MEDIUM = 'Medium'
    HARD = 'Hard'
    DIFFICULTY_CHOICES = [
        (EASY, 'Easy'),
        (MEDIUM, 'Medium'),
        (HARD, 'Hard')
    ]
    difficulty = models.CharField(
        max_length=6,
        choices=DIFFICULTY_CHOICES,
        default=EASY
    )
    solution = models.TextField(blank=True, null=True)
    skeleton_code = models.TextField(null=True, blank=True)


class TestCase(models.Model):
    question = models.ForeignKey(Question, related_name='test_cases', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    input = models.TextField()
    solution = models.TextField()

    # language_id = models.ForeignKey(Language, on_delete=models.CASCADE)
    # framework_id = models.ForeignKey(Framework, on_delete=models.CASCADE)
    # languages = models.ManyToManyField(Language, related_name='questions')
    # status = models.CharField(max_length=1000, default="todo")  # todo, solved, attempted
    # testcase_id = models.ForeignKey(QuestionToSolution, on_delete=models.CASCADE)


