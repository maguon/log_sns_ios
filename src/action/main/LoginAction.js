import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'


export const toLogin = (props) => async (dispatch, getState) => {
    const {LoginReducer: {user, password}} = getState()
    try {
        //参数
        const params = {userName: user, password: password}
        // 基本检索URL
        let url = `${apiHost}/userLogin`;
        const res = await HttpRequest.post(url, params)
        if (res.success === true) {
            Toast.loading('Loading...', 0.5, () => {
                props.navigation.navigate("Main")
            })

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

        } else {
            Toast.loading('Loading...', 0.5, () => {
                Alert.alert("", res.msg, [{text: "确定"}])
            })
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
