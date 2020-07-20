import { handleActions } from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    comment:""
}

export default handleActions({
    [actionType.CommentType.set_Comment]: (state, action) => {
        const {payload} = action
        return {
            ...state,
            comment:payload
        }
    }

},initialState)
