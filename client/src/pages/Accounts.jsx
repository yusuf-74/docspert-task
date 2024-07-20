import React, { useEffect, useState } from 'react'
import TableContainer from '../components/TableContainer'
import { dateTimeFormatter } from '../utils/formatters'
import MutateAccountModal from './MutateAccountModal'
import TransfareModal from './TransferModal'
import { ACCOUNTS_APIS } from '../apis/apis'
import { useQuery } from '@tanstack/react-query';


const Accounts = () => {
    const [fetchedData, setFetchedData] = useState([])
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [transferModal, setTransferModal] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(null)

    const AccountsQuery = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => await ACCOUNTS_APIS.getAccounts().then(res => res.data),
    })

    const columns = [
        {
            Header: 'Account ID',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Balance',
            accessor: 'balance'
        },
        {
            Header: 'Created At',
            accessor: 'created_at'
        },
        {
            Header: 'Updated At',
            accessor: 'updated_at'
        },
        {
            Header: 'Actions',
            accessor: 'actions'
        }
    ]

    const data = AccountsQuery?.data?.results?.map(item => {
        return {
            ...item,
            created_at: dateTimeFormatter(item.created_at),
            updated_at: dateTimeFormatter(item.updated_at),
            actions: (
                <div key={item.id} className='d-flex justify-content-center align-items-center'>
                    {/* <button
                        className="btn btn-warning btn-sm m-2"
                        onClick={() => {
                            setSelectedAccount(item)
                            setEditModal(true)
                        }}
                    >
                        Edit
                    </button> */}
                    <button
                        className="btn btn-success btn-sm m-2"
                        onClick={() => {
                            setSelectedAccount(item)
                            setTransferModal(true)
                        }}
                    >
                        Transfer
                    </button>
                </div>
            )
    }}) || []

    return (
        <div>
            <TransfareModal modal_center={transferModal} tog_center={() => setTransferModal(!transferModal)} sender_id = {selectedAccount?.id} />
            <MutateAccountModal modal_center={createModal} tog_center={() => setCreateModal(!createModal)} />
            <MutateAccountModal modal_center={editModal} tog_center={() => setEditModal(!editModal)} account={selectedAccount} />
            <TableContainer
                columns={columns}
                data={data}
                isAddOptions={true}
                customPageSize={20}
                className="custom-header-css"
                isSortOptions={true}
                isAddEntity={true}
                entityName="Account"
                handleAddClick={() => {
                    setSelectedAccount(null)
                    setCreateModal(true)
                }}
            />
        </div>
    )
}

export default Accounts