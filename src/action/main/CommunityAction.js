import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import {getHomeFollow, getNearList} from "./HomeAction";



const pageSize = 5
//所有
export const getComInfo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CommunityReducer:{comInfo}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?status=1&start=${comInfo.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.CommunityType.set_ComLoading, payload: {comLoading: true}})
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CommunityType.set_ComInfo, payload: {comInfo: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.CommunityType.get_ComInfo, payload: { comInfo: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}


//视频
export const getComVideo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CommunityReducer:{comVideo}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?carrier=3&status=1&start=${comVideo.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CommunityType.set_ComVideo, payload: {comVideo: res.result, vidComplete: true}})
            } else {
                dispatch({ type: actionType.CommunityType.get_ComVideo, payload: { comVideo: res.result, vidComplete: false } })
            }

        }

    } catch (err) {
        Toast.fail(err.message)
    }
}


//求助
export const getComHelp = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CommunityReducer:{comHelp}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?type=2&carrier=1&status=1&start=${comHelp.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CommunityType.set_ComHelp, payload: {comHelp: res.result, helpComplete: true}})
            } else {
                dispatch({ type: actionType.CommunityType.get_ComHelp, payload: { comHelp: res.result, helpComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

//投票getVoteList
export const getComVoteList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CommunityReducer:{comVoteList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/vote?start=${comVoteList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CommunityType.set_ComVoteList, payload: {comVoteList: res.result, voteComplete: true}})
            } else {
                dispatch({ type: actionType.CommunityType.get_ComVoteList, payload: { comVoteList: res.result, voteComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

export const update=(tabIndex)=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},CommunityReducer:{comInfo,comVideo,comHelp,comVoteList}} = getState()
    if(tabIndex==0){
        let url = `${apiHost}/user/${userId}/msg?status=1&start=0&size=${comInfo.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.CommunityType.set_ComInfo_Praise, payload: {comInfo: res.result}})
        }
    }else if(tabIndex==1){
        let url = `${apiHost}/user/${userId}/msg?carrier=3&status=1&start=0&size=${comVideo.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.CommunityType.set_ComVideo_Praise, payload: {comVideo: res.result}})
        }

    }else if(tabIndex==2){
        let url = `${apiHost}/user/${userId}/msg?type=2&carrier=1&status=1&start=0&size=${comHelp.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.CommunityType.set_ComHelp_Praise, payload: {comHelp: res.result}})
        }
    }else if(tabIndex==3){
        let url = `${apiHost}/user/${userId}/vote?start=0&size=${comVoteList.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.CommunityType.set_ComVoteList_Praise, payload: {comVoteList: res.result}})
        }
    }
}

//点赞
export const setComPraise = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(params)
    const {item,tabIndex} =params

    try {
        let params={type:1, msgId:`${item._id}`, msgUserId:`${item._user_id}`,bePraisedUserId:`${item._user_id}`}
        console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.info(res.msg)
        }

    } catch (err) {

        Toast.fail(err.message)
    }
}



//取消关注
export const comCancelFollow = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/followUser/${item._user_id}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

//关注
export const comFollow = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userRelation`
        const res = await HttpRequest.post(url,{userById:item._user_id})
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
