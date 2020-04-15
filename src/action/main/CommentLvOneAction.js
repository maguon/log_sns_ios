import * as actionType from '../../actionType/index'
import HttpRequest from '../../utils/HttpRequest'
import {apiHost} from '../../config/HostConfig'
import { sleep } from '../../utils/util'
import { Portal, Toast } from '@ant-design/react-native'

const pageSize = 1

export const getLvOneCommentList = reqParams => async (dispatch, getState) => {
    try {
        const { LoginReducer: {userId} } = getState()
        // console.log('reqParams', reqParams)
        const url = `${apiHost}/user/${userId}/allMsgComment?msgId=${reqParams.msgId}&msgType=1&level=1&start=0&size=${pageSize}`
        console.log('url', url)
        const res = await HttpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionType.CommentLvOneActionType.get_lvOneCommentList_success, payload: {
                    lvOneCommentList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentList_failed, payload: { failedMsg: `${err}` } })
    }
}

export const getLvOneCommentListWaiting = () => (dispatch) => {
    dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentList_waiting })

}

export const getLvOneCommentListMore = reqParams => async (dispatch, getState) => {
    const { LoginReducer: {userId},CommentLvOneReducer } = getState()
    if (CommentLvOneReducer.getLvOneCommentListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getLvOneCommentListMore)
    } else {
        if (!CommentLvOneReducer.data.isCompleted) {
            dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentListMore_waiting, payload: {} })
            try {
                const url = `${apiHost}/user/${userId}/allMsgComment?msgId=${reqParams.msgId}&msgType=1&level=1&start=${CommentLvOneReducer.data.lvOneCommentList.length}&size=${pageSize}`
                // console.log('url', url)
                const res = await HttpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
                    dispatch({
                        type: actionType.CommentLvOneActionType.get_lvOneCommentListMore_success, payload: {
                            lvOneCommentList: res.result,
                            isCompleted
                        }
                    })
                } else {
                    dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionType.CommentLvOneActionType.get_lvOneCommentListMore_failed, payload: { failedMsg: `${err}` } })
            }
        }
    }
}

export const likeLvOneComment = reqParams => async (dispatch, getState) => {
    const likeLoading = Toast.loading('点赞', 0)
    const { LoginReducer: {userId} } = getState()
    try {
        dispatch({ type: actionType.CommentLvOneActionType.like_lvOneComment_waiting, payload: {} })
        const url = `${apiHost}/user/${userId}/userPraise`
        // console.log('url', url)
        const res = await HttpRequest.post(url, reqParams)
        // console.log('res', res)
        // const res = { success: true }
        if (res.success) {
            // console.log('likeLoading',likeLoading)
            dispatch({ type: actionType.CommentLvOneActionType.like_lvOneComment_success })
            Portal.remove(likeLoading)
            Toast.success("点赞成功！", 0.5)

        } else {
            dispatch({ type: actionType.CommentLvOneActionType.like_lvOneComment_failed, payload: { failedMsg: `${res.msg}` } })
            Portal.remove(likeLoading)
            Toast.success("点赞失败！", 0.5)
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionType.CommentLvOneActionType.like_lvOneComment_failed, payload: { failedMsg: `${err}` } })
        Portal.remove(likeLoading)
        Toast.success("点赞失败！", 0.5)
    }
}
