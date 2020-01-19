import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    aboutUsList: []
}

export default handleActions({

    [actionType.AboutUsType.set_AboutUs_Info]: (state, action) => {
        const {payload: {aboutUsList}} = action
        return {
            aboutUsList: aboutUsList
        }
    }

}, initialState)
