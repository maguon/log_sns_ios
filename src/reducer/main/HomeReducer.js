import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType/index"

const initialState = {
    hotList: [],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    hotLoading:false,

    homeFollow: [],
    homeComplete:false,
    homeResultStatus:0,


    nearList: [],
    longitude:0,
    latitude:0,
    nearComplete:false,
    nearResultStatus:0,

    setVisible:false
}

export default handleActions({
    [actionType.HomeActionType.set_HotLoading]: (state, action) => {
        const {payload: {hotLoading}} = action
        return {
            ...state,
            hotLoading,
        }
    },

    [actionType.HomeActionType.get_HotList_success]: (state, action) => {
        const {payload: {hotList,isComplete}} = action
        return {
            ...state,
            hotList: [...state.hotList, ...hotList],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.HomeActionType.get_HotList_end]: (state, action) => {
        const {payload: {hotList,isComplete}} = action
        return {
            ...state,
            hotList: [...state.hotList, ...hotList],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.HomeActionType.set_HotList_Praise]: (state, action) => {
        const {payload: {hotList}} = action
        return {
            ...state,
            hotList:hotList,
        }
    },




    [actionType.HomeActionType.get_HomeFollow]: (state, action) => {
        const {payload: {homeFollow,homeComplete}} = action
        return {
            ...state,
            homeFollow:[...state.homeFollow, ...homeFollow],
            homeComplete,
            homeResultStatus:1,
        }
    },
    [actionType.HomeActionType.get_HomeFollow_end]: (state, action) => {
        const {payload: {homeFollow,homeComplete}} = action
        return {
            ...state,
            homeFollow:[...state.homeFollow, ...homeFollow],
            homeComplete,
            homeResultStatus:2,
        }
    },
    [actionType.HomeActionType.set_HomeFollow_Praise]: (state, action) => {
        const {payload: {homeFollow}} = action
        return {
            ...state,
            homeFollow:homeFollow,
        }
    },



    [actionType.HomeActionType.get_NearList]: (state, action) => {
        const {payload: {nearList,nearComplete}} = action
        return {
            ...state,
            nearList:[...state.nearList, ...nearList],
            nearComplete,
            nearResultStatus:1,
        }
    },

    [actionType.HomeActionType.get_NearList]: (state, action) => {
        const {payload: {nearList,nearComplete}} = action
        return {
            ...state,
            nearList:[...state.nearList, ...nearList],
            nearComplete,
            nearResultStatus:2,
        }
    },
    [actionType.HomeActionType.set_NearList_Praise]: (state, action) => {
        const {payload: {nearList}} = action
        return {
            ...state,
            nearList:nearList,
        }
    },

    [actionType.HomeActionType.get_address]: (state, action) => {
        const {payload: {longitude,latitude}} = action
        return {
            ...state,
            longitude,
            latitude,
        }

    },
    [actionType.HomeActionType.set_Visible]: (state, action) => {
        const {payload: {setVisible}} = action
        return {
            ...state,
            setVisible
        }

    },


}, initialState)
