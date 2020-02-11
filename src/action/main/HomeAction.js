import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getHotList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},HomeReducer:{hotSize}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/popularMsg?start=0&size=${hotSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.get_HotList, payload: {hotList: res.result}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

export const getHotListMore = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},HomeReducer:{hotSize}} = getState()
    try {
        let newhotSize = hotSize + 2
        dispatch({type: actionType.HomeActionType.set_HotSize, payload: {hotSize: newhotSize}})
        dispatch(getHotList())
    } catch (err) {
        Toast.fail(err.message)
    }
}


//关注
export const getHomeFollow = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUserMsg`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.get_HomeFollow, payload: {homeFollow: res.result}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
//附近
export const getNearList = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {coords:{longitude,latitude}}=value
    console.log(longitude)
    console.log(latitude)
    try {
        // 基本检索URL
        let url = apiHost+'/user/'+userId+'/nearbyMsg?address=['+longitude+','+latitude+']&radius='+100
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.get_NearList, payload: {nearList: res.result}})
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
        let params={
            msgId:`${value._id}`,
            msgUserId:`${value._user_id}`,
            remarks:"string"
        }
        console.log(params)
        let url = `${apiHost}/user/${userId}/userMsgColl`
        const res = await HttpRequest.post(url,params)
        if(res.success){
            Toast.success('收藏成功', 1, () => {
                // dispatch({type: actionType.ItemType.get_MsgId, payload: {msgId: res.id}})
                // dispatch({type: actionType.ItemType.get_Star, payload: {msgId: res.true}})
            })
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

//点赞
export const setPraise = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(value)
    try {
        let params={
            type:1,
            msgId:`${value._id}`,
            msgUserId:`${value._user_id}`,
        }
        console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        if(res.success){
           dispatch(getHotList())
            dispatch(getHomeFollow())
            dispatch(getNearList())
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}


