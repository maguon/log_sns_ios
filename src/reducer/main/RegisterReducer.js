import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
        account: "",
        password: "",
        pass_word:"",
        code:""
}

export  default  handleActions({

    [actionType.RegisterActionType.SET_ACCOUNT]: (state, action) => {
        return {
            ...state,
            account: action.payload
        }
    },
    [actionType.RegisterActionType.SET_PASSWORD]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [actionType.RegisterActionType.SET_PASSWORD_TO]: (state, action) => {
        return {
            ...state,
            pass_word: action.payload
        }
    },
    [actionType.RegisterActionType.SET_CODE]: (state, action) => {
        return {
            ...state,
            code: action.payload
        }
    }

},initialState)
