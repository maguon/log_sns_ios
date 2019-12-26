import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType";

const initialState={
    user:'',
    password:''
}

export default handleActions({
    [actionType.LoginActionType.setUser]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    },
    [actionType.LoginActionType.passWord]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },


},initialState)
