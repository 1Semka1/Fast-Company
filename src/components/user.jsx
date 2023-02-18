import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'

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
        <BookMark key={props._id} status={props.bookmark} {...props} />
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

export default User
