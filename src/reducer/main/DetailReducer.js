import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    commentMsg:[],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    commentLoading:false,
    commentTwo:[]
}

export  default  handleActions({

    // [actionType.DetailType.get_Comment]: (state, action) => {
    //     const {payload: {commentMsg}} = action
    //     return {
    //         ...state,
    //         commentMsg
    //     }
    // },
    [actionType.DetailType.get_commentTwo]: (state, action) => {
        const {payload: {commentTwo}} = action
        return {
            ...state,
            commentTwo
        }
    },

    [actionType.DetailType.commentLoading]: (state, action) => {
        const { payload: { commentLoading } } = action
        return {
            ...state,
            commentLoading
        }
    },

    [actionType.DetailType.get_Comment_success]: (state, action) => {
        const {payload: {commentMsg,isComplete}} = action
        return {
            ...state,
            commentMsg: [...state.commentMsg, ...commentMsg],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.DetailType.get_Comment_end]: (state, action) => {
        const {payload: {commentMsg,isComplete}} = action
        return {
            ...state,
            commentMsg: [...state.commentMsg, ...commentMsg],
            isComplete,
            isResultStatus: 1,

        }
    },


},initialState)
