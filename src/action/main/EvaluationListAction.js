import * as actionType from '../../actionType/index'
import {apiHost} from '../../config/HostConfig'
import httpRequest from '../../utils/HttpRequest'
import { sleep } from '../../utils/util'
import { Portal, Toast } from '@ant-design/react-native'

const pageSize = 20

export const getCommentList = reqParams => async (dispatch, getState) => {
    try {
        const { LoginReducer: {userId} } = getState()
        // console.log('reqParams', reqParams)
        const url = `${apiHost}/user/${userId}/allMsgComment?msgComId=${reqParams.parentCommentId}&msgType=1&start=0&size=${pageSize}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionType.EvaluationListType.get_commentList_success, payload: {
                    commentList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionType.EvaluationListType.get_commentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionType.EvaluationListType.get_commentList_failed, payload: { failedMsg: `${err}` } })
    }
}

export const getCommentListWaiting = () => (dispatch) => {
    dispatch({ type: actionType.EvaluationListType.get_commentList_waiting })
}

export const getCommentListMore = reqParams => async (dispatch, getState) => {
    const { LoginReducer: {userId} , EvaluationMeReducer } = getState()
    if (EvaluationMeReducer.getCommentListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCommentListMore)
    } else {
        if (!EvaluationMeReducer.data.isCompleted) {
            dispatch({ type: actionType.EvaluationListType.get_commentListMore_waiting, payload: {} })
            try {
                const url = `${apiHost}/user/${userId}/allMsgComment?msgComId=${reqParams.parentCommentId}&msgType=1&start=${EvaluationMeReducer.data.commentList.length}&size=${pageSize}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
                    // if (isCompleted) {
                    //     ToastAndroid.show('已全部加载完毕！', 10)
                    // }
                    dispatch({
                        type: actionType.EvaluationListType.get_commentListMore_success, payload: {
                            commentList: res.result,
                            isCompleted
                        }
                    })
                } else {
                    dispatch({ type: actionType.EvaluationListType.get_commentListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionType.EvaluationListType.get_commentListMore_failed, payload: { failedMsg: `${err}` } })
            }
        }
    }
}


export const likeComment = reqParams => async (dispatch, getState) => {
    try {
        const likeLoading = Toast.loading('点赞', 0)
        const {LoginReducer: {userId} } = getState()
        dispatch({ type: actionType.EvaluationListType.like_commentForCommentList_waiting, payload: {} })
        const url = `${apiHost}/user/${userId}/userPraise`
        // console.log('url', url)
        const res = await httpRequest.post(url, {
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

            const resComment = await httpRequest.get(urlComment)
            // console.log('resComment', resComment)


            if (resComment.success) {
                dispatch({ type: actionType.EvaluationListType.like_commentForCommentList_success, payload: { commentInfo: resComment.result[0] } })
                Portal.remove(likeLoading)
                Toast.success("点赞成功！", 0.5)
            } else {
                dispatch({ type: actionType.EvaluationListType.like_commentForCommentList_failed, payload: { failedMsg: `${resComment.msg}` } })
                Portal.remove(likeLoading)
                Toast.success("点赞失败！", 0.5)
            }
        } else {
            dispatch({ type: actionType.EvaluationListType.like_commentForCommentList_failed, payload: { failedMsg: `${res.msg}` } })
            Portal.remove(likeLoading)
            Toast.success("点赞失败！", 0.5)
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionType.EvaluationListType.like_commentForCommentList_failed, payload: { failedMsg: `${err}` } })
        Portal.remove(likeLoading)
        Toast.success("点赞失败！", 0.5)
    }
}
