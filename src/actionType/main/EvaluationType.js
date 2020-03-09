import {createAction} from 'redux-actions'

export const get_myCommentList_success = createAction('get_myCommentList_success')
export const get_myCommentList_failed = createAction('get_myCommentList_failed')
export const get_myCommentList_waiting = createAction('get_myCommentList_waiting')

export const get_myCommentListMore_success = createAction('get_myCommentListMore_success')
export const get_myCommentListMore_failed = createAction('get_myCommentListMore_failed')
export const get_myCommentListMore_waiting =createAction( 'get_myCommentListMore_waiting')
