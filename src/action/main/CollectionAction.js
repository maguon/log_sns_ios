import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'


const pageSize = 5
export const getCollectionList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},CollectionReducer:{collectionList}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl?start=${collectionList.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if(res.success){
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.CollectionType.set_CollectionList, payload: {collectionList: res.result, vidComplete: true}})
            } else {
                dispatch({ type: actionType.CollectionType.get_CollectionList, payload: { collectionList: res.result, vidComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}

//取消收藏
export const delCollection = (value) => async (dispatch, getState) => {
    const {LoginReducer: {userId},CollectionReducer:{collectionList}} = getState()
    console.log(value)
    const {index,id}=value
    const  newList=collectionList.splice(index,1)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userMsgColl/${id}/del`
        const res = await HttpRequest.del(url)
        if(res.success){
        dispatch({ type: actionType.CollectionType.del_CollectionList, payload: { collectionList: newList} })
        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }

}
