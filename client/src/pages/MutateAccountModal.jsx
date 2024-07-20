import React, { useEffect } from 'react'
import { Modal } from 'reactstrap'
import SingleAccountForm from './AccountCreationForms/SingleAccountForm'
import FileUploadForm from './AccountCreationForms/FileUploadForm'
import BulkTextAreaForm from './AccountCreationForms/BulkTextAreaForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ACCOUNTS_APIS } from '../apis/apis'
import { toast } from 'react-toastify'
function MutateAccountModal({ modal_center, tog_center, account = null }) {
    const [activeTab, setActiveTab] = React.useState(1)

    const queryClient = useQueryClient()

    useEffect(() => {
        setActiveTab(1)
    }, [modal_center])

    const AccountsCreateMutation = useMutation({
        mutationKey: 'createAccount',
        mutationFn: async (accounts) => await ACCOUNTS_APIS.createAccounts(accounts),
        onSuccess: () => {
            toast.success('Account Created Successfully')
            queryClient.invalidateQueries('accounts')
            tog_center()
        },
        onError: () => {
            toast.error('Error Creating Account')
        }
    })

    const AccountsUpdateMutation = useMutation({
        mutationKey: 'updateAccount',
        mutationFn: async (id, account) => await ACCOUNTS_APIS.updateAccount(id, account),
        onSuccess: () => {
            toast.success('Account Updated Successfully')
            queryClient.invalidateQueries('accounts')
            tog_center()
        },
        onError: () => {
            toast.error('Error Updating Account')
        }
    })


    return (
        <Modal
            isOpen={modal_center}
            toggle={() => {
                tog_center()
            }}
            centered
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">Add New Account</h5>
                <button
                    type="button"
                    onClick={() => {
                        tog_center()
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {!account && <div className='d-flex justify-content-around mb-5'>
                    <div onClick={() => {
                        setActiveTab(1)
                    }}
                    className={`btn${activeTab === 1 ? ' btn-primary' : ''}`}
                    >
                        Single Account
                    </div>
                    <div onClick={() => {
                        setActiveTab(2)
                    }}
                    className={`btn${activeTab === 2 ? ' btn-primary' : ''}`}
                    >
                        File Upload
                    </div>
                    <div onClick={() => {
                        setActiveTab(3)
                    }
                    }
                    className={`btn${activeTab === 3 ? ' btn-primary' : ''}`}
                    >
                        Bulk Text Area
                    </div>
                </div>}
                {activeTab === 1 && <SingleAccountForm account={account} createAccounts={AccountsCreateMutation.mutate} updateAccount={AccountsUpdateMutation.mutate} />}
                {activeTab === 2 && <FileUploadForm createAccounts={AccountsCreateMutation.mutate} />}
                {activeTab === 3 && <BulkTextAreaForm createAccounts={AccountsCreateMutation.mutate} />}
            </div>
        </Modal>
    )
}

export default MutateAccountModal