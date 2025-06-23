from rest_framework import serializers
from auctions.models.auction import Auction

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = '__all__'
        read_only_fields = ['creator', 'current_price', 'winner', 'is_active', 'is_paid', 'is_delivered']
