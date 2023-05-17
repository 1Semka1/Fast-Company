import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualityContext = React.createContext()

export const useQualities = () => {
    return useContext(QualityContext)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    const getQualitiesList = async () => {
        try {
            const { content } = await qualityService.get()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    const getQuality = (id) => {
        return qualities.find((qual) => qual._id === id)
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
