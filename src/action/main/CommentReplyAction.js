import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

const pageSize = 10
export const getCommentReply = (value) => async (dispatch,getState) => {
    const {commentId,userId}=value
    const {CommentReplyReducer:{commentReply}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/userMsgComment?msgComId=${commentId}&level=2&start=${commentReply.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.CommentReplyType.Loading, payload: {Loading: true}})
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CommentReplyType.get_commentReply_end, payload: {commentReply: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.CommentReplyType.get_commentReply_success, payload: { commentReply: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
