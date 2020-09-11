import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    LocationList: "",
    isComplete: false,
    isResultStatus: 0,
}

export default handleActions({
    [actionType.LocationCollectionType.loading_LocationList]: (state, action) => {
        return {
            ...state,
            LocationList:"",
            isResultStatus:0,
        }
    },

    [actionType.LocationCollectionType.get_locationList]: (state, action) => {
        const {payload: {LocationList,isComplete}} = action
        return {
            ...state,
            LocationList: [...state.LocationList, ...LocationList],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.LocationCollectionType.get_location_end]: (state, action) => {
        const {payload: {LocationList,isComplete}} = action
        return {
            ...state,
            LocationList: [...state.LocationList, ...LocationList],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.LocationCollectionType.get_location]: (state, action) => {
        const {payload: {LocationList}} = action
        return {
            ...state,
            LocationList:LocationList,
        }
    }

}, initialState)
