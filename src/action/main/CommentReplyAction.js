import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getCommentReply= (value ) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userBeMsgComment?msgComId=${value}&level=2`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            dispatch({type: actionType.CommentReplyType.get_Reply, payload: {commentReply: res.result}})
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
