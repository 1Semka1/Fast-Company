import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  const renderPhrase = (number) => {
    if (number === 0) {
      return 'Никто с тобой не тусанёт'
    } else {
      return number > 1 && number < 5
        ? number + ' человека тусанут с тобой сегодня'
        : number + ' человек тусанет с тобой сегодня'
    }
  }
  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((qualitie) => (
              <span
                key={qualitie._id}
                className={'badge m-1 bg-' + qualitie.color}
              >
                {qualitie.name}
              </span>
            ))}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate + '/5'}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )
  }
  return (
    <>
      <h2>
        <span
          className={
            users.length === 0 ? 'badge bg-danger' : 'badge bg-primary'
          }
        >
          {renderPhrase(users.length)}
        </span>
      </h2>
      {users.length !== 0 && (
        <table className="table">
          <thead key="thead">
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody key="tbody">{renderUsers()}</tbody>
        </table>
      )}
    </>
  )
}

export default Users
