import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import _ from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'

const Comments = () => {
    const { userId } = useParams()
    const [comments, setComments] = useState([])
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data))
    }, [userId])
    const handleSubmit = (data) => {
        api.comments
            .add({ pageId: userId, ...data })
            .then((data) => setComments([...comments, data]))
    }
    const handleDelete = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id !== id))
            )
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
