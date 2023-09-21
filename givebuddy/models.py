from django.db import models

# User Model
class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    categories = models.CharField(max_length=255)
    subcategories = models.CharField(max_length=255)
    ft_ranking = models.PositiveIntegerField()
    rr_ranking = models.PositiveIntegerField()
    ctc_ranking = models.PositiveIntegerField()
    
