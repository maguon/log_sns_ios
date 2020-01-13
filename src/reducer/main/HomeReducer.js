import { handleActions } from 'redux-actions'
import * as actionType from "../../actionType/index"

const initialState = {
    data: {},
    pageSize:10,
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({
    [actionType.HomeActionType.get_Data]: (state, action) => {
        const { payload: { data } } = action
        return {
            data:data
        }
    },
    [actionType.HomeActionType.update_PageSize]: (state, action) => {
        const { payload: { pageSize } } = action
        return {
            pageSize:pageSize
        }
    }

}, initialState)
