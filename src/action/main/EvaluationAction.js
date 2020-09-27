import * as actionType from '../../actionType/index'
import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Toast} from "@ant-design/react-native";
import Sound from 'react-native-sound'


let musciPath = require('../../../src/sound/update.mp3');
const music = new Sound(musciPath,(error)=>{console.log(error)});


const pageSize = 10
export const getEvaluation = () => async (dispatch,getState) => {
    const {LoginReducer: {userId},EvaluationReducer:{evaluation}} = getState()
    try {
        let url = `${apiHost}/user/${userId}/userMsgComment?start=${evaluation.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.EvaluationType.get_evaluation_end, payload: {evaluation: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.EvaluationType.get_evaluation_success, payload: { evaluation: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}


export const update=(value)=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},EvaluationReducer:{evaluation}} = getState()
    const {results}= value
    let url = `${apiHost}/user/${userId}/userMsgComment?start=0&size=${evaluation.length}`
    const res = await HttpRequest.get(url)
    if (res.success) {
        dispatch({type: actionType.EvaluationType.set_evaluation_Praise, payload: {evaluation: res.result}})
        if(results=="success"){
            Toast.success('更新成功')
            music.play()
        }
    }

}
