import uuid

from django.db import models


class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    balance = models.DecimalField(max_digits=14, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name - self.balance

    class Meta:
        ordering = ['-created_at']


class Transaction(models.Model):
    sender = models.ForeignKey(Account, related_name='sent', on_delete=models.CASCADE, editable=False)
    receiver = models.ForeignKey(Account, related_name='received', on_delete=models.CASCADE, editable=False)
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-created_at']
