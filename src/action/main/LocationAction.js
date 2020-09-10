import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import { ObjectToUrl } from '../../utils/util'
import * as actionType from '../../actionType/index'
import {Toast} from '@ant-design/react-native'
import {Alert} from "react-native";

export const getAddress = (param) => async (dispatch) => {
    dispatch({ type: actionType.LocationType.get_addressAtMap_waiting, payload: {} })
    try {
        const url = `http://restapi.amap.com/v3/geocode/regeo?${ObjectToUrl(param)}`
        const res = await HttpRequest.get(url)
        console.log("res",res)
        if (res.info=='OK') {
            dispatch({ type: actionType.LocationType.get_addressAtMap_success, payload: { addressInfo: res.regeocode } })
        } else {
            dispatch({ type: actionType.LocationType.get_addressAtMap_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionType.LocationType.get_addressAtMap_error, payload: { errorMsg: err } })
    }
}


export const LocationPost = (param) => async (dispatch,getState) => {
    const {navigation,LoginReducer: {userId}} = getState()
    console.log(param)
    try {
       const params={
            address:[param.longitude,param.latitude],
            addressName: param.addressName,
            addressReal: param.addressReal,
            remarks: ""
       }

        const url = `${apiHost}/user/${userId}/userLocaColl`
        const res = await HttpRequest.post(url, params)
        console.log("res",res)
        if (res.success) {
        console.log("收藏成功")
            Alert.alert("", "收藏成功", [ {
                text: "确定", onPress: () => {
                    param.navigation.pop()
                }
            }])
        } else {
            Toast.info(res.msg)
        }
    } catch (err) {
        Toast.fail(err)
    }
}
