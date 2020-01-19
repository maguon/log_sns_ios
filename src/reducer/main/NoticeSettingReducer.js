import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    noticeId: "",
    sysmsg: 0,
    praise: 0,
    comment: 0,
    attention: 0,
    others: 0,
    followAddmsg: 0,
}

export default handleActions({
    [actionType.NoticeSettingType.set_Notice_Info]: (state, action) => {
        const {payload: {noticeInfo}} = action
        return {
            ...noticeInfo
        }
    }


}, initialState)
