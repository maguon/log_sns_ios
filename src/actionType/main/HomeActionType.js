import {createAction} from 'redux-actions'


export const get_HotList_success=createAction('get_HotList_success')
export const get_HotList_end=createAction('get_HotList_waiting')
export const set_HotLoading=createAction('set_HotLoading')
export const set_HotList_Praise=createAction('set_HotList_Praise')

export const get_HomeFollow=createAction('get_HomeFollow')
export const get_HomeFollow_end=createAction('get_HomeFollow_waiting')
export const set_HomeFollow_Praise=createAction('set_HomeFollow_Praise')

export const set_NearList_Praise=createAction('set_NearList_Praise')
export const get_NearList=createAction('get_NearList')
export const get_NearList_end=createAction('get_NearList_waiting')
export const get_address=createAction('get_address')

export const set_File=createAction('set_File')
export const add_File=createAction('add_File')
export const set_Waiting=createAction('set_Waiting')
