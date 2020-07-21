import { handleActions } from 'redux-actions'
import * as actionType from "../../actionType";

const initialState = {
    commentReply:[],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    Loading:false,
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({

    [actionType.CommentReplyType.Loading]: (state, action) => {
        const { payload: { Loading } } = action
        return {
            ...state,
            Loading
        }
    },

    [actionType.CommentReplyType.get_commentReply_success]: (state, action) => {
        const {payload: {commentReply,isComplete}} = action
        return {
            ...state,
            commentReply: [...state.commentReply, ...commentReply],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.CommentReplyType.get_commentReply_end]: (state, action) => {
        const {payload: {commentReply,isComplete}} = action
        return {
            ...state,
            commentReply: [...state.commentReply, ...commentReply],
            isComplete,
            isResultStatus: 1,

        }
    },

}, initialState)
