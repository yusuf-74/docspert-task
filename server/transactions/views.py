from decimal import Decimal

from django.db.transaction import atomic
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from utils.orm_utils import query_optimizer

from .models import Account, Transaction
from .serializers import (
    AccountSerializer,
    TransactionSerializer,
    TransferResponseSerializer,
    TransferSerializer,
)


@extend_schema(tags=['Accounts'])
class AccountListCreate(ListCreateAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        return query_optimizer(Account, self.request)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data['success'] = True
        return response

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)


@extend_schema(tags=['Accounts'])
class AccountRetrieveUpdate(RetrieveUpdateAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        return query_optimizer(Account, self.request)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        response.data['success'] = True
        return response

    def update(self, request, *args, **kwargs):
        if 'balance' in request.data:
            del request.data['balance']
        response = super().update(request, *args, **kwargs)
        response.data['success'] = True
        return response


@extend_schema(tags=['Transactions'])
class TransactionList(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return query_optimizer(Transaction, self.request)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data['success'] = True
        return response


@extend_schema(tags=['Transactions'])
class TransactionRetrieve(RetrieveAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return query_optimizer(Transaction, self.request)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        response.data['success'] = True
        return response


@extend_schema(tags=['Transactions'], request=TransferSerializer, responses=TransferResponseSerializer)
class TransferAPIView(APIView):
    def post(self, request):
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')
        if sender_id == receiver_id:
            return Response(
                {'success': False, 'message': 'Sender and receiver cannot be the same'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        amount = request.data.get('amount')
        try:
            with atomic():
                sender = Account.objects.get(id=sender_id)
                receiver = Account.objects.get(id=receiver_id)

                amount = Decimal(amount)
                if sender.balance < amount:
                    return Response(
                        {'success': False, 'message': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST
                    )

                sender.balance -= amount
                receiver.balance += amount

                Transaction.objects.create(sender=sender, receiver=receiver, amount=amount)

                sender.save()
                receiver.save()
        except Account.DoesNotExist:
            return Response({'success': False, 'message': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'success': False, 'message': 'Invalid value'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'success': False, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'success': True, 'message': 'Transaction successful'}, status=status.HTTP_201_CREATED)
