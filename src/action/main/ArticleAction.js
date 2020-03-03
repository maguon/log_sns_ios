import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import Article from '../../components/main/Article'


const pageSize = 5
//所有
export const getArtInfo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ArticleReducer:{artInfo}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&status=1&start=${artInfo.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: true}})
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ArticleType.set_ArtInfo, payload: {artInfo: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ArticleType.get_ArtInfo, payload: { artInfo: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}


//文章
export const getArtArticle = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ArticleReducer:{artArticle}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=1&status=1&start=${artArticle.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ArticleType.set_ArtArticle, payload: {artArticle: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ArticleType.get_ArtArticle, payload: { artArticle: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

//图片
export const getArtImage = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ArticleReducer:{artImage}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=2&status=1&start=${artImage.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ArticleType.set_ArtImage, payload: {artImage: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ArticleType.get_ArtImage, payload: { artImage: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
//视频
export const getArtVideo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ArticleReducer:{artVideo}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=3&status=1&start=${artVideo.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ArticleType.set_ArtVideo, payload: {artVideo: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ArticleType.get_ArtVideo, payload: { artVideo: res.result, isComplete: false } })
            }
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

//求助
export const getArtHelp = () => async (dispatch, getState) => {
    const {LoginReducer: {userId},ArticleReducer:{artHelp}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?type=2&carrier=1&status=1&start=${artHelp.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({type: actionType.ArticleType.set_ArtHelp, payload: {artHelp: res.result, isComplete: true}})
            } else {
                dispatch({ type: actionType.ArticleType.get_ArtHelp, payload: { artHelp: res.result, isComplete: false } })
            }
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}



//删除
export const itemDelete = (value) => async (dispatch, getState) => {
    console.log(value)
    const {LoginReducer: {userId},ArticleReducer:{artInfo,artArticle,artImage,artVideo,artHelp}} = getState()
    const {_id} = value

    try {
        // 基本检索URL
        // let url = `${apiHost}/user/${userId}/msg/${_id}/del`
        // const res = await HttpRequest.del(url)
        // console.log(res)
        // if (res.success) {
            // dispatch(getArtInfo())
            // dispatch(getArtArticle())
            // dispatch(getArtImage())
            // dispatch(getArtVideo())
            // dispatch(getArtHelp())

        // }

    } catch (err) {
        Toast.fail(err.message)
    }
}
