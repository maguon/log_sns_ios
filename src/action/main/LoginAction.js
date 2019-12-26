import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';


export const toLogin = (props) => async (dispatch, getState) => {
    const {LoginReducer: {user, password}} = getState()
    try {
        //参数
        const params = {userName: user, password: password};
        // 基本检索URL
        let url = `${apiHost}/userLogin`;
        const res = await HttpRequest.post(url,params);
        if (res.success === true) {
            Toast.loading('Loading...', 0.5,()=>{props.navigation.navigate("Main")})
            // props.navigation.navigate("Main")
        } else {
            Toast.loading('Loading...', 0.5,()=>{ Alert.alert("",res.msg, [{text: "确定"}])})
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
