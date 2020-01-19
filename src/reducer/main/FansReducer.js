import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    fansList: "",
    isResultStatus: 0,
    pageSize: 20
}

export default handleActions({

    [actionType.FansType.get_fansList]: (state, action) => {
        const {payload: {fansList}} = action
        return {
            ...state,
            fansList,
            isResultStatus: 1
        }
    },
    [actionType.FansType.set_pageSize]: (state, action) => {
        const {payload: {pageSize}} = action
        return {
            ...state,
            pageSize
        }
    }

}, initialState)
