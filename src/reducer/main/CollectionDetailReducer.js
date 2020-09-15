import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    Coll_comment:[],
    collUser:""
}

export  default  handleActions({

    [actionType.CollectionDetailType.Coll_Comment_success]: (state, action) => {
        const {payload: {Coll_comment}} = action
        return {
            ...state,
            Coll_comment
        }
    },
    [actionType.CollectionDetailType.Coll_commentUser]: (state, action) => {
        const {payload: {collUser}} = action
        return {
            ...state,
            collUser
        }
    },


},initialState)
