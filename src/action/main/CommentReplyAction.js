import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getCommentReply = (value) => async (dispatch,getState) => {
    const {commentId,userId}=value
    try {
        let url = `${apiHost}/user/${userId}/allMsgComment?msgComId=${commentId}&level=2`
        const res = await HttpRequest.get(url)
        console.log(value)
        if (res.success) {
            dispatch({ type: actionType.CommentReplyType.get_commentReply_success, payload: { commentReply: res.result} })

        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
