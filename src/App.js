import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import API from './api'

function App() {
  const [users, setUsers] = useState(API.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    const newUsers = users.map((item) => {
      if (item._id === id)
        return {
          ...item,
          bookmark: !item.bookmark,
        }
      return item
    })
    setUsers(newUsers)
  }
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </div>
  )
}

export default App
