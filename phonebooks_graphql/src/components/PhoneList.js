import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/gql";
import PhoneCard from "./PhoneCard";
import { useState } from "react";
import Modal from "./Modal";


export default function PhoneList() {

    const [isModal, setIsModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const modal = (user) => {
        setSelectedUser(user)
        setIsModal(true)
    }


    const users = data.getUsers.phonebooks
    const cards = users.map((item) => (<PhoneCard key={item._id} user={item} modal={modal} />))
    
    return (
        <>
            {cards}
            {isModal && <Modal user={selectedUser} setIsModal={setIsModal} />}
        </>
    )
}