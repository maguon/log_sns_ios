import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import {Alert} from 'react-native'


const pageSize = 5
export const getHotList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},HomeReducer: {hotList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/popularMsg?status=1&start=${hotList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.set_HotLoading, payload: {hotLoading: true}})
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.HomeActionType.get_HotList_end, payload: {hotList: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.HomeActionType.get_HotList_success, payload: { hotList: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}



//关注
export const getHomeFollow = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},HomeReducer: {homeFollow}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUserMsg?status=1&start=${homeFollow.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.HomeActionType.get_HomeFollow, payload: {homeFollow: res.result, homeComplete: true}})
            } else {
                dispatch({ type: actionType.HomeActionType.get_HomeFollow_end, payload: { homeFollow: res.result, homeComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
//附近
export const getNearList = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId},HomeReducer: {nearList}} = getState()
    const {coords:{longitude,latitude}}=value
    console.log(value)
    try {
        dispatch({type: actionType.HomeActionType.get_address, payload: {longitude: longitude,latitude: latitude}})

        // 基本检索URL
        let url = apiHost+'/user/'+userId+'/nearbyMsg?address=['+longitude+','+latitude+']&radius='+1000+'&start='+nearList.length+'&size='+pageSize
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.HomeActionType.get_NearList, payload: {nearList: res.result,nearComplete: true}})
            } else {
                dispatch({ type: actionType.HomeActionType.get_NearList_end, payload: { nearList: res.result, nearComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

//收藏
export const setCollection = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(value)
    try {
        if(userId==value._user_id){

        }else {
            let params = {
                msgId: `${value._id}`,
                msgUserId: `${value._user_id}`,
                remarks: "string"
            }
            console.log(params)
            let url = `${apiHost}/user/${userId}/userMsgColl`
            const res = await HttpRequest.post(url, params)
            if (res.success) {
                Toast.success('收藏成功', 1, () => {
                    // dispatch({type: actionType.ItemType.get_MsgId, payload: {msgId: res.id}})
                    // dispatch({type: actionType.ItemType.get_Star, payload: {msgId: res.true}})
                })
            } else {
                Toast.info(res.msg)
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const update=(tabIndex)=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},HomeReducer: {hotList,homeFollow,nearList,longitude,latitude}} = getState()
    if(tabIndex==0){
        let url = `${apiHost}/user/${userId}/msg?status=1&start=0&size=${hotList.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.set_HotList_Praise, payload: {hotList: res.result}})
        }
    }else if(tabIndex==1){
        let url = `${apiHost}/user/${userId}/followUserMsg?status=1&start=0&size=${homeFollow.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.set_HomeFollow_Praise, payload: {homeFollow: res.result}})
        }
    }else if(tabIndex==2){
        let url = apiHost+'/user/'+userId+'/nearbyMsg?address=['+longitude+','+latitude+']&radius='+1000+'&start=0&size='+nearList.length
        // console.log(nearList.length)
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.set_NearList_Praise, payload: {nearList: res.result}})
        }
    }
}


//点赞
export const setPraise = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(params)
    const {item,tabIndex} =params

    try {
        let params={type:1, msgId:`${item._id}`, msgUserId:`${item._user_id}`,bePraisedUserId:`${item._user_id}`}
        console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        console.log(res)
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.info(res.msg)
        }
    } catch (err) {

        Toast.fail(err.message)
    }

}



//屏蔽
export const shielding = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/blockUser/${item._user_id}/add`
        const res = await HttpRequest.post(url)
        if(res.success){
            Toast.success('已屏蔽此用户消息')
            dispatch(update(tabIndex))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
// //取消屏蔽
// export const cancelShielding = (params) => async (dispatch, getState) => {
//     const {LoginReducer: {userId}} = getState()
//     const {item,tabIndex} =params
//     try {
//         // 基本检索URL
//         let url = `${apiHost}/user/${userId}/blockUser/${item._user_id}/del`
//         const res = await HttpRequest.del(url)
//         if(res.success){
//             dispatch(update(tabIndex))
//         }else {
//             Toast.fail(res.msg)
//         }
//     } catch (err) {
//         Toast.fail(err.message)
//     }
//
// }



//取消关注
export const cancelFollow = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUser/${item._user_id}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

//关注
export const follow = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url,{userById:item._user_id})
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}


