// import React, { Component } from 'react'
// import { View, Text, InteractionManager, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import * as action from '../../action/index'
// import { WhiteSpace, WingBlank, ActivityIndicator} from '@ant-design/react-native'
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import moment from 'moment'
// import globalStyles from "../../utils/GlobalStyles"
//
// //二级评论
// class LvTwoCommentList extends Component {
//
//     componentDidMount() {
//         const { navigation } = this.props
//         this.props.getLvTwoCommentListWaiting()
//         InteractionManager.runAfterInteractions(() => {
//             this.props.getLvTwoCommentList({ parentCommentId: navigation.state.params.parentCommentInfo._id })
//         })
//     }
//
//
//     renderEmpty = () => {
//         return (
//             <View style={globalStyles.listEmptyContainer}>
//                 <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
//             </View>
//         )
//     }
//
//     ListFooterComponent = () => {
//         return (
//             <View style={globalStyles.footerContainer}>
//                 <ActivityIndicator/>
//                 <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
//             </View>
//         )
//
//     }
//
//     render() {
//         const { lvTwoCommentListReducer, navigation } = this.props
//         // console.log('lvTwoCommentListReducer', lvTwoCommentListReducer)
//         return (
//             <FlatList
//                 keyExtractor={(item, index) => `${index}`}
//                 data={lvTwoCommentListReducer.data.lvTwoCommentList}
//                 renderItem={params => {
//                     const { item, index } = params
//
//                     return (
//                         <WingBlank size='md'>
//                             <WhiteSpace size='md' />
//                             <View style={{ flexDirection: 'row' }}>
//                                 <View style={{ width: 48, height: 48, borderRadius: 24, marginRight: 10 }} >
//                                     <Image source={{ uri: item.user_detail_info[0] && item.user_detail_info[0].avatar ? `${item.user_detail_info[0].avatar}` : 'personalicon' }} style={{ width: 48, height: 48, borderRadius: 24 }} />
//                                 </View>
//                                 <View style={{ flex: 1 }}>
//                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                                         <View>
//                                             <Text>{item.user_detail_info[0] ? `${item.user_detail_info[0].nick_name}` : ''}</Text>
//                                             <Text>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
//                                         </View>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 this.props.lvTwoCommentList({
//                                                     msgId: item._msg_id,
//                                                     msgUserId: item._msg_user_id,
//                                                     msgComId: item._id,
//                                                     msgComUserId: item._user_id
//                                                 })
//                                             }}
//                                             style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                             <SimpleLineIcons name="like" style={{ marginRight: 10 }} />
//                                             <Text>{item.agree_num ? `${item.agree_num}` : '0'}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={{ borderBottomWidth: 0.5, paddingBottom: 10 }}>
//                                         <Text>{item.comment ? `${item.comment}` : ''}</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </WingBlank>
//                     )
//                 }}
//                 refreshControl={
//                     <RefreshControl
//                         colors={['#1598cc']}
//                         refreshing={lvTwoCommentListReducer.getLvTwoCommentList.isResultStatus == 1}
//                         onRefresh={() => {
//                             this.props.getLvTwoCommentListWaiting()
//                             this.props.getLvTwoCommentList({ parentCommentId: navigation.state.params.parentCommentInfo._id })
//                         }}
//                     />
//                 }
//                 onEndReachedThreshold={0.2}
//                 onEndReached={() => {
//                     if (lvTwoCommentListReducer.getLvTwoCommentList.isResultStatus == 2 && !lvTwoCommentListReducer.data.isCompleted) {
//                         this.props.getLvTwoCommentListMore({ parentCommentId: navigation.state.params.parentCommentInfo._id })
//                     }
//                 }}
//                 ListEmptyComponent={lvTwoCommentListReducer.getLvTwoCommentList.isResultStatus != 1 && this.renderEmpty}
//                 ListFooterComponent={lvTwoCommentListReducer.getLvTwoCommentListMore.isResultStatus == 1 ? this.ListFooterComponent : <View />}
//             />
//         )
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         lvTwoCommentListReducer: state.lvTwoCommentListReducer,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => ({
//     getLvTwoCommentList: reqParams => {
//         dispatch(action.CommentLvTwoAction.getLvTwoCommentList(reqParams))
//     },
//     getLvTwoCommentListWaiting: () => {
//         dispatch(action.CommentLvTwoAction.getLvTwoCommentListWaiting())
//     },
//     getLvTwoCommentListMore: reqParams => {
//         dispatch(action.CommentLvTwoAction.getLvTwoCommentListMore(reqParams))
//     },
//     lvTwoCommentList: reqParams => {
//         dispatch(action.CommentLvTwoAction.lvTwoCommentList(reqParams))
//     }
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(LvTwoCommentList)
