import {createAction} from 'redux-actions'

export const Welcome_app_waiting = createAction('Welcome_app_waiting')
export const Welcome_app_failed = createAction('Welcome_app_failed')
export const Welcome_app_error = createAction('Welcome_app_error')
export const Welcome_app_complete = createAction('Welcome_app_complete')
