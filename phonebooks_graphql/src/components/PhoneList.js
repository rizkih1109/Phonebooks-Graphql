import { useDispatch, useSelector } from "react-redux"
import PhoneCard from "./PhoneCard"
import { useEffect, useState } from "react"
import { loadPhoneAsync } from "../lib/phonebooks/phonebooksSlice"
import Modal from "./Modal"

export default function PhoneList({ keyword, sort }) {

    const [isModal, setIsModal] = useState(false)
    const [selectedUser, setSelecterUser] = useState(null)

    const dispatch = useDispatch()
    const { value: phonebooks } = useSelector(state => state.phone)

    useEffect(() => {
        dispatch(loadPhoneAsync({ page: 1, keyword, sort}))
    }, [dispatch, keyword, sort])

    const modal = (user) => {
        setSelecterUser(user)
        setIsModal(true)
    }

    const cards = phonebooks.map((item) => (<PhoneCard key={item._id} user={item} modal={modal} />))

    return (
        <>
            {cards}
            {isModal && <Modal user={selectedUser} setIsModal={setIsModal} />}
        </>
    )
}