import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
        account: "",
        password: "",
        pass_word:"",
        code:""
}

export  default  handleActions({

    [actionType.RegisterActionType.setAccount]: (state, action) => {
        return {
            ...state,
            account: action.payload
        }
    },
    [actionType.RegisterActionType.setPassword]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [actionType.RegisterActionType.setPass_word]: (state, action) => {
        return {
            ...state,
            pass_word: action.payload
        }
    },
    [actionType.RegisterActionType.setCode]: (state, action) => {
        return {
            ...state,
            code: action.payload
        }
    }

},initialState)
