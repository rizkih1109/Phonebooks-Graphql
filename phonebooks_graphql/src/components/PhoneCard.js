import { useMutation } from '@apollo/client'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { GET_USERS, UPDATE_USER } from '../graphql/gql'

export default function PhoneCard({ user, modal}) {

    const [isEdit, setIsEdit] = useState(false)
    const [newUser, setNewUser] = useState({ name: user.name, phone: user.phone })

    const [updatePhone, { loading, error }] = useMutation(UPDATE_USER, {
        refetchQueries: [
            GET_USERS
        ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const submit = (e) => {
        e.preventDefault()
        updatePhone({
            variables: {
                id: user._id,
                input: newUser
            }
        })
        setIsEdit(false)
    }

    if (isEdit) {
        return (
            <div className="card">
                <div>
                    <img
                        src={user.avatar === null ? '/Defaultavatar.png' : `http://localhost:3000/images/${user.avatar}`}
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
                        src={user.avatar === null ? '/Defaultavatar.png' : `http://localhost:3000/images/${user.avatar}`}
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
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => modal(user)} />
                    </div>
                </div>
            </div>
        )
    }

}