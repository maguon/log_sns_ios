import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    Coll_comment:[],
    Coll_commentTwo:[]
}

export  default  handleActions({

    [actionType.DetailType.get_Comment_success]: (state, action) => {
        const {payload: {Coll_comment}} = action
        return {
            ...state,
            Coll_comment
        }
    },
    [actionType.DetailType.get_commentTwo]: (state, action) => {
        const {payload: {Coll_commentTwo}} = action
        return {
            ...state,
            Coll_commentTwo
        }
    },

},initialState)
