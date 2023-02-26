import React, { useState, useEffect } from 'react'
import Users from './components/users'
import API from './api'

function App() {
    const [users, setUsers] = useState()
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data))
    }, [])
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        const newUsers = users.map((item) => {
            if (item._id === id) {
                return {
                    ...item,
                    bookmark: !item.bookmark
                }
            }
            return item
        })
        setUsers(newUsers)
    }
    return (
        <div>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </div>
    )
}

export default App
