from django.db import models
from .user import User

class SocialNetwork(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="social_links")
    platform = models.CharField(max_length=50)  # Ex: Instagram, Facebook
    profile_url = models.URLField()

    def __str__(self):
        return f"{self.platform} de {self.user.email}"
    class Meta:
        verbose_name = "Rede Social"
        verbose_name_plural = "Redes Sociais"
