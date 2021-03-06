import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import {update} from "./HomeAction";


export const getCommentOne = (params) => async (dispatch, getState) => {
    const {_id, _user_id} = params
    // console.log(params)
    dispatch({type: actionType.DetailType.get_Loading_success, payload: {Loading:true}})
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${_user_id}/userBeMsgComment?msgId=${_id}&level=1`
        const res = await HttpRequest.get(url)
        // console.log(res)
        if (res.success) {
            dispatch({type: actionType.DetailType.get_Loading_success, payload: {Loading:false}})
            dispatch({
                type: actionType.DetailType.get_Comment_success,
                payload: {commentMsg: res.result}
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
    const {_id, _user_id} = params
    // console.log(params)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${ _user_id}&msgId=${_id}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({
                type: actionType.DetailType.get_commentUser,
                payload: {commentUser: res.result[0]}
            })
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
//
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

//点赞
export const setPraiseOne = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item} =params

    try {
        let params={type:1, msgId:`${item._id}`, msgUserId:`${item._user_id}`,bePraisedUserId:`${item._user_id}`}
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
    // console.log(item)
    try {
        let params = {
            type: 2,
            msgId:item._msg_id,
            msgUserId: item._msg_user_id,
            msgComId: item._id,
            msgComUserId: item._user_id,
            bePraisedUserId: item._user_id
        }
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url, params)
        // console.log(params)
        // console.log(res)
        if (res.success) {
           const param= {_id:item._msg_id, _user_id:item._msg_user_id}
            dispatch(getCommentOne(param))
        } else {
            Toast.info(res.msg)
        }
    } catch (err) {

        Toast.fail(err.message)
    }

}

// export const update = (params) => async (dispatch, getState) => {
//     dispatch(getCommentOne())
//     dispatch(getCommentOne())
// }
