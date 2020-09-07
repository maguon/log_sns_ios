import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


export const CollCommentOne = (params) => async (dispatch, getState) => {
    const {_id, _user_id} = params
    console.log(params)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${_user_id}/userBeMsgComment?msgId=${_id}&level=1`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({
                type: actionType.CollectionDetailType.Coll_Comment_success,
                payload: {commentMsg: res.result, isComplete: false}
            })
        } else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const CollCommentTwo = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {commentId} = params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userBeMsgComment?msgComId=${commentId}&level=2`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.CollectionDetailType.Coll_Comment, payload: {commentTwo: res.result}})

        } else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

// //取消关注
// export const cancelFollow = (params) => async (dispatch, getState) => {
//     const {LoginReducer: {userId}} = getState()
//     const {item} = params
//
//     try {
//         // 基本检索URL
//         let url = `${apiHost}/user/${userId}/followUser/${item._user_id}/del`
//         const res = await HttpRequest.del(url)
//         if (res.success) {
//         } else {
//             Toast.fail(res.msg)
//         }
//     } catch (err) {
//         Toast.fail(err.message)
//     }
// }
//
//
// //关注
// export const follow = (params) => async (dispatch, getState) => {
//     const {LoginReducer: {userId}} = getState()
//     const {item} = params
//     try {
//         // 基本检索URL
//         let url = `${apiHost}/user/${userId}/userRelation`
//         const res = await HttpRequest.post(url, {userById: item._user_id})
//         if (res.success) {
//
//         } else {
//             Toast.fail(res.msg)
//         }
//     } catch (err) {
//         Toast.fail(err.message)
//     }
//
// }
//
//
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
