import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    newPhone:"",
    sendCode:""
}

export  default  handleActions({

    [actionType.ChangePhoneType.SET_NEWPHONE]: (state, action) => {
        return {
            ...state,
            newPhone: action.payload
        }
    },
    [actionType.ChangePhoneType.SET_SENDCODE]: (state, action) => {
        return {
            ...state,
            sendCode: action.payload
        }
    },

},initialState)
