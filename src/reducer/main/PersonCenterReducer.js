import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    userInfo: []
}

export default handleActions({

    [actionType.PersonCenterType.get_UserInfo]: (state, action) => {
        const {payload: {userInfo}} = action
        return {
            ...state,
            userInfo
        }
    }

}, initialState)
