import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'

export const toLogin = (props) => async (dispatch, getState) => {
    const {LoginReducer: {user, password}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/userLogin`;
        const res = await HttpRequest.get(url);


    } catch (err) {
        Toast.fail(err.message)
    }

}
