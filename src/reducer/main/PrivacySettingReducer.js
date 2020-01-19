import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    PrivacyId: "",
    name: 0,
    phone: 0,
    city: 0,
    car: 0,
    recommendToFriends: 0,
    msgAuthority: 0,
}

export default handleActions({
    [actionType.PrivacySettingType.set_privacyInfo]: (state, action) => {
        const {payload: {privacyInfo}} = action
        return {
            ...privacyInfo
        }
    }


}, initialState)
