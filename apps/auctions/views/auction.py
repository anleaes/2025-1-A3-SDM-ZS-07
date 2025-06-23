from rest_framework import viewsets, permissions
from auctions.models.auction import Auction
from auctions.serializers.auction import AuctionSerializer

class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

    def get_permissions(self):
        #Somente admins podem criar ou editar leilões
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        #Define o criador como o usuário logado e copia o valor inicial para o campo atual
        serializer.save(creator=self.request.user, current_price=self.request.data.get('starting_price'))
