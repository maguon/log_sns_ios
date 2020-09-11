import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    ToVoteList: [],
    isComplete:false,
    isResultStatus:0,
}

export  default  handleActions({
    [actionType.ToVoteType.loading_ToVoteList]: (state, action) => {
        return {
            ...state,
            ToVoteList: "",
            isResultStatus: 0,
        }
    },

    [actionType.ToVoteType.get_ToVoteList]: (state, action) => {
        const {payload: {ToVoteList,isComplete}} = action
        return {
            ...state,
            ToVoteList: [...state.ToVoteList, ...ToVoteList],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.ToVoteType.set_ToVoteList]: (state, action) => {
        const {payload: {ToVoteList,isComplete}} = action
        return {
            ...state,
            ToVoteList: [...state.ToVoteList, ...ToVoteList],
            isComplete,
            isResultStatus: 1,
        }
    },
    [actionType.ToVoteType.set_ToVoteList_Praise]: (state, action) => {
        const {payload: {ToVoteList}} = action
        return {
            ...state,
            ToVoteList,
        }
    },



},initialState)
