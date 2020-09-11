import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    likeMe:[],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    likeMeLoading:false,
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.PraiseMeType.set_likeMeLoading]: (state, action) => {

        return {
            ...state,
            likeMe:"",
            isResultStatus:0
        }
    },

    [actionType.PraiseMeType.get_likeMe_success]: (state, action) => {
        const {payload: {likeMe,isComplete}} = action
        return {
            ...state,
            likeMe: [...state.likeMe, ...likeMe],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.PraiseMeType.get_likeMe_end]: (state, action) => {
        const {payload: {likeMe,isComplete}} = action
        return {
            ...state,
            likeMe: [...state.likeMe, ...likeMe],
            isComplete,
            isResultStatus: 1,

        }
    },
    [actionType.PraiseMeType.set_likeMe_Praise]: (state, action) => {
        const {payload: {likeMe}} = action
        return {
            ...state,
            likeMe:likeMe,
        }
    },


}, initialState)
