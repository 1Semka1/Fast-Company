import React from 'react'

const BookMark = ({ status, ...rest }) => {
  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => rest.onToggleBookMark(rest._id)}
      >
        {status ? (
          <i className="bi bi-bookmark-fill"></i>
        ) : (
          <i className="bi bi-bookmark"></i>
        )}
      </button>
    </>
  )
}

export default BookMark
