import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'

export const getList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/privacySettings`;

        const res = await HttpRequest.get(url);
        if(res.success){
            const values  ={
                PrivacyId:res.result[0]._id,
                name_display: res.result[0].name_display,
                phone_display: res.result[0].phone_display,
                city_display: res.result[0].city_display,
                car_display: res.result[0].car_display,
                recommend_to_friends: res.result[0].recommend_to_friends,
                message_authority: res.result[0].message_authority
            }
            dispatch(setPrivacyInfo(values))
        }else {
        }


    } catch (err) {
        Toast.fail(err.message)
    }

}
export const setPrivacyInfo = values => (dispatch) => {
    dispatch({type: actionType.PrivacySettingType.SET_PRIVACYINFO, payload: {privacyInfo: values}})
}


export const change = value => async (dispatch, getState) => {

    const {LoginReducer: {userId}, PrivacySettingReducer: {PrivacyId}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/privacySettings/${PrivacyId}/privacySettings`;
        const res = await HttpRequest.put(url, value);
        if (res.success) {
            dispatch(setPrivacyInfo(value))
        }else {

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

