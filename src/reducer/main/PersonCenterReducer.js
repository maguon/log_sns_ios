import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
  userInfo:[]
}

export  default  handleActions({

    [actionType.PersonCenterType.GET_USERINFO]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload.userInfo
        }
    }

},initialState)
