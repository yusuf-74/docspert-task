import pytest
from django.test import Client
from django.urls import reverse
from rest_framework import status

from transactions.models import Account, Transaction


@pytest.mark.django_db
def test_account_list_create():
    client = Client()
    url = reverse('account-list-create')

    data = {'name': 'Test Account', 'balance': 1000}
    response = client.post(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()['success'] is True

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['success'] is True
    assert len(response.json()['results']) > 0


@pytest.mark.django_db
def test_account_retrieve_update():
    client = Client()
    account = Account.objects.create(name='Test Account', balance=1000)
    url = reverse('account-retrieve-update', kwargs={'pk': account.id})

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['success'] is True

    data = {'name': 'Test'}
    response = client.patch(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['success'] is True
    assert Account.objects.get(id=account.id).name == 'Test'


@pytest.mark.django_db
def test_transaction_list():
    client = Client()
    url = reverse('transaction-list')

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['success'] is True
    assert len(response.json()['results']) >= 0


@pytest.mark.django_db
def test_transaction_retrieve():
    client = Client()
    account1 = Account.objects.create(name='Sender', balance=1000)
    account2 = Account.objects.create(name='Receiver', balance=500)
    transaction = Transaction.objects.create(sender=account1, receiver=account2, amount=100)
    url = reverse('transaction-retrieve', kwargs={'pk': transaction.id})

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['success'] is True


@pytest.mark.django_db
def test_transfer():
    client = Client()
    sender = Account.objects.create(name='Sender', balance=1000)
    receiver = Account.objects.create(name='Receiver', balance=500)
    url = reverse('transfare')

    data = {'sender_id': sender.id, 'receiver_id': receiver.id, 'amount': 200}
    response = client.post(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()['success'] is True
    assert Account.objects.get(id=sender.id).balance == 800
    assert Account.objects.get(id=receiver.id).balance == 700

    data = {'sender_id': sender.id, 'receiver_id': receiver.id, 'amount': 1000}
    response = client.post(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()['success'] is False
    assert response.json()['message'] == 'Insufficient balance'

    data = {'sender_id': sender.id, 'receiver_id': sender.id, 'amount': 100}
    response = client.post(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()['success'] is False
    assert response.json()['message'] == 'Sender and receiver cannot be the same'

    data = {'sender_id': 99999, 'receiver_id': receiver.id, 'amount': 100}
    response = client.post(url, data, content_type='application/json')
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()['success'] is False
    assert response.json()['message'] == 'Account not found'
