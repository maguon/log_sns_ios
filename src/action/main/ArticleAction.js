import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'
import * as actionType from '../../actionType/index'
import Article from '../../components/main/Article'

//所有
export const getArtInfo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtInfo, payload: {artInfo: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}


//文章
export const getArtArticle = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=1`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtArticle, payload: {artArticle: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
//求助
export const getArtHelp = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?type=2&carrier=1`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtHelp, payload: {artHelp: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
//图片
export const getArtImage = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=2`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtImage, payload: {artImage: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
//视频
export const getArtVideo = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=3`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtVideo, payload: {artVideo: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
//求助
export const getArtAddress = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg?sendMsgUserId=${userId}&carrier=4`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_ArtAddress, payload: {artAddress: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}


//投票getVoteList
export const getVoteList = () => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/vote`
        const res = await HttpRequest.get(url)
        console.log(res)
        if (res.success) {
            dispatch({type: actionType.ArticleType.get_VoteList, payload: {voteList: res.result}})
        }

    } catch (err) {
        Toast.fail(err.message)
    }
}

//删除
export const itemDelete = (props) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    const {item: {_id}} = props
    console.log(props)
    try {
        // 基本检索URL
        let url = `${apiHost}/user/${userId}/msg/${_id}/del`
        const res = await HttpRequest.del(url)
        console.log(res)
        if (res.success) {
            dispatch(getArtInfo())
            dispatch(getArtArticle())
            dispatch(getArtImage())
            dispatch(getArtVideo())
            dispatch(getVoteList())

        }

    } catch (err) {
        Toast.fail(err.message)
    }
}
