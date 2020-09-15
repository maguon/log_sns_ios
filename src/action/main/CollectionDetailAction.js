import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


export const CollCommentOne = (params) => async (dispatch, getState) => {
    const {_msg_id,  _msg_user_id} = params
    console.log(params)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${_msg_user_id}/userBeMsgComment?msgId=${_msg_id}&level=1`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({
                type: actionType.CollectionDetailType.Coll_Comment_success,
                payload: {Coll_comment: res.result, isComplete: false}
            })
        } else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const getCommentUser = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {_msg_id, _msg_user_id} = params
    console.log(params)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${_msg_user_id}&msgId=${_msg_id}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({
                type: actionType.CollectionDetailType.Coll_commentUser,
                payload: {collUser: res.result[0]}
            })
        } else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
//点赞
export const setPraiseOne = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item} =params

    try {
        let params={type:1, msgId:`${item._msg_id}`, msgUserId:`${item._msg_user_id}`,bePraisedUserId:`${item._msg_user_id}`}
        // console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        // console.log(res)
        if(res.success){
            dispatch(getCommentUser(item))
        }else {
            Toast.info(res.msg)
        }
    } catch (err) {

        Toast.fail(err.message)
    }

}

//点赞
export const setPraise = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item} = params
    console.log(item)
    try {
        let params = {
            type: 2,
            msgId: item._msg_id,
            msgUserId: item._msg_user_id,
            msgComId: item._msg_com_id,
            msgComUserId: item.__msg_com_user_id,
            bePraisedUserId: `${item._user_id}`
        }
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url, params)
        console.log(params)
        if (res.success) {
            dispatch(CollCommentOne())
        } else {
            Toast.info(res.msg)
        }
    } catch (err) {

        Toast.fail(err.message)
    }

}

