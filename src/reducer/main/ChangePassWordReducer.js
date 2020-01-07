import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    changeCode:"",
    changePassword:"",
    changeNewPassword:"",
    phone:""
}

export  default  handleActions({

    [actionType.ChangePassWordType.GET_PHONE]: (state, action) => {
        return {
            ...state,
            phone: action.payload.phone
        }
    },
    [actionType.ChangePassWordType.SET_CHANGE_CODE]: (state, action) => {
        return {
            ...state,
            changeCode: action.payload
        }
    },
    [actionType.ChangePassWordType.SET_CHANGE_PASSWORD]: (state, action) => {
        return {
            ...state,
            changePassword: action.payload
        }
    },
    [actionType.ChangePassWordType.SET_CHANGE_NEWPASSWORD]: (state, action) => {
        return {
            ...state,
            changeNewPassword: action.payload
        }
    },

},initialState)
