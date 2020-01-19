import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    artInfo: [],
    artArticle: [],
    artImage: [],
    artVideo: [],
    artAddress: [],
    artHelp: [],
    voteList: [],
    isResultStatus: 0,

}

export default handleActions({

    [actionType.ArticleType.get_ArtInfo]: (state, action) => {
        const {payload: {artInfo}} = action
        return {
            ...state,
            artInfo
        }
    },
    [actionType.ArticleType.get_ArtArticle]: (state, action) => {
        const {payload: {artArticle}} = action
        return {
            ...state,
            artArticle
        }
    },
    [actionType.ArticleType.get_ArtImage]: (state, action) => {
        const {payload: {artImage}} = action
        return {
            ...state,
            artImage
        }
    },
    [actionType.ArticleType.get_ArtVideo]: (state, action) => {
        const {payload: {artVideo}} = action
        return {
            ...state,
            artVideo
        }
    },
    [actionType.ArticleType.get_ArtAddress]: (state, action) => {
        const {payload: {artAddress}} = action
        return {
            ...state,
            artAddress
        }
    },
    [actionType.ArticleType.get_ArtHelp]: (state, action) => {
        const {payload: {artHelp}} = action
        return {
            ...state,
            artHelp
        }
    },
    [actionType.ArticleType.get_VoteList]: (state, action) => {
        const {payload: {voteList}} = action
        return {
            ...state,
            voteList
        }
    },


}, initialState)
