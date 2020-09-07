import {apiHost} from '../../config/HostConfig'
import HttpRequest from '../../utils/HttpRequest'
import {Alert} from 'react-native'
import {Toast} from '@ant-design/react-native'

import * as action from '../../action/index'

export const setSupport = (value ) => async (dispatch, getState) => {
    const {LoginReducer: {userId}} = getState()
    console.log(value)
    const {itemId,voteItem,navigation}=value
    const param={voteId:itemId,optionItem:voteItem}
    try {
        if(voteItem.length==0) {
                Alert.alert("", "请选择投票选项", [{text: "确定"}])
        }else {
             const url = `${apiHost}/user/${userId}/userVote`
             const res = await HttpRequest.post(url, param)
            console.log(param)
            console.log(res)
            if(res.success){
                Toast.loading('Loading...', 0.5, () => {
                    Alert.alert("", "投票成功确认返回", [{text: "确定", onPress: () =>{
                        dispatch(action.CommunityAction.update(3))
                        navigation.goBack()}}])
                })

            }else {
                Toast.fail(res.msg)
            }
         }

    } catch (err) {
        Toast.fail(err.message)
    }

}
