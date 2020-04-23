import HttpRequest from '../../utils/HttpRequest'
import * as actionType from "../../actionType/index"
import { ObjectToUrl } from '../../utils/util'
import {Alert} from "react-native"
import {Toast} from "@ant-design/react-native";


export const setMyCamera = (param) => async (dispatch, getState) => {
    const { LoginReducer: {userId}} = getState()
    try {
        const url = `http://stg.myxxjs.com:9002/api/user/${userId}/video?${ObjectToUrl({ videoType:1 })}&${ObjectToUrl({ userType:10})}`
        const array=param.split("/")
        const name=array[array.length-1];
        // console.log("222",url)
        const res = await HttpRequest.postVideo(url, {
            key:'file', param,name:name
        })

        if (res.success) {
            console.log("id",res.result.id)
            dispatch({ type: actionType.CameraType.my_Camera_success, payload: {id:param } })
            Alert.alert(
                '',
                `上传成功！`,
                [
                    {text: '确定', onPress: () =>  param.props.navigation.pop(), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else {
            dispatch({ type: actionType.CameraType.my_Camera_failed, payload: { failedMsg: res.msg } })
            Alert.alert(
                '',
                `上传失败:${res.msg}!`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        dispatch({ type: actionType.CameraType.my_Camera_error, payload: { errorMsg: err } })
        Alert.alert(
            '',
            `上传失败:${err}!`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}

export const setData = (param) => async (dispatch, getState) => {
    try {
      dispatch({type:actionType.CameraType.set_imageList,payload:{imageList:param}})
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const delImageList = (param) => async (dispatch, getState) => {
    try {
        dispatch({type:actionType.CameraType.del_imageList,payload:{imageList:param}})
    } catch (err) {
        Toast.fail(err.message)
    }
}

export const setCameraList = (param) => async (dispatch, getState) => {
    try {
        dispatch({type:actionType.CameraType.del_cameraList,payload:{cameraList:param}})
    } catch (err) {
        Toast.fail(err.message)
    }
}







