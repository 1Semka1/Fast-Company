import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    return (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => rest.onToggleBookMark(rest._id)}
            >
                <i
                    className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}
                ></i>
            </button>
        </>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
}

export default BookMark
