import React, { useState } from 'react'
import Users from './app/components/users'
import API from './app/api'

function App() {
    const [users, setUsers] = useState(API.users.fetchAll())
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
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    )
}

export default App
