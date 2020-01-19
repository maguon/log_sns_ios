import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    contactList: []
}

export default handleActions({

    [actionType.ContactType.get_contactList]: (state, action) => {
        return {
            ...state,
            contactList: action.payload.contactList
        }
    },

}, initialState)
