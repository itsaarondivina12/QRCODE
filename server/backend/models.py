from django.db import models

# Create your models here.
from django.db import models

class Registered_Users(models.Model):
    Hrid = models.CharField(max_length=100, null=False)
    FullName = models.CharField(max_length=100, null=False)
    LocationDesc = models.CharField(max_length=100, null=False)
    Team = models.CharField(max_length=100, null=False)
    DateRegistered = models.DateTimeField(null=False)

    def __str__(self):
        return self.FullName

