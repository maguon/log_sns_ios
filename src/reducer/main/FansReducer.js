import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    fansList: "",
    fansResultStatus: 0,
    isComplete: false,
}

export default handleActions({
    [actionType.FansType.get_fansList_end]: (state, action) => {
        const {payload: {fansList,isComplete}} = action
        return {
            ...state,
            fansList: [...state.fansList, ...fansList],
            isComplete,
            fansResultStatus: 1,
        }
    },
    [actionType.FansType.get_fansList]: (state, action) => {
        const {payload: {fansList,isComplete}} = action
        return {
            ...state,
            fansList: [...state.fansList, ...fansList],
            isComplete,
            fansResultStatus: 2,

        }
    },
    [actionType.FansType.get_fans]: (state, action) => {
        const {payload: {fansList}} = action
        return {
            ...state,
            fansList:fansList,
        }
    }

}, initialState)
