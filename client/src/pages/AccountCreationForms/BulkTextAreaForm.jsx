import React from 'react'
import { useFormik } from 'formik'
import { Form, Row, Label, Input, FormFeedback } from 'reactstrap'
import * as Yup from 'yup'

const BulkTextAreaForm = ({createAccounts}) => {
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            accounts: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const accounts = values.accounts.split("\n").map(account => {
                const [name, balance] = account.split(",")
                return { name, balance }
            })
            createAccounts(accounts)
            resetForm()
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
                        <Label htmlFor="formrow-accounts-Input">Accounts Data</Label>
                        <Input
                            type="textarea"
                            className="form-control"
                            id="formrow-accounts-Input"
                            placeholder="Enter Accounts Data comma separated like: name,balance"
                            name="accounts"
                            rows={5}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.accounts || ""}
                            invalid={
                                validation.touched.accounts &&
                                    validation.errors.accounts
                                    ? true
                                    : false
                            }
                        />
                        {validation.touched.accounts &&
                            validation.errors.accounts ? (
                            <FormFeedback type="invalid">
                                {validation.errors.accounts}
                            </FormFeedback>
                        ) : null}
                    </div>
                </Row>
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

export default BulkTextAreaForm