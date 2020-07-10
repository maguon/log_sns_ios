import { handleActions } from 'redux-actions'
import * as actionType from "../../actionType";

const initialState = {
    commentReply:[]
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.CommentReplyType.get_Reply]: (state, action) => {
        const {payload: {commentReply}} = action
        return {
            ...state,
            commentReply
        }
    },
}, initialState)
