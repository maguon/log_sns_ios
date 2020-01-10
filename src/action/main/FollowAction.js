import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'



export const getTitle = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followCount`
        const res = await HttpRequest.get(url)
        if(res.success){
            props.navigation.setParams({ otherParam: `我的关注（${res.result}）` })
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}

export const getFollowList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},FollowReducer:{pageSize}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUserInfo?start=${0}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            // const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
            dispatch({type:actionType.FollowType.get_follow_list,payload:{followList:res.result.map(item => ({ ...item, follow_status: 1}))}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const getFollowListMore = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},FollowReducer:{pageSize}} = getState()
    try {
        let newPageSize=pageSize+20
        dispatch({type:actionType.FollowType.page_Size,payload:{pageSize:newPageSize}})
        let url = `${apiHost}/user/${userId}/followUserInfo?start=${0}&size=${newPageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            // const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
            dispatch({type:actionType.FollowType.get_follow_list,payload:{followList:res.result.map(item => ({ ...item, follow_status: 1 }))}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const follow = (param) => async (dispatch, getState) => {
    const {LoginReducer: {userId},FollowReducer:{followList}} = getState()
    const {followUserId,index}=param
    console.log(param)

    try {
        followList[index].follow_status=1
        dispatch({type:actionType.FollowType.get_follow_list,payload:{followList:followList}})
        const url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url, { userById: followUserId })
        console.log(res)
            if (res.success) {

            }else {Toast.fail(res.msg)}

    } catch (err) {
        Toast.fail(err.message)
    }

}

export const removeFollow = (param) => async (dispatch, getState) => {
    const {LoginReducer: {userId},FollowReducer:{followList}} = getState()
    const {followUserId,index}=param

    try {
        const url = `${apiHost}/user/${userId}/followUser/${followUserId}/del`
        const res = await HttpRequest.del(url)
        if (res.success) {
            followList[index].follow_status=0
            dispatch({type:actionType.FollowType.get_follow_list,payload:{followList:followList}})
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
