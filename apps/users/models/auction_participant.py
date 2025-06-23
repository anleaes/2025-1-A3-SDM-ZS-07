from django.db import models
from django.utils import timezone
from .user import User

class AuctionParticipant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="participants")
    auction = models.ForeignKey("auctions.Auction", on_delete=models.CASCADE)
    joined_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.email} - {self.auction}"
