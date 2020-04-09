import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    artInfo: [],
    isComplete: false,
    isResultStatus: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    artLoading:false,

    artArticle: [],
    artComplete: false,
    artResultStatus: 0,

    artImage: [],
    imgComplete: false,
    imgResultStatus: 0,

    artVideo: [],
    vidComplete: false,
    vidResultStatus: 0,

    artHelp: [],
    helpComplete: false,
    helpResultStatus: 0,
}

export default handleActions({
    [actionType.ArticleType.set_ArtLoading]: (state, action) => {
        const {payload: {artLoading}} = action
        return {
            ...state,
            artLoading,
        }
    },

    [actionType.ArticleType.get_ArtInfo]: (state, action) => {
        const {payload: {artInfo,isComplete}} = action
        return {
            ...state,
            artInfo: [...state.artInfo, ...artInfo],
            isComplete,
            isResultStatus: 2,
        }
    },
    [actionType.ArticleType.set_ArtInfo]: (state, action) => {
        const {payload: {artInfo,isComplete}} = action
        return {
            ...state,
            artInfo: [...state.artInfo, ...artInfo],
            isComplete,
            isResultStatus: 1,
        }
    },
    [actionType.ArticleType.set_ArtInfo_Praise]: (state, action) => {
        const {payload: {artInfo}} = action
        return {
            ...state,
            artInfo
        }
    },


    [actionType.ArticleType.get_ArtArticle]: (state, action) => {
        const {payload: {artArticle,artComplete}} = action
        return {
            ...state,
            artArticle: [...state.artArticle, ...artArticle],
            artComplete,
            artResultStatus: 2,
        }
    },
    [actionType.ArticleType.set_ArtArticle]: (state, action) => {
        const {payload: {artArticle,artComplete}} = action
        return {
            ...state,
            artArticle: [...state.artArticle, ...artArticle],
            artComplete,
            artResultStatus: 1,
        }
    },
    [actionType.ArticleType.set_ArtArticle_Praise]: (state, action) => {
        const {payload: {artArticle}} = action
        return {
            ...state,
            artArticle
        }
    },


    [actionType.ArticleType.get_ArtImage]: (state, action) => {
        const {payload: {artImage,imgComplete}} = action
        return {
            ...state,
            artImage: [...state.artImage, ...artImage],
            imgComplete,
            imgResultStatus: 2,
        }
    },

    [actionType.ArticleType.set_ArtImage]: (state, action) => {
        const {payload: {artImage,imgComplete}} = action
        return {
            ...state,
            artImage: [...state.artImage, ...artImage],
            imgComplete,
            imgResultStatus: 1,
        }
    },
    [actionType.ArticleType.set_ArtImage_Praise]: (state, action) => {
        const {payload: {artImage}} = action
        return {
            ...state,
            artImage
        }
    },



    [actionType.ArticleType.get_ArtVideo]: (state, action) => {
        const {payload: {artVideo,vidComplete}} = action
        return {
            ...state,
            artVideo: [...state.artVideo, ...artVideo],
            vidComplete,
            vidResultStatus: 2,
        }
    },
    [actionType.ArticleType.set_ArtVideo]: (state, action) => {
        const {payload: {artVideo,vidComplete}} = action
        return {
            ...state,
            artVideo: [...state.artVideo, ...artVideo],
            vidComplete,
            vidResultStatus: 1,
        }
    },
    [actionType.ArticleType.set_ArtVideo_Praise]: (state, action) => {
        const {payload: {artVideo}} = action
        return {
            ...state,
            artVideo
        }
    },



    [actionType.ArticleType.get_ArtHelp]: (state, action) => {
        const {payload: {artHelp,helpComplete}} = action
        return {
            ...state,
            artHelp: [...state.artHelp, ...artHelp],
            helpComplete,
            helpResultStatus: 2,
        }
    },
    [actionType.ArticleType.set_ArtHelp]: (state, action) => {
        const {payload: {artHelp,helpComplete}} = action
        return {
            ...state,
            artHelp: [...state.artHelp, ...artHelp],
            helpComplete,
            helpResultStatus: 1,
        }
    },
    [actionType.ArticleType.set_ArtHelp_Praise]: (state, action) => {
        const {payload: {artHelp}} = action
        return {
            ...state,
            artHelp
        }
    },


}, initialState)
