import * as actionType from '../../actionType/index'
import {apiHost} from '../../config/HostConfig'
import httpRequest from '../../utils/HttpRequest'
import { sleep } from '../../utils/util'

const pageSize = 1

export const getCommentList = () => async (dispatch, getState) => {
    try {
        const { LoginReducer: {userId} } = getState()
        const url = `${apiHost}/user/${userId}/userMsgComment?start=0&size=${pageSize}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionType.EvaluationType.get_myCommentList_success, payload: {
                    commentList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type:actionType.EvaluationType.get_myCommentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err',err)
        dispatch({ type: actionType.EvaluationType.get_myCommentList_failed, payload: { failedMsg: `${err}` } })
    }
}

export const getCommentListWaiting = () => (dispatch) => {
    dispatch({ type: actionType.EvaluationType.get_myCommentList_waiting })
}

export const getCommentListMore = () => async (dispatch, getState) => {
    const { LoginReducer: {userId},EvaluationReducer } = getState()
    if (EvaluationReducer.getCommentListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCommentListMore)
    } else {
        if (!EvaluationReducer.data.isCompleted) {
            dispatch({ type: actionType.EvaluationType.get_myCommentListMore_waiting, payload: {} })
            try {
                const url = `${apiHost}/user/${userId}/userMsgComment?start=${EvaluationReducer.data.commentList.length}&size=${pageSize}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                console.log('res', res)
                if (res.success) {
                    const isCompleted = res.result.length == 0 || res.result.length % pageSize != 0
                    // if (isCompleted) {
                    //     ToastAndroid.show('已全部加载完毕！', 10)
                    // }
                    dispatch({
                        type: actionType.EvaluationType.get_myCommentListMore_success, payload: {
                            commentList: res.result,
                            isCompleted,
                        }
                    })
                } else {
                    dispatch({ type: actionType.EvaluationType.get_myCommentListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                console.log('err',err)
                dispatch({ type:actionType.EvaluationType.get_myCommentListMore_failed, payload: { failedMsg: `${err}` } })
            }
        }
    }
}
