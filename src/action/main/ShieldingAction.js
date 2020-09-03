import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

const pageSize = 20


export const shieldList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}, ShieldingReducer: {shieldingList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/blockList?start=${shieldingList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({
                    type: actionType.ShieldingActionType.get_shieldingList_end,
                    payload: {shieldingList: res.result,isComplete: true}
                })
            } else {
                dispatch({
                    type: actionType.ShieldingActionType.get_shieldingList_success,
                    payload: {shieldingList: res.result,isComplete: false}
                })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}



export const shieldListDel=()=>async (dispatch, getState)=>{
    const {LoginReducer: {userId}, ShieldingReducer: {shieldingList}} = getState()

     let url = `${apiHost}/user/${userId}/blockList?start=0&size=${shieldingList.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ShieldingActionType.get_shieldingList, payload: {shieldingList: res.result}})
        }

}


export const removeShielding = (param) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {ShieldingUserId} = param
    console.log(ShieldingUserId)
    try {
        const url = `${apiHost}/user/${userId}/blockUser/${ShieldingUserId}/del`
        const res = await HttpRequest.del(url)
        console.log(res)
        if (res.success) {
            dispatch(shieldListDel())
        } else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
