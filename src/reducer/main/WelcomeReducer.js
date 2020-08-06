import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    data: {
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        },
        deviceInfo: {
            uniqueID: ''
        },
        userlocalStorage: {}
    },
    initAPP: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行暂停),3(全部执行成功),4(执行结束，跳转到登录)
        currentStep: 0,               //第N步已经执行成功
        errorMsg: '',
        failedMsg: ''
    }

}

export  default  handleActions({
    // [actionType.VoteType.set_itemList]: (state, action) => {
    //     const {payload: {itemList}} = action
    //     return {
    //         ...state,
    //         itemList,
    //     }
    // },

    [actionType.WelcomeActionType.Welcome_app_waiting]: (state, action) => {
        return {
            ...state,
            initAPP: {
                ...state.initAPP,
                isResultStatus: 1,
            }
        }
    },


    [actionType.WelcomeActionType.Welcome_app_failed]: (state, action) => {
        const { payload: { currentStep, param, msg } } = action
        return {
            ...state,
            data: {
                ...param
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 4,
                currentStep,
                failedMsg: msg
            }
        }
    },
    [actionType.WelcomeActionType.Welcome_app_error]: (state, action) => {
        const { payload: { currentStep, param, msg } } = action
        return {
            ...state,
            data: {
                ...param
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 3,
                currentStep,
                errorMsg: msg
            }
        }
    },
    [actionType.WelcomeActionType.Welcome_app_complete]: (state, action) => {
        const { payload: {  param } } = action
        return {
            ...state,
            data: {
                ...param
            },
            initAPP: {
                ...initialState.initAPP,
                isResultStatus: 2,
            }
        }
    }

},initialState)
