import React from 'react'
import { Form, Row, Label, Input, FormFeedback } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const SingleAccountForm = ({account = null, createAccounts, updateAccount}) => {
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: account?.name || "",
            balance: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (account) {
                updateAccount(account.id, values)
            }
            else {
                createAccounts([values])
            }
            resetForm();
        },
    })
    return (
            <Form
                onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                }}
            >
                <Row>
                    <div className="mb-3">
                        <Label htmlFor="formrow-accountname-Input">Account Holder Name</Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="formrow-accountname-Input"
                            placeholder="Enter Account Name"
                            name="name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={
                                validation.touched.name &&
                                    validation.errors.name
                                    ? true
                                    : false
                            }
                        />
                        {validation.touched.name &&
                            validation.errors.name ? (
                            <FormFeedback type="invalid">
                                {validation.errors.name}
                            </FormFeedback>
                        ) : null}
                    </div>
                </Row>
                {!account && <Row>
                    <div className="mb-3">
                        <Label htmlFor="formrow-accountbalance-Input">Initial Balance</Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="formrow-accountbalance-Input"
                            placeholder="Enter Initial Balance"
                            name="balance"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.balance || ""}
                            invalid={
                                validation.touched.balance &&
                                    validation.errors.balance
                                    ? true
                                    : false
                            }
                        />
                        {validation.touched.balance &&
                            validation.errors.balance ? (
                            <FormFeedback type="invalid">
                                {validation.errors.balance}
                            </FormFeedback>
                        ) : null}
                    </div>
                </Row>}
                <div>
                    <button
                        type="submit"
                        className="btn btn-success w-md"
                    >
                        Submit
                    </button>
                </div>
            </Form>
    )
}

export default SingleAccountForm