import {handleActions} from 'redux-actions'
import * as actionType from '../../actionType/index'

const initialState = {
    imageList:[],
    cameraList:[],

}

export default handleActions({
    [actionType.CameraType.set_imageList]: (state, action) => {
        const {payload: {imageList}} = action
        return {
            ...state,
            imageList:[...state.imageList,imageList],
        }
    },

    [actionType.CameraType.del_imageList]: (state, action) => {
        const {payload: {imageList}} = action
        return {
            ...state,
            imageList:imageList,
        }
    },

    [actionType.CameraType.set_cameraList]: (state, action) => {
        const {payload: {cameraList}} = action
        return {
            ...state,
            cameraList:[...state.cameraList,cameraList],
        }
    },


}, initialState)
