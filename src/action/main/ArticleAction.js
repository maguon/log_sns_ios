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
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&status=1&start=${artInfo.length}&size=${pageSize}`
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
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&type=1&status=1&start=${artArticle.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: true}})
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
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&carrier=2&status=1&start=${artImage.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: true}})
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
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&carrier=3&status=1&start=${artVideo.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: true}})
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
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&type=2&status=1&start=${artHelp.length}&size=${pageSize}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: true}})
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



export const update=(tabIndex)=>async (dispatch, getState)=>{
    const {LoginReducer: {userId},ArticleReducer:{artInfo,artArticle,artImage,artVideo,artHelp}} = getState()
    if(tabIndex==0){
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&status=1&start=0&size=${artInfo.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtInfo_Praise, payload: {artInfo: res.result}})
        }
    }else if(tabIndex==1){
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&type=1&status=1&start=0&size=${artArticle.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtArticle_Praise, payload: {artArticle: res.result}})
        }

    }else if(tabIndex==2){
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&carrier=2&status=1&start=0&size=${artImage.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtImage_Praise, payload: {artImage: res.result}})
        }
    }else if(tabIndex==3){
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&carrier=3&status=1&start=0&size=${artVideo.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtVideo_Praise, payload: {artVideo: res.result}})
        }
    }else if(tabIndex==4){
        let url = `${apiHost}/user/${userId}/userMsg?sendMsgUserId=${userId}&type=2&status=1&start=0&size=${artHelp.length}`
        const res = await HttpRequest.get(url)
        if (res.success) {
            dispatch({type: actionType.ArticleType.set_ArtHelp_Praise, payload: {artHelp: res.result}})
        }
    }
}


//点赞
export const setArtPraise = (params) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(params)
    const {item,tabIndex} =params

    try {
        let params={type:1, msgId:`${item._id}`, msgUserId:`${item._user_id}`,bePraisedUserId:`${item._user_id}`}
        console.log(params)
        let url = `${apiHost}/user/${userId}/userPraise`
        const res = await HttpRequest.post(url,params)
        if(res.success){
            dispatch(update(tabIndex))
        }else {
            Toast.info(res.msg)
        }

    } catch (err) {

        Toast.fail(err.message)
    }
}



//删除
export const itemDelete = (params) => async (dispatch, getState) => {
    console.log(params)
    const {LoginReducer: {userId}} = getState()
    const {item,tabIndex} =params

    try {
       // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg/${item._id}/del`
        const res = await HttpRequest.del(url)
        console.log(res)
        if (res.success) {
            dispatch(update(tabIndex))
        }
    } catch (err) {
        Toast.fail(err.message)
    }
}
