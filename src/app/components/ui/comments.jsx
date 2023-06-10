import React, { useEffect } from 'react'
import _ from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from '../../store/comments'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const comments = useSelector(getComments())
    const isLoading = useSelector(getCommentsLoadingStatus())
    const currentUserId = useSelector(getCurrentUserId())

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                payload: data,
                pageId: userId,
                userId: currentUserId
            })
        )
    }
    const handleDelete = (id) => {
        dispatch(removeComment(id))
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
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onDelete={handleDelete}
                            />
                        ) : (
                            'Loading...'
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
