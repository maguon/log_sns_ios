import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    noticeId:"",
    info: 0,
    praise: 0,
    comments: 0,
    beConcernedAbout: 0,
    others: 0,
    worksReleasedByFollowers: 0,
    recommendedWorks: 0,
}

export  default  handleActions({
    [actionType.NoticeSettingType.SET_NOTICE_INFO]: (state, action) => {
        const { payload: { noticeInfo } } = action
        console.log(noticeInfo)
        return {
            ...noticeInfo
        }
    }


},initialState)
