import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    createComment: {
        isResultStatus: 0,
        failedMsg: ''
    }
}

export default handleActions({
    [actionType.CommentType.create_comment_success]: (state, action) => {
        return {
            ...state,
            createComment: {
                ...state.createComment,
                isResultStatus: 2
            }
        }
    },
    [actionType.CommentType.create_comment_waiting]: (state, action) => {
        return {
            ...state,
            createComment: {
                ...state.createComment,
                isResultStatus: 1
            }
        }
    },
    [actionType.CommentType.create_comment_failed]: (state, action) => {
        return {
            ...state,
            createComment: {
                ...state.createComment,
                isResultStatus: 3
            }
        }
    },
},initialState)
