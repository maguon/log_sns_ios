import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


const pageSize = 20

export const getLocationList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}, LocationCollectionReducer: {LocationList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userLocaColl?start=${LocationList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({
                    type: actionType.LocationCollectionType.get_location_end,
                    payload: {LocationList: res.result,isComplete: true}
                })
            } else {
                dispatch({
                    type: actionType.LocationCollectionType.get_locationList,
                    payload: {LocationList: res.result,isComplete: false}
                })
            }

        }
    } catch (err) {
        Toast.fail(err.message)
    }
}



export const update=()=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},LocationCollectionReducer: {LocationList}} = getState()
        let url = `${apiHost}/user/${userId}/userLocaColl?start=0&size=${LocationList.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.LocationCollectionType.get_location, payload: {LocationList: res.result}})
        }

}

export const clearLocationList = (prama) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(prama)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userLocaColl/${prama.id}/del`
        const res = await HttpRequest.del(url)

        if (res.success) {
            dispatch(update())
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
