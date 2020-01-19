import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    followMeList: []
}

export default handleActions({

    [actionType.FollowMeType.get_followMe_List]: (state, action) => {
        const {payload: {followMeList}} = action
        return {
            followMeList
        }
    }
}, initialState)
