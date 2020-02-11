import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType/index"

const initialState = {
    hotList: [],
    hotSize:5,
    homeFollow: [],
    homeSize:5,
    nearList: [],
    nearSize:5,
    isResultStatus: 0,
    pageSize: 10,
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.HomeActionType.get_HotList]: (state, action) => {
        const {payload: {hotList}} = action
        return {
            ...state,
            hotList,
            isResultStatus: 1,

        }
    },
    [actionType.HomeActionType.set_HotSize]: (state, action) => {
        const {payload: {hotSize}} = action
        return {
            ...state,
            hotSize
        }
    },
    [actionType.HomeActionType.get_HomeFollow]: (state, action) => {
        const {payload: {homeFollow}} = action
        return {
            ...state,
            homeFollow
        }
    },
    [actionType.HomeActionType.get_NearList]: (state, action) => {
        const {payload: {nearList}} = action
        return {
            ...state,
            nearList
        }
    },
    [actionType.HomeActionType.update_PageSize]: (state, action) => {
        const {payload: {pageSize}} = action
        return {
            ...state,
            pageSize
        }
    }

}, initialState)
