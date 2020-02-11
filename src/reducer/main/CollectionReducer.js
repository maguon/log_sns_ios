import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    collectionList:[],
    isResultStatus:0,
}

export  default  handleActions({

    [actionType.CollectionType.get_CollectionList]: (state, action) => {
        const {payload:{collectionList}}=action
        return {
            ...state,
            collectionList
        }
    },

},initialState)
