import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    spaceData:"",
    spaceUser:"",
    spaceHidden:"",
    spaceLoading:false,
    isResultStatus:0,
    isComplete:false,
}

export default handleActions({


    [actionType.SpaceType.get_spaceData_Loading]: (state, action) => {
        const {payload: {spaceLoading}} = action
        return {
            ...state,
            spaceLoading,
        }
    },
    [actionType.SpaceType.get_spaceData_end]: (state, action) => {
        const {payload: {spaceData,isComplete}} = action
        return {
            ...state,
            spaceData: [...state.spaceData, ...spaceData],
            isComplete,
            isResultStatus: 1
        }
    },
    [actionType.SpaceType.get_spaceData_success]: (state, action) => {
        const {payload: {spaceData,isComplete}} = action
        return {
            ...state,
            spaceData:[...state.spaceData, ...spaceData],
            isComplete,
            isResultStatus: 2
        }
    },
    [actionType.SpaceType.get_spaceData_Clean]: (state, action) => {
        return {
            ...state,
            spaceData:"",
            spaceUser:""
        }
    },


    [actionType.SpaceType.get_SpaceUser]: (state, action) => {
        const {payload:{spaceUser}}=action
        return {
            ...state,
            spaceUser
        }
    },
    [actionType.SpaceType.set_SpaceHidden]: (state, action) => {
        const {payload:{spaceHidden}}=action
        return {
            ...state,
            spaceHidden
        }
    },



}, initialState)
