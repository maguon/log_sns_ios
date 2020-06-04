import React, { Component } from 'react'
import { View } from 'react-native'
import {List, TextareaItem, Toast} from '@ant-design/react-native'
import { reduxForm, Field } from 'redux-form'
import * as action from '../../action/index'
import { required, requiredObj } from '../../utils/validators'

const requiredValidator = required('必填')

const msgCommentField = props => {
    const { input, meta: { error } } = props
    return (
        <TextareaItem rows={8}
                      placeholder="输入文章内容"
                      count={100}
                      error={error}
                      onErrorClick={() => Toast.info(error, 1, undefined, false)}
                      input={input}
                      onChange={onChange}/>
    )
}

class Comment extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Field
                    name='msgComment'
                    component={msgCommentField}
                    validate={[requiredValidator]} />
            </View>
        )
    }
}

export default reduxForm({
    form: 'Comment',
    onSubmit: (values, dispatch, props) => {
        const { navigation: { state: { params: { level } } } } = props
        // console.log('level', level)
        if (level == 1) {
            const { navigation: { state: { params: { articleInfo } } } } = props
            dispatch(action.CommentAction.createComment({
                comment: values.msgComment,
                msgType: articleInfo.type,
                level: level,
                msgId: articleInfo._id,
                msgUserId: articleInfo._user_id
            }))
        } else if (level == 2) {
            const { navigation: { state: { params: { lvOneComment } } } } = props
            // console.log('lvOneComment', lvOneComment)
            // console.log('level', level)

            dispatch(action.CommentAction.createComment({
                comment: values.msgComment,
                msgType: lvOneComment.msg_type,
                level: level,
                msgId: lvOneComment._msg_id,
                msgUserId: lvOneComment._msg_user_id,
                msgComId: lvOneComment._id,
                msgComUserId: lvOneComment._user_id
            }))
        }
    }
})(Comment)
