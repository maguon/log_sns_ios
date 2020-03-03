import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    comInfo: [],
    isComplete:false,
    isResultStatus:0,
    comLoading:false,

    comVideo: [],
    vidComplete:false,
    vidResultStatus:0,

    comHelp: [],
    helpComplete:false,
    helpResultStatus:0,

    comVoteList: [],
    voteComplete:false,
    voteResultStatus:0,

}

export default handleActions({

    [actionType.CommunityType.set_ComLoading]: (state, action) => {
        const {payload: {comLoading}} = action
        return {
            ...state,
            comLoading,
        }
    },
    [actionType.CommunityType.get_ComInfo]: (state, action) => {
        const {payload: {comInfo,isComplete}} = action
        return {
            ...state,
            comInfo: [...state.comInfo, ...comInfo],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.CommunityType.set_ComInfo]: (state, action) => {
        const {payload: {comInfo,isComplete}} = action
        return {
            ...state,
            comInfo: [...state.comInfo, ...comInfo],
            isComplete,
            isResultStatus: 1,
        }
    },



    [actionType.CommunityType.get_ComVideo]: (state, action) => {
        const {payload: {comVideo,vidComplete}} = action
        return {
            ...state,
            comVideo: [...state.comVideo, ...comVideo],
            vidComplete,
            vidResultStatus: 2,
        }
    },
    [actionType.CommunityType.set_ComVideo]: (state, action) => {
        const {payload: {comVideo,vidComplete}} = action
        return {
            ...state,
            comVideo: [...state.comVideo, ...comVideo],
            vidComplete,
            vidResultStatus: 1,
        }
    },



    [actionType.CommunityType.get_ComHelp]: (state, action) => {
        const {payload: {comHelp,helpComplete}} = action
        return {
            ...state,
            comHelp: [...state.comHelp, ...comHelp],
            helpComplete,
            helpResultStatus: 2,
        }
    },
    [actionType.CommunityType.set_ComHelp]: (state, action) => {
        const {payload: {comHelp,helpComplete}} = action
        return {
            ...state,
            comHelp: [...state.comHelp, ...comHelp],
            helpComplete,
            helpResultStatus: 1,
        }
    },


    [actionType.CommunityType.get_ComVoteList]: (state, action) => {
        const {payload: {comVoteList,voteComplete}} = action
        return {
            ...state,
            comVoteList: [...state.comVoteList, ...comVoteList],
            voteComplete,
            voteResultStatus: 2,
        }
    },
    [actionType.CommunityType.set_ComVoteList]: (state, action) => {
        const {payload: {comVoteList,voteComplete}} = action
        return {
            ...state,
            comVoteList: [...state.comVoteList, ...comVoteList],
            voteComplete,
            voteResultStatus: 1,
        }
    },


}, initialState)
