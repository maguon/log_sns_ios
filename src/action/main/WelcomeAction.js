import * as actionType from '../../actionType/index'
import * as action from '../../action/index'
import HttpRequest from '../../utils/HttpRequest'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import { ObjectToUrl } from '../../utils/ObjectToUrl'
import * as ios_app from '../../../app.json'
// import requestHeaders from '../../utils/RequestHeaders'
// import { sleep, randomString } from '../../util/util'
import DeviceInfo from 'react-native-device-info'
import {apiHost} from '../../config/HostConfig'



export const start = (props) => async (dispatch, getState) => {
    dispatch({type:actionType.WelcomeActionType.Welcome_app_waiting})
    dispatch(loadUniqueID({
        ...props,
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remarks: ''
        },
        deviceInfo: {
            uniqueID: ''
        }
    }))
}

/**
 * 第一步：获取uniqueID，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有DeviceInfo.getUniqueID()获取
 */
export const loadUniqueID = param => async (dispatch, getState) => {
    // console.log('loadUniqueIDParam', param)
    let uniqueID
    try {
        uniqueID = await localStorage.load({ key: localStorageKey.UNIQUEID })
        // dispatch(getUniqueID(uniqueID))
    } catch (err) {
        uniqueID = DeviceInfo.getUniqueId()
        localStorage.save({ key: localStorageKey.UNIQUEID, data: uniqueID })
    }
    // console.log('uniqueID', uniqueID)
    dispatch(getCommunicationSetting({ ...param, deviceInfo: { ...param.deviceInfo, uniqueID } }))
}

/**
 * 第二步：获取host，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有跳转到login页面
 */
export const getCommunicationSetting = param => async (dispatch) => {
    // console.log("param"+JSON.stringify(param))
    const currentStep = 1
    try {
        dispatch((validateVersion(param)))
    } catch (err) {
        dispatch({ type: actionType.WelcomeActionType.Welcome_app_error, payload: { currentStep, param, msg: '获取host失败' } })
        param.navigation.navigate('LoginPage')
    }
}

/**
 * 第三步：获取最新version信息并对比，
 *          如果获取失败，停止初始化流程，等待用户手动点击获取
 *          如果获取成功，对比是否需要强制更新 force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
 */
export const validateVersion = param => async (dispatch, getState) => {
    // console.log('validateVersionParam', param)
    const currentStep = 2
    try {
        const url = `${apiHost}/app?${ObjectToUrl({ appType: ios_app.type, deviceType: ios_app.ios })}`
        // console.log('url', url)

        const res = await HttpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            const versionInfo = {
                currentVersion: ios_app.version,
                newestVersion: '',
                url: '',
                remarks: '',
                force_update: 0
            }
            let versionList = res.result
                .filter(item => {
                    return item.version > ios_app.version
                })
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    if (a.version < b.version) {
                        return 1
                    }
                    if (a.version > b.version) {
                        return -1
                    }
                    return 0
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remarks = versionList[0].remarks
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            // console.log('versionInfo', versionInfo)
            if (versionInfo.force_update != 1) {
                dispatch(loadLocalStorage({ ...param, version: versionInfo }))
            }else{
                dispatch({ type: actionType.WelcomeActionType.Welcome_app_complete, payload: { param:{...param, version: versionInfo} } })
            }
        } else {
            // console.log('failed获取版本错误')
            dispatch({ type: actionType.WelcomeActionType.Welcome_app_failed, payload: { currentStep, msg: '获取版本错误', param } })
        }
    } catch (err) {
        // console.log('error获取版本错误', err)
        dispatch({ type: actionType.WelcomeActionType.Welcome_app_error, payload: { currentStep, msg: '获取版本错误', param } })
    }
 }




/**
 * 第四步：获取最新user数据，
 *          如果获取失败，跳转到登录页面
 *          如果获取成功，继续流程
 */
export const loadLocalStorage = param => async (dispatch) => {
    // console.log('loadLocalStorageParam', param)
    const currentStep = 3
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })

        console.log(localStorageRes)
        if (localStorageRes.token && localStorageRes.userId) {
            dispatch(validateToken({ param, user: localStorageRes }))
            await dispatch({type: actionType.LoginActionType.set_UserId, payload: {userId: localStorageRes.userId}})
        } else {
            param.navigation.navigate('LoginPage')
        }
    } catch (err) {
        dispatch({ type: actionType.WelcomeActionType.Welcome_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        param.navigation.navigate('LoginPage')
    }
}


/**
 * 第五步：先获取用户信息，然后更新token，
 *          如果获取用户信息失败，跳转到登录
 *          如果获取用户信息成功，继续更新token
 *          如果更新token失败，跳转到登录
 *          如果更新token成功，继续流程
 */
export const validateToken = ({ param, user }) => async (dispatch, getState) => {
    // console.log('validateTokenParam', param)
    const currentStep = 4
    try {
        const { userId, token } = user
        const url = `${apiHost}/user/${userId}/token/${token}`
        // console.log('url', url)
        const res = await HttpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            const getUserInfoUrl = `${apiHost}/user?${ObjectToUrl({ userId: userId })}`
            const getUserInfoRes = await HttpRequest.get(getUserInfoUrl)
            console.log(getUserInfoRes)
            if (getUserInfoRes.success) {
                const { _id,  type,  status} = getUserInfoRes.result[0]
                const userLogin = {userId:_id, type, status, token: res.result.accessToken}
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: userLogin })
                // requestHeaders.set('auth-token', res.result.accessToken)
                // requestHeaders.set('user-type', type)
                // requestHeaders.set('user-name', mobile)
                await dispatch({ type: actionType.LoginActionType.set_UserLogin, payload: { userLogin } })

                dispatch(goMain(param))
            } else {
                dispatch({ type: actionType.WelcomeActionType.Welcome_app_failed, payload: { currentStep, msg: '无法换token', param } })
                param.navigation.navigate('LoginPage')
            }
        }
        else {
            dispatch({ type: actionType.WelcomeActionType.Welcome_app_failed, payload: { currentStep, msg: '无法换token', param } })
            param.navigation.navigate('LoginPage')
        }
    } catch (err) {
        dispatch({ type: actionType.WelcomeActionType.Welcome_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        param.navigation.navigate('LoginPage')
    }
}


export const goMain = param => async (dispatch) => {
    try {
        dispatch({ type: actionType.WelcomeActionType.Welcome_app_complete, payload: { param } })
        param.navigation.navigate('Main')
    } catch (err) {

    }

}
