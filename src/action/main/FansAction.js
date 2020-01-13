import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'



export const getTitle = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/attentionCount`
        const res = await HttpRequest.get(url)
        if(res.success){
            props.navigation.setParams({ otherParam: `我的粉丝（${res.result}）` })
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}

export const getFansList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},FansReducer:{pageSize}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/attentionUserInfo?start=${0}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            // const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
            dispatch({type:actionType.FansType.get_fansList,payload:{fansList:res.result.map(item => ({ ...item, fans_status:item.type }))}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const getFansListMore = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},FansReducer:{pageSize}} = getState()
    try {
        let newPageSize=pageSize+20
        dispatch({type:actionType.FansType.set_pageSize,payload:{pageSize:newPageSize}})
        let url = `${apiHost}/user/${userId}/attentionUserInfo?start=${0}&size=${newPageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            // const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
            dispatch({type:actionType.FansType.get_fansList,payload:{fansList:res.result.map(item => ({ ...item, fans_status: 1 }))}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const fans = (param) => async (dispatch, getState) => {
    const {LoginReducer: {userId},FansReducer:{fansList}} = getState()
    const {fansUserId,index}=param
    console.log(param)

    try {
        fansList[index].fans_status=1
        dispatch({type:actionType.FansType.get_fansList,payload:{fansList:fansList}})
        const url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url, { userById: fansUserId })
        console.log(res)
        if (res.success) {

        }else {Toast.fail(res.msg)}

    } catch (err) {
        Toast.fail(err.message)
    }

}

export const removeFans = (param) => async (dispatch, getState) => {
    const {LoginReducer: {userId},FansReducer:{fansList}} = getState()
    const {fansUserId,index}=param

    try {
        const url = `${apiHost}/user/${userId}/followUser/${fansUserId}/del`
        const res = await HttpRequest.del(url)
        if (res.success) {
            fansList[index].fans_status=0
            dispatch({type:actionType.FansType.get_fansList,payload:{fansList:fansList}})
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
