from django.db import models
from django.conf import settings

class Auction(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    
    #Valor inicial e o valor atual do leilão
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    #Usuario que criou o leilão
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    #Data de início e fim do leilão
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    
    #Indica se o leilão está ativo
    is_active = models.BooleanField(default=True)
    
    #Vencedor do leilão
    winner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='won_auctions'
    )
    
    #Flags de status do processo pós-leilão
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} - {self.current_price}"