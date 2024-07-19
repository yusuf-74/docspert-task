from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers

from .models import Account, Transaction


class AccountSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        expandable_fields = {
            'sent': (
                'transactions.serializers.TransactionSerializer',
                {'many': True, 'expand': ['receiver'], 'fields': ['id', 'amount', 'receiver.id', 'receiver.name']},
            ),
            'received': (
                'transactions.serializers.TransactionSerializer',
                {'many': True, 'expand': ['sender'], 'fields': ['id', 'amount', 'sender.id', 'sender.name']},
            ),
        }


class TransactionSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['id', 'sender', 'receiver', 'created_at', 'updated_at']
        expandable_fields = {
            'sender': ('transactions.serializers.AccountSerializer', {'many': False, 'fields': ['id', 'name']}),
            'receiver': ('transactions.serializers.AccountSerializer', {'many': False, 'fields': ['id', 'name']}),
        }


# DOCUMENTATION SERIALIZERS
class TransfareSerializer(serializers.Serializer):
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=14, decimal_places=2)


class TransfareResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField()
