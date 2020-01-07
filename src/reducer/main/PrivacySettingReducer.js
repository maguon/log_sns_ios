import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    PrivacyId:"",
    name_display:0,
    phone_display: 0,
    city_display: 0,
    car_display: 0,
    recommend_to_friends: 0,
    message_authority: 0,
}

export  default  handleActions({
    [actionType.PrivacySettingType.SET_PRIVACYINFO]: (state, action) => {
        const { payload: { privacyInfo } } = action
        return {
            ...privacyInfo
        }
    }


},initialState)
