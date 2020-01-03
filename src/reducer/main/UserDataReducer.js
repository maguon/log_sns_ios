import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
   userData:[],
    userDetailInfo:[],

}

export  default  handleActions({

    [actionType.UserDataType.getUserData]: (state, action) => {
        return {
            ...state,
            userData: action.payload.userData
        }
    },
    [actionType.UserDataType.getUserDetailInfo]: (state, action) => {
        return {
            ...state,
            userDetailInfo: action.payload.userDetailInfo
        }
    },

},initialState)
