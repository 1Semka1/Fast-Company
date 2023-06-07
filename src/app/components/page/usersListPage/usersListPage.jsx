import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import _ from 'lodash'
import SearchField from '../../common/searchField'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'
import { useSelector } from 'react-redux'

const UsersListPage = () => {
    const pageSize = 8
    const { users } = useUser()
    const { currentUser } = useAuth()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, search])

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
        // setUsers(newUsers)
        console.log(newUsers)
    }
    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        setSearch('')
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }
    const handleSearch = ({ target }) => {
        setSearch(target.value)
        setSelectedProf()
    }
    function filterUsers(data) {
        const filteredUsers = search
            ? data.filter((user) =>
                  user.name?.toLowerCase().includes(search.toLowerCase())
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : data
        return filteredUsers.filter((user) => user._id !== currentUser._id)
    }
    if (users) {
        const filteredUsers = filterUsers(users)
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        if (!userCrop.length) {
            if (currentPage !== 0) {
                setCurrentPage((prevState) => prevState - 1)
            }
        }

        const clearFilter = () => {
            setSelectedProf()
        }
        return (
            <div className="d-flex justify-content-center">
                {professions && !professionsLoading && (
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

                    <SearchField
                        name={'search'}
                        value={search}
                        onChange={handleSearch}
                    />

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
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

UsersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
}

export default UsersListPage
