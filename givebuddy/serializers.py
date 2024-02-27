from rest_framework import serializers
from .models import User

class Onboarding_serializer(serializers.Serializer):
    categories = serializers.ListField(max_length=255, required=False)
    subcategories = serializers.ListField(max_length=255, required=False)
    ft_ranking = serializers.IntegerField(min_value=1)
    rr_ranking = serializers.IntegerField(min_value=1)
    ctc_ranking = serializers.IntegerField(min_value=1)

class Updated_donated_charities_serializer(serializers.Serializer):
    donated_charity_id = serializers.IntegerField(min_value=1)
    donated_amount = serializers.IntegerField(min_value=1, required=False)

class User_serializer(serializers.Serializer):
    user_uid = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    user_province = serializers.CharField(max_length=255, required=False)
    user_city = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField()

class Saved_charities_serializer(serializers.Serializer):
    saved_charity = serializers.IntegerField(min_value=1)