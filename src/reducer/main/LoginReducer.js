import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType"

const initialState={
    user:'',
    password:'',
    userId:'5dfacafe98cc5501fd1e80db',
    userLogin:[],
}

export default handleActions({
    [actionType.LoginActionType.set_User]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    },
    [actionType.LoginActionType.pass_Word]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [actionType.LoginActionType.set_UserId]: (state, action) => {
        return {
            ...state,
            userId: action.payload.userId
        }
    },
    [actionType.LoginActionType.set_UserLogin]: (state, action) => {
        return {
            ...state,
            userLogin: action.payload
        }
    },


},initialState)
