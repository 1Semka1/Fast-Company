import React from 'react'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ user }) => {
    const history = useHistory()
    const handleAllUsers = () => {
        history.push('/users')
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <h6>Встретился раз: {user.completedMeetings}</h6>
            <h1>Оценка: {user.rate}</h1>
            <button onClick={handleAllUsers}>Все пользователи</button>
        </div>
    )
}

UserPage.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserPage
