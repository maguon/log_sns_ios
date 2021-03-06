import * as actionType from '../../actionType/index'
import HttpRequest from '../../utils/HttpRequest'
import {apiHost} from '../../config/HostConfig'
import { Portal, Toast } from '@ant-design/react-native'
import {Alert} from "react-native";
import * as action from "../index";

let  param=""
let  value=""
export const createComment = reqParam => async (dispatch, getState) => {
    const {LoginReducer: {userId},CommentReducer:{comment}} = getState()
    try {
        console.log('reqParam', reqParam)
        // console.log('comment', comment)
        const {navigation,navigation: {state: {params: {item, level}}}} = reqParam

        if (level == 1) {
            param={  comment: comment,
                msgType: item.type,
                level: level,
                msgId: item._id,
                msgUserId: item._user_id}
            value={
                _id: item._id,
                _user_id: item._user_id
            }
        } else {
            param = {
                comment: comment,
                msgType: item.msg_type,
                level: level,
                msgId: item._msg_id,
                msgUserId: item._msg_user_id,
                msgComId: item._id,
                msgComUserId: item._user_id
            }
            value={
                _id: item._msg_id,
                _user_id: item._msg_user_id
            }
        }

        const url = `${apiHost}/user/${userId}/msgComment`
        console.log('param', param)
        const res = await HttpRequest.post(url, param)
        // console.log('res', res)
        if (res.success) {
            dispatch(actionType.CommentType.set_Comment(""))
            Alert.alert("", "评论已发送", [ {
                text: "确定", onPress: () => {

                    dispatch(action.DetailAction.getCommentOne(value))
                    navigation.state.params.callBack()
                    navigation.pop()
                }
            }])

        } else {
            Toast.success("评论失败！", 0.5)
        }


    } catch (err) {
        Toast.success("评论失败！", 0.5)
    }
}
