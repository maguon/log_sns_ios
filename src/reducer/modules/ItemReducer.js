import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    focus: false,
    praise: false,
    star: false,
}

export  default  handleActions({

    [actionType.ItemType.get_Focus]: (state, action) => {
        const {payload:{focus}}=action
        return {
            ...state,
            focus
        }
    },

    [actionType.ItemType.get_Praise]: (state, action) => {
        const {payload:{praise}}=action
        return {
            ...state,
            praise
        }
    },

    [actionType.ItemType.get_Star]: (state, action) => {
        const {payload:{star}}=action
        return {
            ...state,
            star
        }
    },



},initialState)
