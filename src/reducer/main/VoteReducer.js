import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    itemList:[]

}

export  default  handleActions({
    [actionType.VoteType.set_itemList]: (state, action) => {
        const {payload: {itemList}} = action
        return {
            ...state,
            itemList,
        }
    },


},initialState)
