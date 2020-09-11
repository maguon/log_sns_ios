import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

const pageSize = 5
//投票getVoteList
export const getToVoteList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ToVoteReducer:{ToVoteList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/getUserVote?start=${ToVoteList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ToVoteType.set_ToVoteList, payload: {ToVoteList: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ToVoteType.get_ToVoteList, payload: { ToVoteList: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
