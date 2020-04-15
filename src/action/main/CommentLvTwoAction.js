import { Portal, Toast } from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import HttpRequest from '../../utils/HttpRequest'
import {apiHost} from '../../config/HostConfig'
import { sleep } from '../../utils/util'

const pageSize = 20

export const getLvTwoCommentList = reqParams => async (dispatch, getState) => {
    try {
        const {LoginReducer: {userId}  } = getState()
        console.log('reqParams', reqParams)
        const url = `${apiHost}/user/${userId}/allMsgComment?msgComId=${reqParams.parentCommentId}&msgType=1&start=0&size=${pageSize}`
        console.log('url', url)
        const res = await HttpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionType.CommentLvTwoActionType.get_lvTwoCommentList_success, payload: {
                    lvTwoCommentList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentList_failed, payload: { failedMsg: `${err}` } })
    }
}

export const getLvTwoCommentListWaiting = () => (dispatch) => {
    dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentList_waiting })
}

export const getLvTwoCommentListMore = reqParams => async (dispatch, getState) => {
    const { LoginReducer: {userId}, CommentLvTwoReducer } = getState()
    if (CommentLvTwoReducer.getLvTwoCommentListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getLvTwoCommentListMore)
    } else {
        if (!CommentLvTwoReducer.data.isCompleted) {
            dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentListMore_waiting, payload: {} })
            try {
                const url = `${apiHost}/user/${userId}/allMsgComment?msgComId=${reqParams.parentCommentId}&msgType=1&start=${CommentLvTwoReducer.data.lvTwoCommentList.length}&size=${pageSize}`
                // console.log('url', url)
                const res = await HttpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
                    // if (isCompleted) {
                    //     ToastAndroid.show('已全部加载完毕！', 10)
                    // }
                    dispatch({
                        type: actionType.CommentLvTwoActionType.get_lvTwoCommentListMore_success, payload: {
                            lvTwoCommentList: res.result,
                            isCompleted
                        }
                    })
                } else {
                    dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionType.CommentLvTwoActionType.get_lvTwoCommentListMore_failed, payload: { failedMsg: `${err}` } })
            }
        }
    }
}


export const lvTwoCommentList = reqParams => async (dispatch, getState) => {
    const likeLoading = Toast.loading('点赞', 0)
    const { LoginReducer: {userId} } = getState()
    try {
        dispatch({ type: actionType.CommentLvTwoActionType.like_lvTwoComment_waiting, payload: {} })
        const url = `${apiHost}/user/${userId}/userPraise`
        // console.log('url', url)
        const res = await HttpRequest.post(url, {
            type: 2,
            msgId: reqParams.msgId,
            msgUserId: reqParams.msgUserId,
            msgComId: reqParams.msgComId,
            msgComUserId: reqParams.msgComUserId
        })
        // console.log('res', res)

        if (res.success) {
            const urlComment = `${apiHost}/user/${userId}/allMsgComment?oneMsgComId=${reqParams.msgComId}`
            // console.log('urlComment', urlComment)

            const resComment = await HttpRequest.get(urlComment)
            // console.log('resComment', resComment)


            if (resComment.success) {
                dispatch({ type: actionType.CommentLvTwoActionType.like_lvTwoComment_success, payload: { commentInfo: resComment.result[0] } })
                Portal.remove(likeLoading)
                Toast.success("点赞成功！", 0.5)
            } else {
                dispatch({ type: actionType.CommentLvTwoActionType.like_lvTwoComment_failed, payload: { failedMsg: `${resComment.msg}` } })
                Portal.remove(likeLoading)
                Toast.success("点赞失败！", 0.5)
            }
        } else {
            dispatch({ type: actionType.CommentLvTwoActionType.like_lvTwoComment_failed, payload: { failedMsg: `${res.msg}` } })
            Portal.remove(likeLoading)
            Toast.success("点赞失败！", 0.5)
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionType.CommentLvTwoActionType.like_lvTwoComment_failed, payload: { failedMsg: `${err}` } })
        Portal.remove(likeLoading)
        Toast.success("点赞失败！", 0.5)
    }
}
