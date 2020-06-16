import {apiHost, fileHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import * as action from '../../action/index'

export const getUserData = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userInfoAndDetail`
        const res = await HttpRequest.get(url)
        // console.log(res.result[0])
        if (res.success) {
            dispatch({type: actionType.UserDataType.get_UserData, payload: {userData: res.result[0]}})
            dispatch({
                type: actionType.UserDataType.get_UserDetail_Info,
                payload: {userDetailInfo: res.result[0].user_detail_info[0]}
            })
        } else {

        }

    } catch (err) {
        Toast.fail(err.message)
    }

}


export const setHead = (value) => async (dispatch, getState) => {

    try {
        console.log(value)
        const {LoginReducer: {userId}} = getState()
        const fileUrl = `${fileHost}/user/${userId}/image`
        const fileRes = await HttpRequest.postFile(fileUrl, {
            key: 'image',
            imageUrl: value.url,
            imageType: 0,
            imageName:'image'
        })

        if (fileRes.success) {
            const url = `${apiHost}/user/${userId}/avatarImage`
            const res = await HttpRequest.put(url, {avatar: `${fileHost}/image/${fileRes.imageId}`})
            if (res.success) {
                Toast.success('修改成功', 0.5,()=>{
                    dispatch(getUserData())
                    dispatch(action.PersonCenterAction.getUserInfo())
                })
            } else {
                console.log(res.msg)
            }
        }
    } catch (err) {
        console.log(err)
    }
}
