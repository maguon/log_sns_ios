import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import {getCollectionList} from "../main/CollectionAction";



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
                dispatch({type: actionType.ItemType.get_MsgId, payload: {msgId: res.id}})
                dispatch({type: actionType.ItemType.get_Star, payload: {msgId: res.true}})
            })
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

//取消收藏
export const delCollection = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl/${value}/del`
        const res = await HttpRequest.del(url)
        console.log(res)
        if(res.success){
            Toast.success('取消收藏', 1, () => {
                console.log('111')
            })
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}


//取消收藏
export const delColl = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl/${value}/del`
        const res = await HttpRequest.del(url)
        console.log(res)
        if(res.success){
            Toast.success('取消收藏', 1, () => {
               dispatch(getCollectionList())
            })
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
