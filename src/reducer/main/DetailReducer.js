import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    commentMsg:[],
    commentTwo:[]
}

export  default  handleActions({

    [actionType.DetailType.get_Comment_success]: (state, action) => {
        const {payload: {commentMsg}} = action
        return {
            ...state,
            commentMsg
        }
    },
    [actionType.DetailType.get_commentTwo]: (state, action) => {
        const {payload: {commentTwo}} = action
        return {
            ...state,
            commentTwo
        }
    },

},initialState)
