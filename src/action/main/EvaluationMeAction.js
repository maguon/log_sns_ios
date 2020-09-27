import * as actionType from '../../actionType/index'
import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from "@ant-design/react-native";
import Sound from 'react-native-sound'


let musciPath = require('../../../src/sound/update.mp3');
const music = new Sound(musciPath,(error)=>{console.log(error)});


const pageSize = 10
export const getEvaluationMe = () => async (dispatch,getState) => {
    const {LoginReducer: {userId},EvaluationMeReducer:{evaluationMe}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/userBeMsgComment?level=1&start=${evaluationMe.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.EvaluationMeType.get_evaluationMe_end, payload: {evaluationMe: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.EvaluationMeType.get_evaluationMe_success, payload: { evaluationMe: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const update=(value)=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},EvaluationMeReducer:{evaluationMe}} = getState()
    const {results}= value

    let url = `${apiHost}/user/${userId}/userBeMsgComment?level=1&start=0&size=${evaluationMe.length}`
    const res = await HttpRequest.get(url)
    if (res.success) {
        dispatch({type: actionType.EvaluationMeType.set_evaluationMe_Praise, payload: {evaluationMe: res.result}})
        if(results=="success"){
            Toast.success('更新成功')
            music.play()
        }
    }

}
