import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    evaluationMe:[]
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.EvaluationMeType.get_evaluationMe_success]: (state, action) => {
        const { payload: { evaluationMe } } = action
        return {
            ...state,
            evaluationMe
        }
    }

}, initialState)
