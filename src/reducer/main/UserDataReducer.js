import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
   userData:[],
    userDetailInfo:[],

}

export  default  handleActions({

    [actionType.UserDataType.get_UserData]: (state, action) => {
        return {
            ...state,
            userData: action.payload.userData
        }
    },
    [actionType.UserDataType.get_UserDetail_Info]: (state, action) => {
        return {
            ...state,
            userDetailInfo: action.payload.userDetailInfo
        }
    },

},initialState)
