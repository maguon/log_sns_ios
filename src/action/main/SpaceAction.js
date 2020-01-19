import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

//个人信息
export const getSpaceUser = (value) => async (dispatch, getState) => {

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${value}/userDetail`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.SpaceType.get_SpaceUser, payload: {spaceUser: res.result[0]}})
        } else {

        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
//内容
export const getSpaceData = (value) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${value}/msg?sendMsgUserId=${value}`
        const res = await HttpRequest.get(url)

        if (res.success) {
            dispatch({type: actionType.SpaceType.get_spaceData, payload: {spaceData: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

//关注关系
export const followStatus = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/follow?userById=${value}`
        const res = await HttpRequest.get(url)
        if(res.success){
            dispatch({type: actionType.SpaceType.set_SpaceHidden, payload: {spaceHidden:res.result}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}


//取消关注
export const cancelFollow = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUser/${value}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
            dispatch(followStatus(value))
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

//关注
export const follow = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url,{userById:value})
        if(res.success){
            dispatch(followStatus(value))
        }else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

