import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    })
    const history = useHistory()
    const handleShowAllUsers = () => {
        history.push('/users')
    }
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Встретился, раз: {user.completedMeetings}</p>
                <h2>Оценка: {user.rate}</h2>
                <button onClick={handleShowAllUsers}>Все пользователи</button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
