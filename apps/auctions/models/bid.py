from django.db import models
from django.conf import settings
from .auction import Auction

class Bid(models.Model):
    # Leilão em que o lance foi dado
    auction = models.ForeignKey(Auction, related_name="bids", on_delete=models.CASCADE)

    # Usuário que deu o lance
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Valor do lance
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Data e hora do lance
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - R$ {self.amount} em {self.auction.title}"
