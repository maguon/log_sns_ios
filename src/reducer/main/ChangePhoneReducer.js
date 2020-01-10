import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    newPhone:"",
    sendCode:""
}

export  default  handleActions({

    [actionType.ChangePhoneType.set_NewPhone]: (state, action) => {
        return {
            ...state,
            newPhone: action.payload
        }
    },
    [actionType.ChangePhoneType.set_SendCode]: (state, action) => {
        return {
            ...state,
            sendCode: action.payload
        }
    },

},initialState)
