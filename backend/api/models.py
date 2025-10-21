from django.db import models
from django.contrib.auth.models import User

class League(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_leagues")
    players = models.ManyToManyField(User, related_name="leagues")
    draft_order = models.JSONField(default=list)
    is_draft_complete = models.BooleanField(default=False)
    
    def __str__(self): 
        return self.name
    
class Team(models.Model):
    team_number = models.IntegerField(unique=True)
    team_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.team_number} - {self.team_name}"
    
class Pick(models.Model):
    PICK_TYPES = [
        ("regular", "Regular"),
        ("sleeper", "Sleeper"),
    ]
    
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    pick_type = models.CharField(max_length=10, choices=PICK_TYPES)
    order_number = models.IntegerField()
    
    def __str__(self):
        return f"{self.player.username} -> {self.team.__str__()} ({self.pick_type})"
