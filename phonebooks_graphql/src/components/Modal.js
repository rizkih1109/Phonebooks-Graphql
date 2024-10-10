import { useDispatch } from 'react-redux'
import { removePhoneAsync } from '../lib/phonebooks/phonebooksSlice'

export default function Modal({ user, setIsModal }) {

    const dispatch = useDispatch()
    const remove = () => {
        dispatch(removePhoneAsync({ id: user._id }))
        setIsModal(false)
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h4 className='modal-title'>Delete Confirmation</h4>
                    <span className="modal-close" onClick={() => setIsModal(false)}>
                        &#10005;
                    </span>
                </div>
                <div className="modal-content">
                    <p>Are you sure to delete this contact?</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-button-no" onClick={() => setIsModal(false)}>No</button>
                    <button className="modal-button-yes" onClick={remove}>Yes</button>
                </div>
            </div>
        </div>
    )
}
