import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

//确认
export const onChangePhone = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId},ChangePhoneReducer:{newPhone,sendCode}} = getState()
    console.log(getState())
    try {
        if (newPhone == '') {
            Toast.info("请您输入新手机号")
        } else if (newPhone.length != 11) {
            Toast.info("您输入手机号不是11位")
        } else if (sendCode == '') {
            Toast.info("请您输入验证码")
        } else{
            let param={
                phone:newPhone,
                code:sendCode
            }
            // 基本检索URL
            let url = `${apiHost}/user/${userId}/phone`
            const res = await HttpRequest.put(url,param)
            if(res.success){
                Toast.loading('Loading...', 0.5, () => {
                    Alert.alert("", "换绑成功，确认返回", [{text: "确定", onPress: () => props.navigation.goBack()}])
                })
            }else {
                Toast.loading('Loading...', 0.5, () => {
                    Alert.alert("", res.msg, [{text: "确定"}])
                })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}

//发验证码
export const onSendCode = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ChangePhoneReducer:{newPhone}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/phone/${newPhone}/resetSms`
        const res = await HttpRequest.post(url)
    } catch (err) {
        Toast.fail(err.message)
    }

}
