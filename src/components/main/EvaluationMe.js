import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import { Provider} from '@ant-design/react-native'


class EvaluationMe extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const {evaluationMeReducer:{selected}}=this.props
        console.log(this.props)
        return (

            <View>
                {selected=='所有评论'&& <Text>所有评论</Text>}
                {selected=='我的文章'&& <Text>我的文章</Text>}
                {selected=='我的求助'&& <Text>我的求助</Text>}
                {selected=='我的评论'&& <Text>我的评论</Text>}
                {selected=='我的解答'&& <Text>我的解答</Text>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        evaluationMeReducer:state.EvaluationMeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(EvaluationMe)

const styles = StyleSheet.create({})
