import React, { Component } from 'react'
import {FlatList, View, InteractionManager, RefreshControl, Text} from 'react-native'
import {  WhiteSpace} from '@ant-design/react-native'
import { connect } from 'react-redux'
import * as action from '../../action/index'
import { Container, ArticleContainer, ArticleMini, ReplySimple, ReplyMini } from '../modules/Reply/index'
import { commentToReply, commentToReplyMini, commentToArticle } from '../modules/Util'
import globalStyles from "../../utils/GlobalStyles"

class Evaluation extends Component {
    componentDidMount() {
        this.props.getCommentListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCommentList())
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
        const { evaluationReducer,loginReducer } = this.props
        console.log('myCommentListReducer', evaluationReducer)
        return (
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={evaluationReducer.data.commentList}
                renderItem={params => {
                    const { item, index } = params
                    return (
                        <View>
                            <Container style={{ backgroundColor: '#fff' }}>
                                <ReplySimple data={commentToReply(item)} />
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
                        refreshing={evaluationReducer.getCommentList.isResultStatus == 1}
                        onRefresh={() => {
                            this.props.getCommentListWaiting()
                            this.props.getCommentList()
                        }}
                    />
                }
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (evaluationReducer.getCommentList.isResultStatus == 2 && !evaluationReducer.data.isCompleted) {
                        this.props.getCommentListMore()
                    }
                }}
                ListEmptyComponent={evaluationReducer.getCommentList.isResultStatus != 1 && this.renderEmpty}
                ListFooterComponent={evaluationReducer.getCommentListMore.isResultStatus == 1 ? this.ListFooterComponent: <View />}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        evaluationReducer: state.EvaluationReducer,
        loginReducer: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommentList: () => {
        dispatch(action.EvaluationAction.getCommentList())
    },
    getCommentListWaiting: () => {
        dispatch(action.EvaluationAction.getCommentListWaiting())
    },
    getCommentListMore: () => {
        dispatch(action.EvaluationAction.getCommentListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Evaluation)
