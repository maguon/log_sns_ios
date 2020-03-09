import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'
const initialState = {
    data: {
        currentAddrName: '',
        currentAddrReal: '',
        longitude: 0,
        latitude: 0
    },
    createArticle: {
        isResultStatus: 0,
        failedMsg: ''
    },
    getCurrentAddr: {
        isResultStatus: 0,
        failedMsg: ''
    },
    content:"",
    posSwitch:false,
}

export default handleActions({
    [actionType.WriteArticleType.create_content]: (state, action) => {
        return {
            ...state,
            content:action.payload,
        }
    },
    [actionType.WriteArticleType.on_Switch_Change]: (state, action) => {
        return {
            ...state,
            posSwitch:action.payload,
        }
    },
    [actionType.WriteArticleType.create_article_success]: (state, action) => {
        return {
            ...state,
            createArticle: {
                ...state.createArticle,
                isResultStatus: 2
            },
        }
    },
    [actionType.WriteArticleType.create_article_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createArticle: {
                ...state.createArticle,
                isResultStatus: 3,
                failedMsg
            },
        }
    },
    [actionType.WriteArticleType.create_article_waiting]: (state, action) => {
        return {
            ...state,
            createArticle: {
                ...state.createArticle,
                isResultStatus: 1
            },
        }
    },


    [actionType.WriteArticleType.get_currentAddr_success]: (state, action) => {
        const { payload: { currentAddrName, currentAddrReal, longitude, latitude } } = action
        // console.log('action',action)
        return {
            ...state,
            data: {
                currentAddrName, currentAddrReal, longitude, latitude
            },
            getCurrentAddr: {
                ...state.getCurrentAddr,
                isResultStatus: 2
            }
        }
    },
    [actionType.WriteArticleType.get_currentAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCurrentAddr: {
                ...state.getCurrentAddr,
                isResultStatus: 3,
                failedMsg
            }
        }
    },
    [actionType.WriteArticleType.get_currentAddr_waiting]: (state, action) => {
        return {
            ...state,
            getCurrentAddr: {
                ...state.getCurrentAddr,
                isResultStatus: 1
            }
        }
    },
    [actionType.WriteArticleType.remove_currentAddr]: (state, action) => {
        return {
            ...state,
            data: {
                ...initialState.data
            }
        }
    }
}, initialState)
