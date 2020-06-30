import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
    buttonText:"提交"
}

export  default  handleActions({

    [actionType.ReportType.set_Button_text]: (state, action) => {
        const {payload: {buttonText}} = action
        return {
            ...state,
            buttonText
        }
    },

},initialState)
