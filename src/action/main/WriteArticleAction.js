import {apiHost} from '../../config/HostConfig'
import * as actionType from '../../actionType/index'
import httpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'

const iosMapKey = '22d16ea40b6fdb3ebc3daa1b48db3287'

export const createArticle = (props) => async (dispatch, getState) => {
    console.log(props)
    try {
        const { WriteArticleReducer: { data ,posSwitch,content}, LoginReducer: {userId} } = getState()
        dispatch({ type: actionType.WriteArticleType.create_article_waiting })
        const url = `${apiHost}/user/${userId}/msg`
        console.log('url', url)
        let params = {}
        if(props.navigation.state.params.title=="发布文章"){
            if (posSwitch) {
                params = {type: 1, carrier: 1, info: content, address: [data.longitude, data.latitude], addressName: data.currentAddrName, addressReal: data.currentAddrReal, addressShow: 1,}
            } else {
                params = {type: 1, carrier: 1, info: content, addressShow: 0,}
            }
        }else {
            if (posSwitch) {
                params = {type: 2, carrier: 1, info: content, address: [data.longitude, data.latitude], addressName: data.currentAddrName, addressReal: data.currentAddrReal, addressShow: 1,}
            } else {
                params = {type: 2, carrier: 1, info: content, addressShow: 0,}
            }
        }
        console.log('params', params)
        const res = await httpRequest.post(url, params)
        console.log('res', res)
        if (res.success) {
        Alert.alert("", "发布成功，确认返回", [{text: "确定", onPress: () =>  props.navigation.pop()}])
            dispatch({ type: actionType.WriteArticleType.create_article_success })
        } else {
            dispatch({ type:actionType.WriteArticleType.create_article_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionType.WriteArticleType.create_article_failed, payload: { failedMsg: `${err}` } })
    }
}

export const getCurrentAddr = value => async (dispatch) => {
    try {
        // dispatch({ type:actionType.WriteArticleType.get_currentAddr_waiting })
        const url = `https://restapi.amap.com/v3/geocode/regeo?key=${iosMapKey}&location=${value.longitude},${value.latitude}&extensions=base&batch=false`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.info == 'OK') {
            console.log('ok')
            dispatch({
                type: actionType.WriteArticleType.get_currentAddr_success, payload: {
                    currentAddrName: res.regeocode.formatted_address,
                    currentAddrReal: `${res.regeocode.addressComponent.province ? res.regeocode.addressComponent.province : ''}${res.regeocode.addressComponent.city ? res.regeocode.addressComponent.city : ''}${res.regeocode.addressComponent.district ? res.regeocode.addressComponent.district : ''}${res.regeocode.addressComponent.township ? res.regeocode.addressComponent.township : ''}${res.regeocode.addressComponent.streetNumber.street ? res.regeocode.addressComponent.streetNumber.street : ''}${res.regeocode.addressComponent.streetNumber.number ? res.regeocode.addressComponent.streetNumber.number : ''}`,
                    longitude: value.longitude,
                    latitude: value.latitude
                }
            })
        } else {
            dispatch({ type: actionType.WriteArticleType.get_currentAddr_failed, payload: { failedMsg: `${res.infocode}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionType.WriteArticleType.get_currentAddr_failed, payload: { failedMsg: `${err}` } })
    }
}

export const removeCurrentAddr = () => (dispatch) => {
    dispatch({ type: actionType.WriteArticleType.remove_currentAddr })
}
