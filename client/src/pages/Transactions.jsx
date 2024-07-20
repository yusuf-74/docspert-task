import React, { useEffect, useState } from 'react'
import TableContainer from '../components/TableContainer'
import { useQuery } from '@tanstack/react-query'
import { TRANSACTIONS_APIS } from '../apis/apis'

const Transactions = () => {
  const TransactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => await TRANSACTIONS_APIS.getTransactions().then(res => res.data),
  })
  const columns = [
    {
      Header: 'Transaction ID',
      accessor: 'id'
    },
    {
      Header: 'Sender ID',
      accessor: 'sender_id'
    },
    {
      Header: 'Sender Name',
      accessor: 'sender_name'
    },
    {
      Header: 'Receiver ID',
      accessor: 'receiver_id'
    },
    {
      Header: 'Receiver Name',
      accessor: 'receiver_name'
    },
    {
      Header: 'Amount',
      accessor: 'amount'
    },
    {
      Header: 'Created At',
      accessor: 'created_at'
    },
    {
      Header: 'Updated At',
      accessor: 'updated_at'
    }
  ]

  const data = TransactionsQuery.data?.results?.map(item => {
    return {
      id: item.id,
      sender_id: item?.sender?.id,
      sender_name: item?.sender?.name,
      receiver_id: item?.receiver?.id,
      receiver_name: item?.receiver?.name,
      amount: item.amount,
      created_at: item.created_at,
      updated_at: item.updated_at
    }
  }) || []

  return (
    <div>
      <TableContainer
        columns={columns}
        data={data}
        isAddOptions={true}
        customPageSize={20}
        className="custom-header-css"
        isSortOptions={true}
      />

    </div>
  )
}

export default Transactions