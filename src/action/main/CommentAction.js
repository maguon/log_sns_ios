import * as actionType from '../../actionType/index'
import HttpRequest from '../../utils/HttpRequest'
import {apiHost} from '../../config/HostConfig'
import { Portal, Toast } from '@ant-design/react-native'

export const createComment = reqParam => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const likeLoading = Toast.loading('发送评论', 0)
    try {
        // console.log('reqParam',reqParam)
        dispatch({ type: actionType.CommentType.create_comment_waiting })
        const url = `${apiHost}/user/${userId}/msgComment`
        // console.log('url', url)
        const res = await HttpRequest.post(url, reqParam)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionType.CommentType.create_comment_success })
            Portal.remove(likeLoading)
            Toast.success("评论成功！", 0.5)
        } else {
            dispatch({ type: actionType.CommentType.create_comment_failed, payload: { failedMsg: `${res.msg}` } })
            Portal.remove(likeLoading)
            Toast.success("评论失败！", 0.5)
        }

    } catch (err) {
        dispatch({ type: actionType.CommentType.create_comment_failed, payload: { failedMsg: `${err}` } })
        Portal.remove(likeLoading)
        Toast.success("评论失败！", 0.5)
    }
}
