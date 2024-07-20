import React from 'react'
import { Modal, Form, Row, Label, Input, FormFeedback } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReceiverDropdownMenu from '../components/ReceiverDropdownMenu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TRANSACTIONS_APIS } from '../apis/apis'
import { toast } from 'react-toastify'

function TransfareModal({ modal_center, tog_center, sender_id }) {

    const queryClient = useQueryClient()

    const TransferMutation = useMutation({
        mutationKey: ['transferMoney'],
        mutationFn: async (values) => await TRANSACTIONS_APIS.transferMoney(values),
        onSuccess: () => {
            toast.success('Money Transfered Successfully')
            queryClient.invalidateQueries('transactions')
            queryClient.invalidateQueries('accounts')
            validation.resetForm()
            tog_center()
        },
        onError: (e) => {
            toast.error(e?.response?.data?.message)
        }
    })

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            sender_id: sender_id,
            receiver_id: "",
            amount: "",
        },
        validationSchema: Yup.object({
            sender_id: Yup.string().required("Sender ID is required"),
            receiver_id: Yup.string().required("Receiver ID is required"),
            amount: Yup.number().required("Amount is required"),
        }),
        onSubmit: async (values) => {
            TransferMutation.mutate(values)
        },
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
                <h5 className="modal-title mt-0">Transfer Money</h5>
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
                <Form
                    onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                    }}
                >
                    <Row>

                        <div className="mb-3">
                            <Label htmlFor="formrow-sendername-Input">Sender</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="formrow-sendername-Input"
                                placeholder="Enter Sender ID"
                                name="sender_id"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.sender_id || ""}
                                invalid={
                                    validation.touched.sender_id &&
                                        validation.errors.sender_id
                                        ? true
                                        : false
                                }
                                disabled={true}
                            />
                            {validation.touched.sender_id &&
                                validation.errors.sender_id ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.sender_id}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Row>
                    <Row>
                        <ReceiverDropdownMenu
                            onChange={selectedOption => {
                                return validation.setFieldValue("receiver_id", selectedOption.value)
                            }}
                            onBlur={validation.handleBlur}
                            value={validation.values.receiver_id || ""}
                            validation={validation}
                        />
                    </Row>
                    <Row>
                        <div className="mb-3">
                            <Label htmlFor="formrow-amount-Input">Amount</Label>
                            <Input
                                type="decimal"
                                className="form-control"
                                id="formrow-amount-Input"
                                placeholder="Enter Amount"
                                name="amount"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.amount || ""}
                                invalid={
                                    validation.touched.amount &&
                                        validation.errors.amount
                                        ? true
                                        : false
                                }
                            />
                            {validation.touched.amount &&
                                validation.errors.amount ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.amount}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Row>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-md"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default TransfareModal