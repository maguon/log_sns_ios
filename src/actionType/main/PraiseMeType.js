import {createAction} from 'redux-actions'

export const get_likeMeList_success = createAction('get_likeMeList_success')
export const get_likeMeList_failed = createAction('get_likeMeList_failed')
export const get_likeMeList_waiting = createAction('get_likeMeList_waiting')

export const get_likeMeListMore_success =createAction( 'get_likeMeListMore_success')
export const get_likeMeListMore_failed = createAction('get_likeMeListMore_failed')
export const get_likeMeListMore_waiting =createAction( 'get_likeMeListMore_waiting')
