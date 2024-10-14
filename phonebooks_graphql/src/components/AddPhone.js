import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ADD_USER, GET_USERS } from "../graphql/gql";
import { useMutation } from "@apollo/client";

export default function AddPhone({ sort, keyword }) {

    const [user, SetUser] = useState({ name: '', phone: '' })
    const navigate = useNavigate()
    const [addPhone, { loading, error }] = useMutation(ADD_USER, {
        refetchQueries: [
            {
                GET_USERS,
                variables: { sort, keyword }
            }
        ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const cancel = () => navigate('/')
    const submit = (e) => {
        e.preventDefault()
        addPhone({
            variables: {
                input: user
            }
        })
        SetUser({ name: '', phone: '' })
        navigate('/')
    }

    return (
        <form className="formCon" onSubmit={submit}>
            <input placeholder="name" onChange={(e) => SetUser({ ...user, name: e.target.value })} />
            <input placeholder="phone" onChange={(e) => SetUser({ ...user, phone: e.target.value })} />
            <div className="addBtn">
                <button type="submit">save</button>
                <button onClick={cancel}>cancel</button>
            </div>
        </form>
    )
}