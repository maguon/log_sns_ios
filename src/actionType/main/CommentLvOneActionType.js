import {createAction} from 'redux-actions'

export const get_lvOneCommentList_success = createAction('get_lvOneCommentList_success')
export const get_lvOneCommentList_failed = createAction('get_lvOneCommentList_failed')
export const get_lvOneCommentList_waiting = createAction('get_lvOneCommentList_waiting')

export const get_lvOneCommentListMore_success = createAction('get_lvOneCommentListMore_success')
export const get_lvOneCommentListMore_failed = createAction('get_lvOneCommentListMore_failed')
export const get_lvOneCommentListMore_waiting = createAction('get_lvOneCommentListMore_waiting')

export const like_lvOneComment_success = createAction('like_lvOneComment_success')
export const like_lvOneComment_failed = createAction('like_lvOneComment_failed')
export const like_lvOneComment_waiting = createAction('like_lvOneComment_waiting')
