import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getFollowList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUserInfo`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.FollowMeType.get_followMe_List, payload: {followMeList: res.result[0]}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}


export const getFollowListMore = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUserInfo`
        const res = await HttpRequest.get(url)
        if (res.success) {

        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
