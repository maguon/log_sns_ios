import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getHotList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/popularMsg`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.get_HotList, payload: {hotList: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
//关注
export const getHomeFollow = (props) => async (dispatch, getState) => {
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
export const getNearList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/nearbyMsg?address=${[100, 100]}&radius=1`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.HomeActionType.get_NearList, payload: {nearList: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

