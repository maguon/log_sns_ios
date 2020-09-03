import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    systemMsg: "",
    isResultStatus: 0,
    isComplete: false,
}

export default handleActions({
    [actionType.SystemMsgType.get_systemMsg_end]: (state, action) => {
        const {payload: {systemMsg,isComplete}} = action
        return {
            ...state,
            systemMsg: [...state.systemMsg, ...systemMsg],
            isComplete,
            isResultStatus: 1,
        }
    },
    [actionType.SystemMsgType.get_systemMsg_success]: (state, action) => {
        const {payload: {systemMsg,isComplete}} = action
        return {
            ...state,
            systemMsg: [...state.systemMsg, ...systemMsg],
            isComplete,
            isResultStatus: 2,

        }
    },
    [actionType.SystemMsgType.get_systemMsg]: (state, action) => {
        const {payload: {systemMsg}} = action
        return {
            ...state,
            systemMsg:systemMsg,
        }
    }

}, initialState)
