import HttpRequest from "../../utils/HttpRequest";
import * as actionType from "../../actionType";
import {apiHost} from "../../config/HostConfig";
import {Alert} from "react-native";


export const getContent = value => async (dispatch,getState) => {
    try {
        const {LoginReducer: {userId}} = getState()
        const {item:{_id}}=value
        const getUrl = `${apiHost}/user/${userId}/msg/${_id}/report`
        const getRes = await HttpRequest.get(getUrl)
        if(getRes.result!=""){
            dispatch({type: actionType.ReportType.set_Button_text, payload: {buttonText: "已举报，受理中"}})
        }else {
            dispatch({type: actionType.ReportType.set_Button_text, payload: {buttonText: "提交"}})
        }
    } catch (err) {
        console.log('err', err)
    }
}

export const postContent = value => async (dispatch,getState) => {
    try {
        console.log(value)
        const {LoginReducer: {userId}} = getState()
        const {navigation,item:{_id},remark}=value
        if(remark==""){
            Alert.alert("", "举报内容不能为空", [{text: "确定"}])
        }else {
            const url = `${apiHost}/user/${userId}/msg/${_id}/report`
            const res = await HttpRequest.post(url, {remarks: remark})
            console.log('res', res)
            if (res.success) {
                Alert.alert("", "举报提交成功", [{
                    text: "确定", onPress: () => {
                        navigation.pop()
                    }
                }])
            } else {
                Alert.alert("", "提交失败,稍后再试", [{
                    text: "返回", onPress: () => {
                        navigation.pop()
                    }
                }])
            }
        }
    } catch (err) {
        console.log('err', err)
    }
}
