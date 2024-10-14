import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_USERS } from "../graphql/gql";

export default function Modal({ user, setIsModal }) {

    const [deletePhone, { loading, error }] = useMutation(DELETE_USER, {
        refetchQueries: [
            GET_USERS
        ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const remove = () => {
        deletePhone({ variables: { id: user._id } })
        setIsModal(false)
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h4>Delete Confirmation</h4>
                    <span onClick={() => setIsModal(false)}>
                        &#10005;
                    </span>
                </div>
                <div className="modal-content">
                    <p>Are you sure to delete this contact?</p>
                </div>
                <div className="modal-footer">
                    <button onClick={() => setIsModal(false)}>No</button>
                    <button onClick={remove}>Yes</button>
                </div>
            </div>
        </div>
    )
}
