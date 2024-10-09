import { useDispatch, useSelector } from "react-redux"
import PhoneCard from "./PhoneCard"
import { useEffect } from "react"
import { loadPhoneAsync } from "../lib/phonebooks/phonebooksSlice"

export default function PhoneList() {

    const dispatch = useDispatch()
    const {value: phonebooks} = useSelector(state => state.phone)

    useEffect(() => {
        dispatch(loadPhoneAsync({ page: 1 }))
    }, [dispatch])
    
    const cards = phonebooks.map((item) => (<PhoneCard key={item._id} user={item} />))

    return (
        <>
            {cards}
        </>
    )
}