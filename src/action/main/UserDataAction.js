import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'

export const getUserData = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userInfoAndDetail`;
        const res = await HttpRequest.get(url);
        console.log(res.result[0])
        if(res.success){
            dispatch({type:actionType.UserDataType.get_UserData,payload:{userData:res.result[0]}})
            dispatch({type:actionType.UserDataType.get_UserDetail_Info,payload:{userDetailInfo:res.result[0].user_detail_info[0]}})
        }else {

        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
