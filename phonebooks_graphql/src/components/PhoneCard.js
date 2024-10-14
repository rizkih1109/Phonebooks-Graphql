import { useMutation } from '@apollo/client'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { GET_USERS, UPDATE_USER } from '../graphql/gql'
import axios from 'axios'

export default function PhoneCard({ user, modal, refetch }) {

    const [isEdit, setIsEdit] = useState(false)
    const [newUser, setNewUser] = useState({ name: user.name, phone: user.phone })
    const fileInputRef = useRef(null)

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

    const handleImage = async (e) => {
        if (e.target.files || e.target.files.length > 0) {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('avatar', file)
            try {
                await axios.put(`http://localhost:3000/${user._id}/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                refetch()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const clickImage = () => {
        fileInputRef.current.click()
    }

    return (
        <div className="card">
            <div>
                <img
                    src={user.avatar === null ? '/Defaultavatar.png' : `http://localhost:3000/images/${user.avatar}`}
                    alt='no source'
                    onClick={clickImage}
                />
                <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImage} />
            </div>
            {isEdit ? (
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
            ) : (
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
            )}
        </div>
    )
}