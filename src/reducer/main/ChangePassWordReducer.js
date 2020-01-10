import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    changeCode:"",
    changePassword:"",
    changeNewPassword:"",
    phone:""
}

export  default  handleActions({

    [actionType.ChangePassWordType.get_Phone]: (state, action) => {
        return {
            ...state,
            phone: action.payload.phone
        }
    },
    [actionType.ChangePassWordType.set_Change_Code]: (state, action) => {
        return {
            ...state,
            changeCode: action.payload
        }
    },
    [actionType.ChangePassWordType.set_Change_Password]: (state, action) => {
        return {
            ...state,
            changePassword: action.payload
        }
    },
    [actionType.ChangePassWordType.set_Change_NewPassword]: (state, action) => {
        return {
            ...state,
            changeNewPassword: action.payload
        }
    },

},initialState)
