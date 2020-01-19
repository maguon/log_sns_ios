import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    spaceData: [],
    spaceUser:[],
    spaceHidden:[],
    isResultStatus:0,
}

export default handleActions({

    [actionType.SpaceType.get_spaceData]: (state, action) => {
        const {payload:{spaceData}}=action
        return {
            ...state,
            spaceData
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
