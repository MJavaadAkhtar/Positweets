# Generated by Django 3.0.6 on 2020-05-11 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogspost', '0003_auto_20200510_0953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
