import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


export const getCommentOne = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userBeMsgComment/?level=1`
        const res = await HttpRequest.get(url)
        // console.log(res)
        if(res.success){
            dispatch({type: actionType.DetailType.get_Comment, payload: {commentMsg: res.result}})

        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}


export const getCommentTwo = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userBeMsgComment?msgComId=5e21135f3c33de681370776e&level=2`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            dispatch({type: actionType.DetailType.get_Comment, payload: {commentTwo: res.result}})

        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

//取消关注
export const cancelFollow = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item} =params

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUser/${item._user_id}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
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
    const {item} =params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url,{userById:item._user_id})
        if(res.success){

        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

