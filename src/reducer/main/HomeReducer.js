import {handleActions} from 'redux-actions'
import * as actionType from "../../actionType/index"

const initialState = {
    hotList: [],
    homeFollow: [],
    nearList: [],
    isResultStatus: 0,
    pageSize: 10,
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.HomeActionType.get_HotList]: (state, action) => {
        const {payload: {hotList}} = action
        return {
            ...state,
            hotList
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
