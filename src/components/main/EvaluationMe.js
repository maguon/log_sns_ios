// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {View, Text, StyleSheet} from 'react-native'
// import {Provider} from '@ant-design/react-native'
//
//
// class EvaluationMe extends Component {
//     constructor(props) {
//         super(props)
//
//     }
//
//     render() {
//         const {evaluationMeReducer: {selected}} = this.props
//         console.log(this.props)
//         return (
//
//             <View>
//                 {selected == '所有评论' && <Text>所有评论</Text>}
//                 {selected == '我的文章' && <Text>我的文章</Text>}
//                 {selected == '我的求助' && <Text>我的求助</Text>}
//                 {selected == '我的评论' && <Text>我的评论</Text>}
//                 {selected == '我的解答' && <Text>我的解答</Text>}
//             </View>
//         )
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         evaluationMeReducer: state.EvaluationMeReducer
//     }
// }
//
// const mapDispatchProps = (dispatch, props) => ({})
//
// export default connect(mapStateToProps, mapDispatchProps)(EvaluationMe)
//
// const styles = StyleSheet.create({})


import React, { Component } from 'react'
import {View, InteractionManager, FlatList, RefreshControl, Text} from 'react-native'
import {WhiteSpace} from '@ant-design/react-native'
import { connect } from 'react-redux'
import * as action from '../../action/index'
import globalStyles from "../../utils/GlobalStyles"
import { commentToReply, commentToReplyMini, commentToArticle } from '../modules/Util'
import { Container, ArticleContainer, ArticleMini, Reply, ReplyMini } from '../modules/Reply/index'

class CommentOnMeList extends Component {
    componentDidMount() {
        this.props.getCommentOnMeListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCommentOnMeList())
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }


    ListFooterComponent = () => {
        return (
            <View style={globalStyles.footerContainer}>
                <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
            </View>
        )
    }


    render() {
        const { evaluationMeReducer, loginReducer } = this.props
        console.log('evaluationMeReducer', evaluationMeReducer)
        return (
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={evaluationMeReducer.data.commentOnMeList}
                renderItem={params => {
                    const { item, index } = params
                    console.log(item)
                    return (
                        <View>
                            <Container style={{ backgroundColor: '#fff' }}>
                                <Reply data={commentToReply(item)} replyButtonIsVisible={item.level < 2} />
                                <ArticleContainer >
                                    {item.level > 1 && <ReplyMini data={commentToReplyMini(item, loginReducer.userId)} />}
                                    {item.msg_info.length > 0 && item.msg_user_detail_info.length > 0 && <ArticleMini data={commentToArticle(item)} />}
                                </ArticleContainer>
                            </Container>
                            <WhiteSpace size='md' />
                        </View>

                    )
                }}
                refreshControl={
                    <RefreshControl
                        colors={['#1598cc']}
                        refreshing={evaluationMeReducer.getCommentOnMeList.isResultStatus == 1}
                        onRefresh={() => {
                            this.props.getCommentOnMeListWaiting()
                            this.props.getCommentOnMeList()
                        }}
                    />
                }
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (evaluationMeReducer.getCommentOnMeList.isResultStatus == 2 && !evaluationMeReducer.data.isCompleted) {
                        this.props.getCommentOnMeListMore()
                    }
                }}
                ListEmptyComponent={evaluationMeReducer.getCommentOnMeList.isResultStatus != 1 && this.renderEmpty}
                ListFooterComponent={evaluationMeReducer.getCommentOnMeListMore.isResultStatus == 1 ? this.ListFooterComponent: <View />}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        evaluationMeReducer: state.EvaluationMeReducer,
        loginReducer: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommentOnMeList: () => {
        dispatch(action.EvaluationMeAction.getCommentOnMeList())
    },
    getCommentOnMeListMore: () => {
        dispatch(action.EvaluationMeAction.getCommentOnMeListMore())
    },
    getCommentOnMeListWaiting: () => {
        dispatch(action.EvaluationMeAction.getCommentOnMeListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentOnMeList)
