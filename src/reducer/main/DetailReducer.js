import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    Loading:false,
    commentMsg:[],
    commentUser:""
}

export  default  handleActions({
    [actionType.DetailType.get_Loading_success]: (state, action) => {
        const {payload: {Loading}} = action
        return {
            ...state,
            Loading
        }
    },
    [actionType.DetailType.get_Comment_success]: (state, action) => {
        const {payload: {commentMsg}} = action
        return {
            ...state,
            commentMsg
        }
    },
    [actionType.DetailType.get_commentUser]: (state, action) => {
        const {payload: {commentUser}} = action
        return {
            ...state,
            commentUser
        }
    },


},initialState)
