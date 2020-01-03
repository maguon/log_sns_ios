import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType";

const initialState={
    user:'',
    password:'',
    userId:'',
    userLogin:[],
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
    [actionType.LoginActionType.setUserId]: (state, action) => {
        return {
            ...state,
            userId: action.payload.userId
        }
    },
    [actionType.LoginActionType.setUserLogin]: (state, action) => {
        return {
            ...state,
            userLogin: action.payload
        }
    },


},initialState)
