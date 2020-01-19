import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getContactList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/contact`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ContactType.get_contactList, payload: {contactList: res.result}})
        } else {
            Toast.fail(res.msg)
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}
