from rest_framework import serializers
from django.contrib.auth.models import User
from .models import League, Team, Pick

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        
class LeagueSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    players = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = League
        fields = '__all__'
        
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
        
class PickSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    
    class Meta:
        model = Pick
        fields = '__all__'
