# Generated by Django 5.1.2 on 2024-10-22 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_registered_users_test'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Hrid', models.CharField(max_length=100)),
                ('FullName', models.CharField(max_length=100)),
                ('LocationDesc', models.CharField(max_length=100)),
                ('time_in', models.DateTimeField()),
                ('time_out', models.DateTimeField(null=True)),
            ],
        ),
    ]