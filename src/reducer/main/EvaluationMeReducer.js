import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    selected: "所有评论"
}

export default handleActions({
    [actionType.EvaluationMeType.set_Selected]: (state, action) => {
        return {
            ...state,
            selected: action.payload
        }
    }


}, initialState)
