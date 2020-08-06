import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import DeviceInfo from 'react-native-device-info'
import * as ios_app from '../../../app.json'
import * as action from '../../action/index'

export const cleanLogin = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const loadDeviceToken = await localStorage.load({key: localStorageKey.DEVICETOKEN})

    try {
        //参数
        const params = {deviceToken: loadDeviceToken, deviceType: ios_app.ios}
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userLogout`;
        const res = await HttpRequest.post(url, params)
        if (res.success) {
            localStorage.save({
                key: localStorageKey.USER,
                data: ""
            })

            dispatch({type: actionType.LoginActionType.clean_login, payload: {user: ""}})
            props.navigation.navigate('LoginPage')
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}


export const toLogin = (props) => async (dispatch, getState) => {
    const {LoginReducer: {user, password}} = getState()
    const deviceName = DeviceInfo.getModel()
    const versionName = DeviceInfo.getSystemVersion();
    const loadDeviceToken = await localStorage.load({key: localStorageKey.DEVICETOKEN})
    try {
        //参数
        const params = {userName: user, password: password}
        // 基本检索URL
        let url = `${apiHost}/userLogin`;
        const res = await HttpRequest.post(url, params)
        if (res.success === true) {

            const param = {
                deviceToken: loadDeviceToken,
                version: ios_app.version,
                appType: 1,
                deviceType: ios_app.ios,
                deviceInfo: [{
                    deviceName: deviceName,
                    osVersion: versionName
                }]
            }
            console.log("param", res.result.userId)
            let deviceUrl = `${apiHost}/user/${res.result.userId}/userDevice`;
            const deviceRes = await HttpRequest.post(deviceUrl, param)
            if (deviceRes.success) {
                console.log("发送用户信息")
                //用户信息
                const user = {
                    userId: res.result.userId, status: res.result.status, type: res.result.type,
                    token: res.result.accessToken
                }
                //更新reducer
                dispatch({type: actionType.LoginActionType.set_UserLogin, payload: {user}})
                dispatch({type: actionType.LoginActionType.set_UserId, payload: {userId: res.result.userId}})
                //保存本地
                localStorage.save({
                    key: localStorageKey.USER,
                    data: user

                })
                localStorage.save({
                    key: localStorageKey.SERVERADDRESS,
                    data: {
                        host: apiHost
                    }
                })
                dispatch(action.WelcomeAction.goMain(props))
            } else {
                console.log("发送用户信息失败")
            }

        } else {
            Toast.loading('Loading...', 0.5, () => {
                Alert.alert("", res.msg, [{text: "确定"}])
            })
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
