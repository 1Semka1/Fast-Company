import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, userId, ...rest }) => {
    return (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => rest.onToggleBookMark(userId)}
            >
                <i
                    className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}
                ></i>
            </button>
        </>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
}

export default BookMark
