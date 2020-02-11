import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getCollectionList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl`
        const res = await HttpRequest.get(url)
        if(res.success){
            dispatch({type: actionType.CollectionType.get_CollectionList, payload: {collectionList: res.result}})
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
            dispatch(getCollectionList())
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
