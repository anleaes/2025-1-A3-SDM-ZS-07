from rest_framework import serializers
from apps.auctions.models.bid import Bid

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'
        read_only_fields = ['user', 'timestamp']
