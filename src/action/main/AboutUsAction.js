import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getAboutUsInfo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/about`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.AboutUsType.set_AboutUs_Info, payload: {aboutUsList: res.result[0]}})
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
