import * as actionType from '../../actionType/index'
import httpRequest from '../../utils/HttpRequest'
import {apiHost} from "../../config/HostConfig";
import {Toast} from "@ant-design/react-native";
const pageSize = 10
export const getLikeMeList = () => async (dispatch,getState) => {
    const {LoginReducer: {userId},PraiseMeReducer:{likeMe}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/getUserBePraise?start=${likeMe.length}&size=${pageSize}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.PraiseMeType.set_likeMeLoading, payload: {likeMeLoading: true}})
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.PraiseMeType.get_likeMe_end, payload: {likeMe: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.PraiseMeType.get_likeMe_success, payload: { likeMe: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const update=()=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},PraiseMeReducer:{likeMe}} = getState()

        let url = `${apiHost}/user/${userId}/getUserBePraise?start=0&size=${likeMe.length}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.PraiseMeType.set_likeMe_Praise, payload: {likeMe: res.result}})
        }

}
