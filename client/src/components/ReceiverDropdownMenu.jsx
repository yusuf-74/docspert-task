import React from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select'
import { useQuery } from '@tanstack/react-query'
import { ACCOUNTS_APIS } from '../apis/apis'


function ReceiverDropdownMenu({ onChange, onBlur, value, validation }) {

    const AccountsQuery = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => await ACCOUNTS_APIS.getAccounts().then(res => res.data),
    })

    let options = []
    if (AccountsQuery.data) {
        options = AccountsQuery.data?.results?.map(account => {
            return {
                value: account.id,
                label: account.name
            }
        })
    }

    if (value != "") {
        value = options.filter(option =>
            option.value === value)
    }

    const customStyles = {
        option: (base) => {
            return {
                ...base,
                backgroundColor: "white",
                '&:hover': {
                    backgroundColor: "#f2f2f2"
                }
            };
        }
    };
    return (
        <div>
            <Label htmlFor="reciever_id">Receiver</Label>
            <Select
                id='receiver_id'
                name='receiver_id'
                onChange={onChange}
                className={`basic-multi-select ${validation.touched.receiver_id && validation.errors.receiver_id ? "invalid" : ""}`}
                classNamePrefix="select"
                onBlur={onBlur}
                value={value}
                styles={customStyles}
                aria-invalid={
                    validation.touched.receiver_id && validation.errors.receiver_id ? true : false
                }
                options={options}
            />
            {validation.touched.receiver_id && validation.errors.receiver_id ? (
                <div className="error-message">{validation.errors.receiver_id}</div>
            ) : null}
        </div>
    )
}

export default ReceiverDropdownMenu