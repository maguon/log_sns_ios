import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    followList: "",
    isComplete: false,
    isResultStatus: 0,
}

export default handleActions({

    [actionType.FollowType.get_followList]: (state, action) => {
        const {payload: {followList,isComplete}} = action
        return {
            ...state,
            followList: [...state.followList, ...followList],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.FollowType.get_follow_end]: (state, action) => {
        const {payload: {followList,isComplete}} = action
        return {
            ...state,
            followList: [...state.followList, ...followList],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.FollowType.get_follow]: (state, action) => {
        const {payload: {followList}} = action
        return {
            ...state,
            followList:followList,
        }
    }

}, initialState)
