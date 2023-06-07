import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import EditUser from '../components/page/editUser/editUser'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const { currentUser } = useAuth()
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit === 'edit' ? (
                        userId === currentUser._id ? (
                            <EditUser userId={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
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
