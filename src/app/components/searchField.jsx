import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ name, type, value, onChange }) => {
    return (
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
        ></input>
    )
}

SearchField.defaultProps = {
    type: 'text'
}

SearchField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
}
export default SearchField
