import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getChangePassWord = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user?userId=${userId}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ChangePassWordType.get_Phone, payload: {phone: res.result[0].phone}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const getCode = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}, ChangePassWordReducer: {phone}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/phone/${phone}/resetSms`
        const res = await HttpRequest.post(url)
    } catch (err) {
        Toast.fail(err.message)
    }
}

export const onChangePassWord = (props) => async (dispatch, getState) => {
    const {ChangePassWordReducer: {phone, changeCode, changePassword, changeNewPassword}} = getState()
    try {
        if (changeCode == '') {
            Toast.info("请您输入验证码")
        } else if (changePassword == '') {
            Toast.info("您设置的密码不能为空")
        } else if (changePassword.length < 6 || changePassword.length > 15) {
            Toast.info("设置的密码不得小于6位或大于15位")
        } else if (changePassword != changeNewPassword) {
            Toast.info("两次密码输入不一致")
        } else {
            let param = {
                code: changeCode,
                newPassword: changePassword
            }
            // 基本检索URL
            let url = `${apiHost}/phone/${phone}/password`
            const res = await HttpRequest.put(url, param)
            if (res.success) {
                Toast.loading('Loading...', 0.5, () => {
                    Alert.alert("", "修改成功，确认返回", [{text: "确定", onPress: () => props.navigation.goBack()}])
                })
            } else {
                Toast.loading('Loading...', 0.5, () => {
                    Alert.alert("", res.msg, [{text: "确定"}])
                })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}



