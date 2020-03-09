import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    data: {
        likeMeList: []
    },
    getLikeMeList: {
        isResultStatus: 0,
        failedMsg: ''
    },
    getLikeMeListMore: {
        isResultStatus: 0,
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.PraiseMeType.get_likeMeList_success]: (state, action) => {
        return {
            ...state,
        }
    },
    [actionType.PraiseMeType.get_likeMeList_failed]: (state, action) => {
        return {
            ...state,
        }
    },
    [actionType.PraiseMeType.get_likeMeList_waiting]: (state, action) => {
        return {
            ...state,
        }
    },


    [actionType.PraiseMeType.get_likeMeListMore_success]: (state, action) => {
        return {
            ...state,
        }
    },
    [actionType.PraiseMeType.get_likeMeListMore_failed]: (state, action) => {
        return {
            ...state,
        }
    },
    [actionType.PraiseMeType.get_likeMeListMore_waiting]: (state, action) => {
        return {
            ...state,
        }
    }
}, initialState)
