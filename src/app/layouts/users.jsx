import React from 'react'
import { useParams } from 'react-router-dom'
import EditUser from '../components/page/editUser/editUser'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit === 'edit' ? (
                        <EditUser userId={userId} />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    )
}

export default Users
