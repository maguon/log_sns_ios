import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import * as action from "../index";
import CacheHelper from "react-native-rn-cacheimage/CacheHelper";

export const getUserInfo = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userDetail`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.PersonCenterType.get_UserInfo, payload: {userInfo: res.result[0]}})
        } else {
            Alert.alert("", res.msg, [{text: "确定"}])
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

export const getSize = async () => {
    dispatch(action.PersonCenterAction.getUserInfo(props))
    try {
        size = await CacheHelper.getCacheSizeFormat();
    } catch (error) {
        // Error retrieving data
    }
}
