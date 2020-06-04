import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import { ObjectToUrl } from '../../utils/util'
import * as actionType from '../../actionType/index'

export const getAddress = (param) => async (dispatch) => {
    dispatch({ type: actionType.LocationType.get_addressAtMap_waiting, payload: {} })
    try {
        const url = `http://restapi.amap.com/v3/geocode/regeo?${ObjectToUrl(param)}`
        const res = await HttpRequest.get(url)
        // console.log("url",url)
        if (res.info=='OK') {
            dispatch({ type: actionType.LocationType.get_addressAtMap_success, payload: { addressInfo: res.regeocode } })
        } else {
            dispatch({ type: actionType.LocationType.get_addressAtMap_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionType.LocationType.get_addressAtMap_error, payload: { errorMsg: err } })
    }
}
