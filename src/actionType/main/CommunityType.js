import {createAction} from 'redux-actions'

export const get_ComInfo=createAction('get_ComInfo')
export const set_ComInfo=createAction('set_ComInfo')
export const set_ComLoading=createAction('set_ComLoading')
export const set_ComInfo_Praise=createAction('set_ComInfo_Praise')

export const get_ComVideo=createAction('get_ComVideo')
export const set_ComVideo=createAction('set_ComVideo')
export const set_ComVideo_Praise=createAction('set_ComVideo_Praise')

export const get_ComHelp=createAction('get_ComHelp')
export const set_ComHelp=createAction('set_ComHelp')
export const set_ComHelp_Praise=createAction('set_ComHelp_Praise')

export const get_ComVoteList=createAction('get_ComVoteList')
export const set_ComVoteList=createAction('set_ComVoteList')
export const set_ComVoteList_Praise=createAction('set_ComVoteList_Praise')
