import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, RefreshControl, InteractionManager, FlatList } from 'react-native'
import {Tabs, Icon, Popover, WhiteSpace, WingBlank, ActivityIndicator} from '@ant-design/react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { connect } from 'react-redux'
import * as action from '../../action/index'
import moment from 'moment'
import globalStyles from "../../utils/GlobalStyles";


class LvOneCommentList extends Component {
    componentDidMount() {
        const { navigation } = this.props
        this.props.getLvOneCommentListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getLvOneCommentList({ msgId: navigation.state.params.articleInfo._id }))
    }

    componentWillUnmount() {
        // this.props.rmArticleAllList()
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
                    <ActivityIndicator/>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
                </View>
            )

    }
    render() {
        // console.log('this.props', this.props)
        const { LvOneCommentListReducer, navigation: { state: { params: { articleInfo } } }, navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={LvOneCommentListReducer.data.lvOneCommentList}
                    ListHeaderComponent={
                        <View>
                            <View style={{ backgroundColor: '#f0f0f0', padding: 5 }}>
                                <WingBlank size='md' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text>评论（{articleInfo.comment_num ? `${articleInfo.comment_num}` : '0'}）</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>收藏 {articleInfo.collect_num ? `${articleInfo.collect_num}` : '0'}</Text>
                                        <Text style={{ marginLeft: 5 }}>点赞 {articleInfo.agree_num ? `${articleInfo.agree_num}` : '0'}</Text>
                                    </View>
                                </WingBlank>
                            </View>
                            <WhiteSpace size='md' />
                        </View>
                    }
                    renderItem={({ item }) => {
                        // console.log('item', item)
                        return (
                            <WingBlank size='md' style={{ flexDirection: 'row' }}>
                                <View style={{ height: 48, width: 48 }} >
                                    <Image source={{ uri: item.user_detail_info[0] && item.user_detail_info[0].avatar ? item.user_detail_info[0].avatar : 'personalicon' }} style={{ width: 48, height: 48, borderRadius: 24, }} />
                                </View>
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text>{item.user_detail_info[0] ? `${item.user_detail_info[0].nick_name}` : ''}</Text>
                                    <Text>{item.comment ? `${item.comment}` : ''}</Text>
                                    <WhiteSpace size='sm' />
                                    {item.comment_num > 0 && <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('LvTwoCommentList', { parentCommentInfo: item })
                                            }}
                                            style={{ backgroundColor: '#f0f0f0', padding: 5 }}>
                                            <Text>共{item.comment_num ? `${item.comment_num}` : '0'}条回复 ></Text>
                                        </TouchableOpacity>
                                        <WhiteSpace size='sm' />
                                    </View>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingBottom: 5 }}>
                                        <Text>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', alignItems: 'center', width: 50, justifyContent: 'center' }}
                                                onPress={() => {
                                                    navigation.navigate('Comment', { lvOneComment: item, level: 2 })
                                                    // console.log("speech")
                                                }}>
                                                <SimpleLineIcons name="speech" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                this.props.likeLvOneComment({
                                                    msgId: item._msg_id,
                                                    msgUserId: item._msg_user_id,
                                                    msgComId: item._id,
                                                    msgComUserId: item._user_id
                                                })
                                            }} style={{ flexDirection: 'row', alignItems: 'center', width: 50, justifyContent: 'flex-end' }}>
                                                <SimpleLineIcons name="like" />
                                                <Text style={{ marginLeft: 5 }}>{item.agree_num ? `${item.agree_num}` : '0'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <WhiteSpace size='lg' />
                                </View>
                            </WingBlank>
                        )
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={['#1598cc']}
                            refreshing={LvOneCommentListReducer.getLvOneCommentList.isResultStatus == 1}
                            onRefresh={() => {
                                this.props.getLvOneCommentListWaiting()
                                InteractionManager.runAfterInteractions(() => this.props.getLvOneCommentList({ msgId: navigation.state.params.articleInfo._id }))
                            }}
                        />
                    }
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (LvOneCommentListReducer.getLvOneCommentList.isResultStatus == 2 && !LvOneCommentListReducer.data.isCompleted) {
                            this.props.getLvOneCommentListMore({ msgId: navigation.state.params.articleInfo._id })
                        }
                    }}
                    ListEmptyComponent={LvOneCommentListReducer.getLvOneCommentList.isResultStatus != 1 && this.renderEmpty}
                    ListFooterComponent={LvOneCommentListReducer.getLvOneCommentListMore.isResultStatus == 1 ? this.ListFooterComponent : <View />}
                />
                <View style={{ height: 50, flexDirection: 'row', borderWidth: 0.5 }} >
                    <TouchableOpacity
                        style={{
                            flex: 1, backgroundColor: '#f0f0f0', flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5
                        }}
                        onPress={() => {
                            navigation.navigate('Comment', { articleInfo, level: 1 })
                        }}>
                        <Icon name="message" color='#777' />
                        <Text style={{ marginLeft: 5, color: '#777' }}>评论</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1, justifyContent: 'center', flexDirection: 'row',
                            alignItems: 'center', backgroundColor: '#f0f0f0'
                        }}
                        onPress={() => {
                            console.log('like')
                            this.props.likeLvOneComment({
                                type: 1,
                                msgId: articleInfo._id,
                                msgUserId: articleInfo._user_id
                            })
                        }}>
                        <Icon name="like" color='#777' />
                        <Text style={{ marginLeft: 5, color: '#777' }}>赞</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        LvOneCommentListReducer: state.LvOneCommentListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLvOneCommentList: (reqParams) => {
        dispatch(action.CommentLvOneAction.getLvOneCommentList(reqParams))
    },
    getLvOneCommentListWaiting: () => {
        dispatch(action.CommentLvOneAction.getLvOneCommentListWaiting())
    },
    getLvOneCommentListMore: (reqParams) => {
        dispatch(action.CommentLvOneAction.getLvOneCommentListMore(reqParams))
    },
    likeLvOneComment: reqParams => {
        dispatch(action.CommentLvOneAction.likeLvOneComment(reqParams))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LvOneCommentList)
