import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'
import PropTypes from 'prop-types'

const User = (props) => {
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>
                {props.qualities.map((item) => (
                    <Qualitie key={item._id} {...item} />
                ))}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate + '/5'}</td>
            <td>
                <BookMark status={props.bookmark} {...props} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => props.onDelete(props._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default User
