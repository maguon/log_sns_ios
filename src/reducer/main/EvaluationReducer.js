import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    evaluation:[],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    evaLoading:false,
}

export default handleActions({
    [actionType.EvaluationType.evaLoading]: (state, action) => {
        const { payload: { evaLoading } } = action
        return {
            ...state,
            evaLoading
        }
    },

    [actionType.EvaluationType.get_evaluation_success]: (state, action) => {
        const {payload: {evaluation,isComplete}} = action
        return {
            ...state,
            evaluation: [...state.evaluation, ...evaluation],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.EvaluationType.get_evaluation_end]: (state, action) => {
        const {payload: {evaluation,isComplete}} = action
        return {
            ...state,
            evaluation: [...state.evaluation, ...evaluation],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.EvaluationType.set_evaluation_Praise]: (state, action) => {
        const {payload: {evaluation}} = action
        return {
            ...state,
            evaluation:evaluation,
        }
    },


}, initialState)
