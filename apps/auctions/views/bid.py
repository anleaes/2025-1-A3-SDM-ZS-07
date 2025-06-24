from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from apps.auctions.models.bid import Bid
from apps.auctions.models.auction import Auction
from apps.auctions.serializers.bid import BidSerializer
from decimal import Decimal
from django.utils import timezone

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        auction = Auction.objects.get(id=self.request.data.get("auction"))
        amount = Decimal(self.request.data.get("amount"))

        # Validações:
        if not auction.is_active or timezone.now() > auction.end_time:
            raise ValidationError("Leilão encerrado.")

        if amount <= auction.current_price:
            raise ValidationError("O valor deve ser maior que o lance atual.")

        # Atualiza o leilão com novo maior lance
        auction.current_price = amount
        auction.winner = self.request.user
        auction.save()

        # Salva o lance
        serializer.save(user=self.request.user, auction=auction)
