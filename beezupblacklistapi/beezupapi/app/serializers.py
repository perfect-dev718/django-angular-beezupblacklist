from rest_framework import serializers
from .models import BlackListProducts

class BlackListSerializer(serializers.Serializer):

    class Meta:
        model = BlackListProducts
        fields = ("asin", "ean", "marketplace")