import React from 'react'
import { Form, Row, Label, Input } from 'reactstrap'
import csvLikeReader from '../../utils/csvLikeReader'
import { useFormik } from 'formik'


const FileUploadForm = ({createAccounts}) => {
    const handleFileChange = e => {
        if (e.target.files.length > 0) {
            csvLikeReader(e.target.files[0], validation)
        }
        else {
            csvLikeReader(null, validation)
        }
    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            accounts: [],
        },
        onSubmit: async (values, { resetForm }) => {
            createAccounts(values.accounts)
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
                        <Label htmlFor="formrow-accountsfile-Input">Upload File</Label>
                        <Input
                            type="file"
                            className="form-control"
                            id="formrow-accountsfile-Input"
                            name="accounts"
                            onChange={e => {
                                handleFileChange(e)
                            }}
                            invalid={
                                validation.touched.accounts &&
                                    validation.errors.accounts
                                    ? true
                                    : false
                            }
                        />
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

export default FileUploadForm