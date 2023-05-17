import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professonService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    const getProfessionsList = async () => {
        try {
            const { content } = await professonService.get()
            setProfessions(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    const getProfession = (id) => {
        return professions.find((prof) => prof._id === id)
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
