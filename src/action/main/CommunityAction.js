import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'



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
