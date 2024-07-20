import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ACCOUNTS_APIS = {
    getAccounts: async (page='*', pageSize) => await axiosInstance.get(`/accounts/`, { params: { page, pageSize } }),
    createAccounts: async (accounts) => await axiosInstance.post(`/accounts/`, accounts),
    getDetailAccount: async (id) => await axiosInstance.get(`/accounts/${id}/`, { params: { 
        expand: 'sent,received'
    } }),
    updateAccount: async (id, account) => await axiosInstance.put(`/accounts/${id}/`, account),
}

const TRANSACTIONS_APIS = {
    getTransactions: async (page='*', pageSize, filters) => await axiosInstance.get(`/transactions/`, { params: { page, pageSize, ...filters,
        expand: 'sender,receiver'
     } }),
    transferMoney: async (data) => await axiosInstance.post(`/transfer/`, data),
}

export { ACCOUNTS_APIS, TRANSACTIONS_APIS };