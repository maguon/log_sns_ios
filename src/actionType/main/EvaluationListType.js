import {createAction} from 'redux-actions'

export const get_commentList_success = createAction('get_commentList_success')
export const get_commentList_failed = createAction('get_commentList_failed')
export const get_commentList_waiting = createAction('get_commentList_waiting')

export const get_commentListMore_success = createAction('get_commentListMore_success')
export const get_commentListMore_failed = createAction('get_commentListMore_failed')
export const get_commentListMore_waiting = createAction('get_commentListMore_waiting')

export const like_commentForCommentList_success =createAction( 'like_commentForCommentList_success')
export const like_commentForCommentList_failed = createAction('like_commentForCommentList_failed')
export const like_commentForCommentList_waiting = createAction('like_commentForCommentList_waiting')
