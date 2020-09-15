
import React, { Component } from 'react'
import { View, Text, InteractionManager, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Provider, WhiteSpace, WingBlank} from '@ant-design/react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import * as action from '../../action/index'
import globalStyles from "../../utils/GlobalStyles"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//二级评论
class EvaluationList extends Component {

    componentDidMount() {
        const { navigation } = this.props
        this.props.getCommentListWaiting()
        InteractionManager.runAfterInteractions(() => {
            this.props.getCommentList({ parentCommentId: navigation.state.params.parentCommentInfo._id })
        })
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
        const { evaluationMeReducer, navigation } = this.props
        console.log('evaluationMeReducer', evaluationMeReducer)
        return (
            <Provider>
                <SafeAreaView style={{flex: 1}}>
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={evaluationMeReducer.data.commentList}
                renderItem={params => {
                    const { item, index } = params

                    return (
                        <WingBlank size='md'>
                            <WhiteSpace size='md' />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 48, height: 48, borderRadius: 24, marginRight: 10 }} >
                                    <Image source={{ uri: item.user_detail_info[0] && item.user_detail_info[0].avatar ? `${item.user_detail_info[0].avatar}` : 'personalicon' }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <View>
                                            <Text>{item.user_detail_info[0] ? `${item.user_detail_info[0].nick_name}` : ''}</Text>
                                            <Text>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.likeComment({
                                                    msgId: item._msg_id,
                                                    msgUserId: item._msg_user_id,
                                                    msgComId: item._id,
                                                    msgComUserId: item._user_id
                                                })
                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <SimpleLineIcons name="like" style={{ marginRight: 10 }} />
                                            <Text>{item.agree_num ? `${item.agree_num}` : '0'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ borderBottomWidth: 0.5, paddingBottom: 10 }}>
                                        <Text>{item.comment ? `${item.comment}` : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </WingBlank>
                    )
                }}
                refreshControl={
                    <RefreshControl
                        colors={['#1598cc']}
                        refreshing={evaluationMeReducer.getCommentList.isResultStatus == 1}
                        onRefresh={() => {
                            this.props.getCommentListWaiting()
                            this.props.getCommentList({ parentCommentId: navigation.state.params.parentCommentInfo._id })
                        }}
                    />
                }
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (evaluationMeReducer.getCommentList.isResultStatus == 2 && !evaluationMeReducer.data.isCompleted) {
                        this.props.getCommentListMore({ parentCommentId: navigation.state.params.parentCommentInfo._id })
                    }
                }}
                ListEmptyComponent={evaluationMeReducer.getCommentList.isResultStatus != 1 && this.renderEmpty}
                ListFooterComponent={evaluationMeReducer.getCommentListMore.isResultStatus == 1 ? this.ListFooterComponent: <View />}
            />
                </SafeAreaView>
            </Provider>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        evaluationMeReducer: state.EvaluationMeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommentList: reqParams => {
        dispatch(action.EvaluationListAction.getCommentList(reqParams))
    },
    getCommentListWaiting: () => {
        dispatch(action.EvaluationListAction.getCommentListWaiting())
    },
    getCommentListMore: reqParams => {
        dispatch(action.EvaluationListAction.getCommentListMore(reqParams))
    },
    likeComment: reqParams => {
        dispatch(action.EvaluationListAction.likeComment(reqParams))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationList)
