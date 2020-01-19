import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/privacie`

        const res = await HttpRequest.get(url)
        if (res.success) {
            const values = {
                PrivacyId: res.result[0]._id,
                name: res.result[0].name,
                phone: res.result[0].phone,
                city: res.result[0].city,
                car: res.result[0].car,
                recommendToFriends: res.result[0].recommend_to_friends,
                msgAuthority: res.result[0].msg_authority
            }
            dispatch(setPrivacyInfo(values))
        } else {
        }


    } catch (err) {
        Toast.fail(err.message)
    }

}
export const setPrivacyInfo = values => (dispatch) => {
    dispatch({type: actionType.PrivacySettingType.set_privacyInfo, payload: {privacyInfo: values}})
}


export const change = value => async (dispatch, getState) => {
    console.log(value)
    const {LoginReducer: {userId}, PrivacySettingReducer: {PrivacyId}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/privacie/${PrivacyId}/privacie`
        const res = await HttpRequest.put(url, value)
        if (res.success) {
            dispatch(setPrivacyInfo(value))
        } else {

        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


//
// export const setMessageAuthority = (value ) => async (dispatch, getState) => {
//     const {LoginReducer: {userId},PrivacySettingReducer:{ PrivacyId,nameDisplay, phoneDisplay, cityDisplay, carDisplay, recommendFriends, messageAuthority}} = getState()
//     try {
//         let newValue= value == true ? "1" : "0"
//         dispatch({type:actionType.PrivacySettingType.setMessageAuthority,payload:{messageAuthority:newValue}})
//         let param={
//             name_display: nameDisplay,
//             phone_display: phoneDisplay,
//             city_display:cityDisplay,
//             car_display: carDisplay,
//             recommend_to_friends: recommendFriends,
//             message_authority: newValue
//         }
//         let url = `${apiHost}/user/${userId}/privacySettings/${PrivacyId}/privacySettings`;
//         const res = await HttpRequest.put(url,param);
//     } catch (err) {
//         Toast.fail(err.message)
//     }
//
// }

