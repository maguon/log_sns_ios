import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    userData: [],
    userDetailInfo: [],
    Sex:"",
    nickName:"",
    cityName:"",
    Intro:"",
}

export default handleActions({

    [actionType.UserDataType.get_UserData]: (state, action) => {
        return {
            ...state,
            userData: action.payload.userData
        }
    },
    [actionType.UserDataType.get_UserDetail_Info]: (state, action) => {
        return {
            ...state,
            userDetailInfo: action.payload.userDetailInfo
        }
    },
    [actionType.UserDataType.set_Sex]: (state, action) => {
        const {payload:{Sex}}=action
        return {
            ...state,
            Sex
        }
    },

    [actionType.UserDataType.set_NickName]: (state, action) => {
        const {payload:{nickName}}=action
        return {
            ...state,
            nickName
        }
    },

    [actionType.UserDataType.set_CityName]: (state, action) => {
        const {payload:{cityName}}=action
        return {
            ...state,
            cityName
        }
    },

    [actionType.UserDataType.set_Intro]: (state, action) => {
        const {payload:{Intro}}=action
        return {
            ...state,
            Intro
        }
    },


}, initialState)
