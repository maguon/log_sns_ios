import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    collectionList:[],
    colResultStatus:0,
    colComplete:false
}

export  default  handleActions({

    [actionType.CollectionType.clear_CollectionList]: (state, action) => {
        return {
            ...state,
            collectionList:"",
            colResultStatus:0,
        }
    },

    [actionType.CollectionType.get_CollectionList]: (state, action) => {
        const {payload:{collectionList,colComplete}}=action
        return {
            ...state,
            collectionList:[...state.collectionList, ...collectionList],
            colComplete,
            colResultStatus: 2,
        }
    },
    [actionType.CollectionType.set_CollectionList]: (state, action) => {
        const {payload:{collectionList,colComplete}}=action
        return {
            ...state,
            collectionList:[...state.collectionList, ...collectionList],
            colComplete,
            colResultStatus: 1,
        }
    },
    [actionType.CollectionType.del_CollectionList]: (state, action) => {
        const {payload:{collectionList}}=action
        return {
            ...state,
            collectionList
        }
    },
},initialState)
