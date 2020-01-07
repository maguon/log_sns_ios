import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType";

const initialState={
    user:'',
    password:'',
    userId:'5e041bd502ecfd21c8e5a239',
    userLogin:[],
}

export default handleActions({
    [actionType.LoginActionType.SET_USER]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    },
    [actionType.LoginActionType.PASS_WORD]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [actionType.LoginActionType.SET_USERID]: (state, action) => {
        return {
            ...state,
            userId: action.payload.userId
        }
    },
    [actionType.LoginActionType.SET_USERLOGIN]: (state, action) => {
        return {
            ...state,
            userLogin: action.payload
        }
    },


},initialState)
