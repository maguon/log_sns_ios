import * as actionType from '../../actionType/index'
import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from "@ant-design/react-native";


export const getEvaluationMe = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()

    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/userBeMsgComment?level=1`
        const res = await HttpRequest.get(url)
        console.log(res)
        if(res.success){
            dispatch({type: actionType.EvaluationMeType.get_evaluationMe_success, payload: {evaluationMe: res.result}})

        }else {
            Toast.fail(res.msg)
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}



// export const getCommentTwo = (params) => async (dispatch, getState) => {
//     const {LoginReducer: {userId}} = getState()
// const {commentId}=params
//     try {
//         // 基本检索URL
//         let url = `${apiHost}/user/${userId}/userBeMsgComment?msgComId=${commentId}&level=2`
//         const res = await HttpRequest.get(url)
//         console.log(res)
//         if(res.success){
//             dispatch({type: actionType.DetailType.get_Comment, payload: {commentTwo: res.result}})
//
//         }else {
//             Toast.fail(res.msg)
//         }
//     } catch (err) {
//         Toast.fail(err.message)
//     }
//
// }
