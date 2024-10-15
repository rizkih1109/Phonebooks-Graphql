import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/gql";
import PhoneCard from "./PhoneCard";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function PhoneList({ keyword, sort }) {

    const [isModal, setIsModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)

    const [getData, { loading, error, data, refetch, fetchMore }] = useLazyQuery(GET_USERS, {
        variables: { page, keyword, sort, limit: 30 },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        setPage(1)
        getData({ variables: { page: 1, sort, keyword } })
            .then(({ data }) => setPages(data.getUsers.pages))
    }, [getData, sort, keyword])

    useEffect(() => {
        const handleScroll = () => {
            if (page > pages) return
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setPage((prevPage => page + 1))
                fetchMore({
                    variables: { page: page + 1, sort, keyword },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        return {
                            ...prev,
                            getUsers: {
                                ...prev.getUsers,
                                phonebooks: [...prev.getUsers.phonebooks, ...fetchMoreResult.getUsers.phonebooks
                                ]
                            }
                        }
                    }
                })
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [page, pages, keyword, sort, fetchMore])

    const modal = (user) => {
        setSelectedUser(user)
        setIsModal(true)
    }

    if (loading && !data) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const cards = data?.getUsers?.phonebooks.map((item, index) => (<PhoneCard key={item._id} user={item} modal={modal} refetch={refetch} />))

    return (
        <>
            {cards}
            {isModal && <Modal user={selectedUser} setIsModal={setIsModal} />}
        </>
    )
}