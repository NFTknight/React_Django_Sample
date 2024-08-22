# Generated by Django 3.2.19 on 2023-09-30 09:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Framework',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionToSolution',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('input_testcase', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('solution_testcase', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('question_name', models.CharField(default='test', max_length=1000)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('difficulty', models.CharField(default='easy', max_length=1000)),
                ('status', models.CharField(default='todo', max_length=1000)),
                ('tags', models.CharField(default='windows, string', max_length=1000)),
                ('framework_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_service.framework')),
                ('language_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_service.language')),
                ('testcase_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_service.questiontosolution')),
            ],
        ),
    ]
