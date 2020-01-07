import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'

export const getUserInfo = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userDetail`;
        const res = await HttpRequest.get(url);
        console.log(res)
        if(res.success){
            dispatch({type:actionType.PersonCenterType.GET_USERINFO,payload:{userInfo:res.result[0]}})
        }else {
            Alert.alert("",res.msg, [{text: "确定"}])
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
