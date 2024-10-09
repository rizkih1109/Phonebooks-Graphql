import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addPhoneAsync } from "../lib/phonebooks/phonebooksSlice"

export default function AddPhone() {

    const [user, SetUser] = useState({ name: '', phone: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cancel = () => navigate('/')
    const submit = (e) => {
        e.preventDefault()
        console.log('user' ,user)
        dispatch(addPhoneAsync(user))
        navigate('/')
    } 

    return (
        <form className="formCon" onSubmit={submit}>
            <input id="name" placeholder="name" onChange={(e) => SetUser({...user, name: e.target.value})} />
            <input id="phone" placeholder="phone" onChange={(e) => SetUser({...user, phone: e.target.value})} />
            <div className="addBtn">
                <button className="add" type="submit">save</button>
                <button className="add" onClick={cancel}>cancel</button>
            </div>
        </form>
    )
}