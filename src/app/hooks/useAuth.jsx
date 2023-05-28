import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService, {
    setTokens
} from '../services/localStorage.service'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvide = ({ children }) => {
    const history = useHistory()

    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует '
                    }
                    throw errorObject
                }
            }
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                'accounts:signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error

            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Email введён некорректно'
                    }
                    throw errorObject
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Пароль введён некорректно'
                    }
                    throw errorObject
                }
            }
        }
    }

    function logOut() {
        localStorageService.removeAuthData()
        setUser(null)
        history.push('/')
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function getUserData() {
        try {
            if (localStorageService.getAccessToken()) {
                const { content } = await userService.getCurrentUser()
                setUser(content)
            }
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    async function updateUser(data) {
        try {
            const { content } = await userService.update(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <AuthContext.Provider
            value={{ currentUser, signUp, signIn, logOut, updateUser }}
        >
            {!isLoading ? children : 'Loading...'}
        </AuthContext.Provider>
    )
}

AuthProvide.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvide
