import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities()

    if (!isLoading) {
        return (
            <>
                {qualities.map((id) => (
                    <Qualitie key={id} {...getQuality(id)} />
                ))}
            </>
        )
    } else {
        return 'Loading...'
    }
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
