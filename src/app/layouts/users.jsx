import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import EditUser from '../components/page/editUser/editUser'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const currentUserId = useSelector(getCurrentUserId())

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit === 'edit' ? (
                        userId === currentUserId ? (
                            <EditUser userId={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    )
}

export default Users
