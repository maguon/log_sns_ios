import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionType/index'
import * as actionType from "../../actionType";

const initialState = {
    data: {
        addressInfo: {}
    },
    getAddress: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [actionType.LocationType.get_addressAtMap_success]: (state, action) => {
        const { payload: { addressInfo } } = action
        return {
            ...state,
            data: {
                addressInfo
            },
            getAddress: {
                ...state.getAddress,
                isResultStatus: 2
            }
        }
    },
    [actionType.LocationType.get_addressAtMap_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAddress: {
                ...state.getAddress,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionType.LocationType.get_addressAtMap_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAddress: {
                ...state.getAddress,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionType.LocationType.get_addressAtMap_waiting]: (state, action) => {
        return {
            ...state,
            getAddress: {
                ...state.getAddress,
                isResultStatus: 1
            }
        }
    }
}, initialState)
