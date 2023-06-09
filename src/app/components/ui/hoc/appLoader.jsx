import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from '../../../store/users'
import { useEffect } from 'react'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const isLoggetIn = useSelector(getIsLoggedIn())
    const usersStatusLoading = useSelector(getUsersLoadingStatus())

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
        if (isLoggetIn) {
            dispatch(loadUsersList())
        }
    }, [isLoggetIn])

    if (usersStatusLoading) return 'Loading...'

    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppLoader
