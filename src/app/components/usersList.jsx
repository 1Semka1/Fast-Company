import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './usersTable'
import _ from 'lodash'
import SearchField from './searchField'

const UsersList = () => {
    const pageSize = 8
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

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
    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        //  Здесь я очищаю строку поиска при выборе фильтра
        setSearch('')
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }
    const handleSearch = ({ target }) => {
        //  Метод для создания контролируемого компонента. Так же очищаю фильтрацию при вводе
        setSearch(target.value)
        setSelectedProf()
    }
    const handleSubmit = (e) => {
        //  Отменяю поведение по умолчанию
        e.preventDefault()
    }
    if (users) {
        const foundUsers = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        ) // Ищу совпадения по пользвателям из строки

        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : foundUsers // Если отсутствует фильт, в filteredUsers я помещаю всех найденных пользователей

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }
        return (
            <div className="d-flex justify-content-center">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    <form onSubmit={handleSubmit}>
                        <SearchField
                            name={'search'}
                            value={search}
                            onChange={handleSearch}
                        />
                    </form>

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
}

export default UsersList
