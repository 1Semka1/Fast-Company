import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            )
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions

const commentCreateRequested = createAction('comment/commentCreateRequested')
const createCommentFailed = createAction('comment/createCommentFailed')
const commentRemoveRequested = createAction('comment/commentRemoveRequested')
const removeCommentFailed = createAction('comment/removeCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment =
    ({ payload, pageId, userId }) =>
    async (dispatch) => {
        dispatch(commentCreateRequested())
        const comment = {
            ...payload,
            _id: nanoid(),
            pageId,
            created_at: Date.now(),
            userId
        }
        try {
            const { content } = await commentService.createComment(comment)
            dispatch(commentCreated(content))
        } catch (error) {
            dispatch(createCommentFailed(error.message))
        }
    }

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(commentRemoved(commentId))
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
