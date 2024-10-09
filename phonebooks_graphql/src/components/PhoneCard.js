import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removePhoneAsync, updatePhoneAsync } from '../lib/phonebooks/phonebooksSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function PhoneCard({ user }) {

    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [newUser, setNewUser] = useState({ name: user.name, phone: user.phone })

    const submit = (e) => {
        e.preventDefault()
        dispatch(updatePhoneAsync({ id: user._id, ...newUser }))
        setIsEdit(false)
    }

    if (isEdit) {
        return (
            <div className="card">
                <div>
                    <img
                        src='/Defaultavatar.png'
                        alt='no source'
                    />
                    <input type="file" style={{ display: 'none' }} />
                </div>
                <form className="listData" onSubmit={submit}>
                    <div >
                        <input id='edit' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                        <input id='edit' value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                    </div>
                    <div className="saveBtn">
                        <button type="submit" className="fixSaveBtn">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div>
                    <img
                        src='/Defaultavatar.png'
                        alt='no source'
                    />
                    <input type="file" style={{ display: 'none' }} />
                </div>
                <div className="listData">
                    <div >
                        <p>{user.name}</p>
                        <p >{user.phone}</p>
                    </div>
                    <div className="listBtn">
                        <FontAwesomeIcon icon={faPenToSquare} className='btn' onClick={() => setIsEdit(true)} />
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removePhoneAsync({ id: user._id }))} />
                    </div>
                </div>
            </div>
        )
    }

}