import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    followList: "",
    isResultStatus: 0,
    pageSize: 20
}

export default handleActions({

    [actionType.FollowType.get_follow_list]: (state, action) => {
        const {payload: {followList}} = action
        return {
            ...state,
            followList,
            isResultStatus: 1
        }
    },
    [actionType.FollowType.page_Size]: (state, action) => {
        const {payload: {pageSize}} = action
        return {
            ...state,
            pageSize
        }
    }

}, initialState)
