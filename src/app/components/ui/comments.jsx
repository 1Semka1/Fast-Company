import React from 'react'
import _ from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
    const { createComment, comments, removeComment } = useComments()

    const handleSubmit = (data) => {
        createComment(data)
    }
    const handleDelete = (id) => {
        removeComment(id)
    }
    const sortedComments = _.orderBy(comments, ['created_at'], ['desc'])
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Комментарии</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
