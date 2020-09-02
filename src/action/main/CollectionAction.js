import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


const pageSize = 5
export const getCollection = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl?start=0&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if(res.success){
                dispatch({type: actionType.CollectionType.set_Collection, payload: {collectionList: res.result}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}

export const getCollectionList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CollectionReducer:{collectionList}} = getState()
    console.log(collectionList)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl?start=${collectionList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if(res.success){
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CollectionType.set_CollectionList, payload: {collectionList: res.result, vidComplete: true}})
            } else {
                dispatch({ type: actionType.CollectionType.get_CollectionList, payload: { collectionList: res.result, vidComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}

//点赞
export const setColPraise = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId},CollectionReducer:{collectionList}} = getState()

    try {
        let params={type:1, msgId:`${item._id}`, msgUserId:`${item._user_id}`,bePraisedUserId:`${item._user_id}`}
        console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        if(res.success){
            let url = `${apiHost}/user/${userId}/userMsgColl?start=0&size=${collectionList.length}`
            const res = await HttpRequest.get(url)
            if (res.success) {
                dispatch({ type: actionType.CollectionType.del_CollectionList, payload: { collectionList: res.result } })
            }
        }else {
            Toast.info(res.msg)
        }

    } catch (err) {

        Toast.fail(err.message)
    }
}

//取消收藏
export const delCollection = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId},CollectionReducer:{collectionList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl/${value._id}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
            let url = `${apiHost}/user/${userId}/userMsgColl?start=0&size=${collectionList.length}`
            const res = await HttpRequest.get(url)
            if (res.success) {
                dispatch({ type: actionType.CollectionType.del_CollectionList, payload: { collectionList: res.result } })
            }

        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
