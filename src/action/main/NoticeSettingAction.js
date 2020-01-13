import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const getNoticeList = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        console.log(userId)
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/notice`
        const res = await HttpRequest.get(url)
        console.log('res',res)

        if(res.success){
            const values  ={
                noticeId:res.result[0]._id,
                sysmsg: res.result[0].sysmsg,
                praise: res.result[0].praise,
                comment: res.result[0].comment,
                attention: res.result[0].attention,
                others: res.result[0].others,
                followAddmsg: res.result[0].follow_addmsg,
            }
            dispatch(setNoticeInfo(values))
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
export const setNoticeInfo = values => (dispatch) => {
    dispatch({type: actionType.NoticeSettingType.set_Notice_Info, payload: {noticeInfo: values}})
}


export const change = value => async (dispatch, getState) => {

    const {LoginReducer: {userId}, NoticeSettingReducer: {noticeId}} = getState()
    try {
        console.log('res',value)
        let url = `${apiHost}/user/${userId}/notice/${noticeId}/notice`
        const res = await HttpRequest.put(url, value)
        console.log('res',res)
        if (res.success) {
            dispatch(setNoticeInfo(value))
        }else {

        }
    } catch (err) {
        Toast.fail(err.message)
    }
}




