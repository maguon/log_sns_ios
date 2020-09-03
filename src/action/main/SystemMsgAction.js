import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

const pageSize = 20


export const getSystemMsg = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}, SystemMsgReducer: {systemMsg}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/sysMsg?start=${systemMsg.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({
                    type: actionType.SystemMsgType.get_systemMsg_end,
                    payload: {systemMsg: res.result,isComplete: true}
                })
            } else {
                dispatch({
                    type: actionType.SystemMsgType.get_systemMsg_success,
                    payload: {systemMsg: res.result,isComplete: false}
                })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
