import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const renderPhrase = (length) => {
        if (length === 0) {
            return 'Никто с тобой не тусанёт'
        } else {
            return length > 1 && length < 5
                ? length + ' человека тусанут с тобой сегодня'
                : length + ' человек тусанет с тобой сегодня'
        }
    }
    return (
        <>
            <h2>
                <span
                    className={
                        length === 0 ? 'badge bg-danger' : 'badge bg-primary'
                    }
                >
                    {renderPhrase(length)}
                </span>
            </h2>
        </>
    )
}

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
