import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'

export const followStatus = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(props)
    const {item} = props
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/follow?userById=${item.user_detail_info[0]._user_id}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            if(res.result!=""){
                dispatch({type: actionType.ItemType.get_Focus, payload: {focus: true}})
            }else {
                dispatch({type: actionType.ItemType.get_Focus, payload: {focus: false}})
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }

}

//取消关注
export const cancelFollow = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(value)
    // try {
    //     // 基本检索URL
    //     let url = `${apiHost}/user/${userId}/followUser/${value}/del`
    //     const res = await HttpRequest.del(url)
    //     if(res.success){
    //     }else {
    //         Toast.fail(res.msg)
    //     }
    //
    // } catch (err) {
    //     Toast.fail(err.message)
    // }

}

//关注
export const follow = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
   console.log(value)
    // try {
    //     // 基本检索URL
    //     let url = `${apiHost}/user/${userId}/userRelation`
    //     const res = await HttpRequest.post(url,{userById:value})
    //     if(res.success){
    //
    //     }else {
    //         Toast.fail(res.msg)
    //     }
    //
    // } catch (err) {
    //     Toast.fail(err.message)
    // }

}
