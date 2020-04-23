import {createAction} from 'redux-actions'

export const my_Camera_success = createAction('my_Camera_success')
export const my_Camera_waiting = createAction('my_Camera_waiting')
export const my_Camera_failed = createAction('my_Camera_failed')
export const my_Camera_error = createAction('my_Camera_error')
export const set_imageList = createAction('set_imageList')
export const del_imageList = createAction('del_imageList')
export const set_cameraList = createAction('set_cameraList')
export const del_cameraList = createAction('del_cameraList')
