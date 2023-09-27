from rest_framework import serializers
from .models import User

class Onboarding_serializer(serializers.Serializer):
    categories = serializers.ListField(max_length=255, required=False)
    subcategories = serializers.ListField(max_length=255, required=False)
    ft_ranking = serializers.IntegerField(min_value=1)
    rr_ranking = serializers.IntegerField(min_value=1)
    ctc_ranking = serializers.IntegerField(min_value=1)
    charities = serializers.ListField(max_length=255)