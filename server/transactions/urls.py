from django.urls import path

from .views import (
    AccountListCreate,
    AccountRetrieveUpdate,
    TransactionList,
    TransactionRetrieve,
    TransfareAPIView,
)

urlpatterns = [
    path('accounts/', AccountListCreate.as_view(), name='account-list-create'),
    path('accounts/<uuid:pk>/', AccountRetrieveUpdate.as_view(), name='account-retrieve-update'),
    path('transactions/', TransactionList.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionRetrieve.as_view(), name='transaction-retrieve'),
    path('transfare/', TransfareAPIView.as_view(), name='transfare'),
]
