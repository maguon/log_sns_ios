import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    evaluationMe:[],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.EvaluationMeType.set_evaLoading]: (state, action) => {
        return {
            ...state,
            evaluationMe:"",
            isResultStatus:0
        }
    },

    [actionType.EvaluationMeType.get_evaluationMe_success]: (state, action) => {
        const {payload: {evaluationMe,isComplete}} = action
        return {
            ...state,
            evaluationMe: [...state.evaluationMe, ...evaluationMe],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.EvaluationMeType.get_evaluationMe_end]: (state, action) => {
        const {payload: {evaluationMe,isComplete}} = action
        return {
            ...state,
            evaluationMe: [...state.evaluationMe, ...evaluationMe],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.EvaluationMeType.set_evaluationMe_Praise]: (state, action) => {
        const {payload: {evaluationMe}} = action
        return {
            ...state,
            evaluationMe:evaluationMe,
        }
    },

}, initialState)
