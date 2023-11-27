from django.db import models

# Create your models here.
class stock(models.Model):
    Stock_Code=models.TextField()
    Start_Date=models.TextField()
    End_Date=models.TextField()
