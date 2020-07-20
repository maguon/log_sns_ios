import React, {Component} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import { TextareaItem,Provider} from '@ant-design/react-native'
import {connect} from 'react-redux'
import * as actionType from "../../actionType";

class Comment extends Component {
    constructor(props) {
        super(props)
    }

    onChange = (param) => {
        this.props.setComment(param)
    }

    render() {
        return (

                <ScrollView>
                    <TextareaItem rows={6}
                                  placeholder="输入评论内容"
                                  count={100}
                                  onChange={this.onChange}/>

                </ScrollView>

        )
    }
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({
    setComment: (value) => {
        dispatch(actionType.CommentType.set_Comment(value))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Comment)

const styles = StyleSheet.create({})


// export default reduxForm({
//     form: 'Comment',
//     onSubmit: (values, dispatch, props) => {
//         const { navigation: { state: { params: { level } } } } = props
//         // console.log('level', level)
//         if (level == 1) {
//             const { navigation: { state: { params: { articleInfo } } } } = props
//             dispatch(action.CommentAction.createComment({
//                 comment: values.msgComment,
//                 msgType: articleInfo.type,
//                 level: level,
//                 msgId: articleInfo._id,
//                 msgUserId: articleInfo._user_id
//             }))
//         } else if (level == 2) {
//             const { navigation: { state: { params: { lvOneComment } } } } = props
//             // console.log('lvOneComment', lvOneComment)
//             // console.log('level', level)
//
//             dispatch(action.CommentAction.createComment({
//                 comment: values.msgComment,
//                 msgType: lvOneComment.msg_type,
//                 level: level,
//                 msgId: lvOneComment._msg_id,
//                 msgUserId: lvOneComment._msg_user_id,
//                 msgComId: lvOneComment._id,
//                 msgComUserId: lvOneComment._user_id
//             }))
//         }
//     }
// })(Comment)
