import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
        account: "",
        password: "",
        pass_word:"",
        code:""
}

export  default  handleActions({

    [actionType.RegisterActionType.set_Account]: (state, action) => {
        return {
            ...state,
            account: action.payload
        }
    },
    [actionType.RegisterActionType.set_Password]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [actionType.RegisterActionType.set_Password_TO]: (state, action) => {
        return {
            ...state,
            pass_word: action.payload
        }
    },
    [actionType.RegisterActionType.set_Code]: (state, action) => {
        return {
            ...state,
            code: action.payload
        }
    }

},initialState)
