import {apiHost, fileHost} from '../../config/HostConfig'
import * as actionType from '../../actionType/index'
import httpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import* as RNFS from 'react-native-fs'

const iosMapKey = '22d16ea40b6fdb3ebc3daa1b48db3287'
const DocumentDirectoryPath = RNFS.DocumentDirectoryPath
let carrierType = ""
export const createArticle = (props) => async (dispatch, getState) => {
    console.log(props)
    try {
        const {WriteArticleReducer: {data, posSwitch, content}, HomeReducer: {setFile}, LoginReducer: {userId}} = getState()
        dispatch({type: actionType.WriteArticleType.create_article_waiting})
        let params = {}

        const typeBool = setFile.filter((item) => {
            return item.preview != ""
        })
        if (setFile!="") {
            if (typeBool.length == 0) {
                carrierType = 2
                const fileUrl = `${fileHost}/user/${userId}/image`
                const fileRes = await Promise.all(setFile.map(item => httpRequest.postFile(fileUrl, {
                    key: 'image',
                    imageUrl: item.url,
                    imageType: 0,
                    imageName: 'image'
                })))
                setFile.map((item, index) => {
                    item.url = fileRes[index].imageId
                })

            } else {
                console.log('setFile', setFile)
                carrierType = 3
                const fileUrl = `${fileHost}/user/${userId}/media`
                const fileRes = await Promise.all(setFile.map(item => httpRequest.postVideo(fileUrl, {
                    key: 'video',
                    video: item.url,
                    preview: item.preview,
                })))
                console.log('fileRes', fileRes)

                    setFile.map((item, index) => {
                        item.url = fileRes[index].result.url
                        item.preview=fileRes[index].result.preview

                    })
                RNFS.unlink(`${DocumentDirectoryPath}/images`)
                    .then(()=>console.log("成功删除"))
                    console.log('setFile', setFile)


            }
        } else {
            carrierType = 1
        }

        // console.log('carrierType', carrierType)
        // console.log('setFile', setFile)
        if (props.navigation.state.params.title == "发布求助") {
            if (posSwitch) {
                params = {
                    type: 2,
                    carrier: carrierType,
                    info: content,
                    address: [data.longitude, data.latitude],
                    addressName: data.currentAddrName,
                    addressReal: data.currentAddrReal,
                    addressShow: 1,
                    media: setFile
                }
            } else {
                params = {type: 2, carrier: carrierType, info: content, addressShow: 0, media: setFile}
            }
        } else {
            if (posSwitch) {
                params = {
                    type: 1,
                    carrier: carrierType,
                    info: content,
                    address: [data.longitude, data.latitude],
                    addressName: data.currentAddrName,
                    addressReal: data.currentAddrReal,
                    addressShow: 1,
                    media: setFile
                }
            } else {
                params = {type: 1, carrier: carrierType, info: content, addressShow: 0, media: setFile}
            }
        }
        console.log('params', params)
        const url = `${apiHost}/user/${userId}/msg`
        const res = await httpRequest.post(url, params)
        console.log('res', res)
        if (res.success) {

            Alert.alert("", "发布成功，确认返回", [{
                text: "确定", onPress: () => {
                    dispatch({type: actionType.HomeActionType.set_File, payload: {setFile: []}})
                    dispatch({type: actionType.WriteArticleType.create_article_success})
                    props.navigation.pop()
                }
            }])
        } else {
            dispatch({type: actionType.WriteArticleType.create_article_failed, payload: {failedMsg: `${res.msg}`}})
        }
    } catch (err) {
        dispatch({type: actionType.WriteArticleType.create_article_failed, payload: {failedMsg: `${err}`}})
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
            dispatch({
                type: actionType.WriteArticleType.get_currentAddr_failed,
                payload: {failedMsg: `${res.infocode}`}
            })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({type: actionType.WriteArticleType.get_currentAddr_failed, payload: {failedMsg: `${err}`}})
    }
}

export const removeCurrentAddr = () => (dispatch) => {
    dispatch({type: actionType.WriteArticleType.remove_currentAddr})
}
