# Generated by Django 3.2.19 on 2023-10-07 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question_service', '0004_auto_20230930_1640'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='is_premium',
            field=models.BooleanField(default=False),
        ),
    ]
