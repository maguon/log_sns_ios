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



