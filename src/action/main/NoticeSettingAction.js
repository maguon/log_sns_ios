import {apiHost} from '../../config/HostConfig';
import HttpRequest from '../../utils/HttpRequest';
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native';
import * as actionType from '../../actionType/index'

export const getNoticeList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/notificationSettings`;

        const res = await HttpRequest.get(url);
        console.log('res',res)
        if(res.success){
            const values  ={
                noticeId:res.result[0]._id,
                info: res.result[0].info,
                praise: res.result[0].praise,
                comments: res.result[0].comments,
                beConcernedAbout: res.result[0].beConcernedAbout,
                others: res.result[0].others,
                worksReleasedByFollowers: res.result[0].worksReleasedByFollowers,
                recommendedWorks: res.result[0].recommendedWorks

            }
            dispatch(setNoticeInfo(values))
        }else {

        }


    } catch (err) {
        Toast.fail(err.message)
    }

}
export const setNoticeInfo = values => (dispatch) => {
    dispatch({type: actionType.NoticeSettingType.SET_NOTICE_INFO, payload: {noticeInfo: values}})
}


export const change = value => async (dispatch, getState) => {

    const {LoginReducer: {userId}, NoticeSettingReducer: {noticeId}} = getState()
    try {
        console.log('res',value)
        let url = `${apiHost}/user/${userId}/notificationSettings/${noticeId}/notificationSettings`;
        const res = await HttpRequest.put(url, value);
        console.log('res',res)
        if (res.success) {
            dispatch(setNoticeInfo(value))
        }else {

        }
    } catch (err) {
        Toast.fail(err.message)
    }
}




