import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    shieldingList: "",
    isResultStatus: 0,
    isComplete: false,
}

export default handleActions({
    [actionType.ShieldingActionType.loading_shieldingList]: (state, action) => {
        return {
            ...state,
            shieldingList:"",
            isResultStatus:0,
        }
    },
    [actionType.ShieldingActionType.get_shieldingList_end]: (state, action) => {
        const {payload: {shieldingList,isComplete}} = action
        return {
            ...state,
            shieldingList: [...state.shieldingList, ...shieldingList],
            isComplete,
            isResultStatus: 1,
        }
    },
    [actionType.ShieldingActionType.get_shieldingList_success]: (state, action) => {
        const {payload: {shieldingList,isComplete}} = action
        return {
            ...state,
            shieldingList: [...state.shieldingList, ...shieldingList],
            isComplete,
            isResultStatus: 2,

        }
    },
    [actionType.ShieldingActionType.get_shieldingList]: (state, action) => {
        const {payload: {shieldingList}} = action
        return {
            ...state,
            shieldingList:shieldingList,
        }
    }

}, initialState)
