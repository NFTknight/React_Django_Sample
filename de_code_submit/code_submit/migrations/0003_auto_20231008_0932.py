# Generated by Django 3.2.19 on 2023-10-08 09:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('code_submit', '0002_codesubmission_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userstats',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
        migrations.DeleteModel(
            name='UserStats',
        ),
    ]
