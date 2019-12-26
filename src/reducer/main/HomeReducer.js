import { handleActions } from 'redux-actions'

const initialState = {
    data: {}
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(失败)]
export default handleActions({


}, initialState)
