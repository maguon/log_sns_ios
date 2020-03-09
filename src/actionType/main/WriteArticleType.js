import {createAction} from 'redux-actions'

export const create_content = createAction('create_content')
export const on_Switch_Change = createAction('on_Switch_Change')

export const create_article_success = createAction('create_article_success')
export const create_article_failed = createAction('create_article_failed')
export const create_article_waiting = createAction('create_article_waiting')

export const get_currentAddr_success = createAction('get_currentAddr_success')
export const get_currentAddr_failed = createAction('get_currentAddr_failed')
export const get_currentAddr_waiting = createAction('get_currentAddr_waiting')
export const remove_currentAddr = createAction('remove_currentAddr')
