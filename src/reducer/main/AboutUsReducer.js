import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState={
  aboutUsList:[]
}

export  default  handleActions({

    [actionType.AboutUsType.SET_ABOUTUS_INFO]: (state, action) => {
        const { payload: { aboutUsList } } = action
        return {
            aboutUsList:aboutUsList
        }
    }

},initialState)
