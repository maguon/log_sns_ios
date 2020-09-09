import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    size:"0kb"
}

export  default  handleActions({

    [actionType.SettingsType.get_size_success]: (state, action) => {
        const {payload: {size}} = action
        return {
            ...state,
            size
        }
    },

},initialState)
