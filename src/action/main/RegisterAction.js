import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from "@ant-design/react-native"

export const register = (props) => async (dispatch, getState) => {
    try {
        const {RegisterReducer: {account, password, pass_word, code}} = getState()
        console.log(props)
        console.log(getState())
        if (account == '') {
            Toast.info("请您输入手机号")
        } else if (account.length != 11) {
            Toast.info("手机号不足11位，请重新输入")
        } else {
            // let res = await HttpRequest.post(apiHost + `/phone/${account}/regSms`);
            // if(res.success){
            //  console.log('res',res)
            // }

            if (code == '') {
                Toast.info("请您输入验证码")
            } else if (password == '') {
                Toast.info("您设置的密码不能为空")
            } else if (password.length < 6 || password.length > 15) {
                Toast.info("设置的密码不得小于6位或大于15位")
            } else if (password != pass_word) {
                Toast.info("两次密码输入不一致")
            } else if (props.navigation.state.routeName == "Registered") {
                //注册
                let params = {
                    phone: account,
                    password: password,
                    captcha: code,
                    type: 0,
                }
                let res = await HttpRequest.post(apiHost + `/user`, params)
                if (res.success) {
                    Toast.loading('Loading...', 0.5, () => {
                        Alert.alert("", "注册成功，返回登录", [{text: "确定", onPress: () => props.navigation.goBack()}])
                    })
                } else {
                    Toast.loading('Loading...', 0.5, () => {
                        Alert.alert("", res.msg, [{text: "确定"}])
                    })
                }

            } else {
                //忘记密码
                let params = {
                    code: code,
                    newPassword: password,
                }
                let res = await HttpRequest.put(apiHost + `/phone/${account}/password`, params)

                if (res.success) {
                    Toast.loading('Loading...', 0.5, () => {
                        Alert.alert("", "修改成功，返回登录", [{text: "确定", onPress: () => props.navigation.goBack()}])
                    })
                } else {
                    Toast.loading('Loading...', 0.5, () => {
                        Alert.alert("", res.msg, [{text: "确定"}])
                    })
                }
            }
        }

    } catch (err) {

    }
};
//注册获得验证码
export const getCode = (props) => async (dispatch, getState) => {
    try {

        const {RegisterReducer: {account}} = getState()
        let res = await HttpRequest.post(apiHost + `/phone/${account}/regSms`)
        if (res.success) {
            console.log('success')
        } else {
            Toast.loading('Loading...', 0.5, () => {
                Alert.alert("", `${res.msg},返回登录`, [{text: "确定", onPress: () => props.navigation.goBack()}])
            })
        }
    } catch (err) {

    }
};
//忘记密码获得验证码
export const forgotGetCode = (props) => async (dispatch, getState) => {
    try {
        const {RegisterReducer: {account}} = getState()
        let res = await HttpRequest.post(apiHost + `/phone/${account}/passwordSms`)
        if (res.success) {
            console.log('success')
        } else {
            Toast.loading('Loading...', 0.5, () => {
                Alert.alert("", `${res.msg},返回登录`, [{text: "确定", onPress: () => props.navigation.goBack()}])
            })
        }
    } catch (err) {

    }
};
