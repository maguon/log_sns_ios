//
// import React, { Component } from 'react'
// import {View, InteractionManager, FlatList, RefreshControl, Text} from 'react-native'
// import {WhiteSpace} from '@ant-design/react-native'
// import { connect } from 'react-redux'
// import * as action from '../../action/index'
// import globalStyles from "../../utils/GlobalStyles"
// import { commentToReply, commentToReplyMini, commentToArticle } from '../modules/Util'
// import { Container, ArticleContainer, ArticleMini, Reply, ReplyMini } from '../modules/Reply/index'
//
// class CommentOnMeList extends Component {
//     componentDidMount() {
//         this.props.getCommentOnMeListWaiting()
//         InteractionManager.runAfterInteractions(() => this.props.getCommentOnMeList())
//     }
//
//     renderEmpty = () => {
//         return (
//             <View style={globalStyles.listEmptyContainer}>
//                 <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
//             </View>
//         )
//     }
//
//
//     ListFooterComponent = () => {
//         return (
//             <View style={globalStyles.footerContainer}>
//                 <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
//             </View>
//         )
//     }
//
//
//     render() {
//         const { evaluationMeReducer, loginReducer } = this.props
//         console.log('evaluationMeReducer', evaluationMeReducer)
//         return (
//             <FlatList
//                 keyExtractor={(item, index) => `${index}`}
//                 data={evaluationMeReducer.data.commentOnMeList}
//                 renderItem={params => {
//                     const { item, index } = params
//                     console.log(item)
//                     return (
//                         <View>
//                             <Container style={{ backgroundColor: '#fff' }}>
//                                 <Reply data={commentToReply(item)} replyButtonIsVisible={item.level < 2} />
//                                 <ArticleContainer >
//                                     {item.level > 1 && <ReplyMini data={commentToReplyMini(item, loginReducer.userId)} />}
//                                     {item.msg_info.length > 0 && item.msg_user_detail_info.length > 0 && <ArticleMini data={commentToArticle(item)} />}
//                                 </ArticleContainer>
//                             </Container>
//                             <WhiteSpace size='md' />
//                         </View>
//
//                     )
//                 }}
//                 refreshControl={
//                     <RefreshControl
//                         colors={['#1598cc']}
//                         refreshing={evaluationMeReducer.getCommentOnMeList.isResultStatus == 1}
//                         onRefresh={() => {
//                             this.props.getCommentOnMeListWaiting()
//                             this.props.getCommentOnMeList()
//                         }}
//                     />
//                 }
//                 onEndReachedThreshold={0.2}
//                 onEndReached={() => {
//                     if (evaluationMeReducer.getCommentOnMeList.isResultStatus == 2 && !evaluationMeReducer.data.isCompleted) {
//                         this.props.getCommentOnMeListMore()
//                     }
//                 }}
//                 ListEmptyComponent={evaluationMeReducer.getCommentOnMeList.isResultStatus != 1 && this.renderEmpty}
//                 ListFooterComponent={evaluationMeReducer.getCommentOnMeListMore.isResultStatus == 1 ? this.ListFooterComponent: <View />}
//             />
//         )
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         evaluationMeReducer: state.EvaluationMeReducer,
//         loginReducer: state.LoginReducer
//     }
// }
//
// const mapDispatchToProps = (dispatch) => ({
//     getCommentOnMeList: () => {
//         dispatch(action.EvaluationMeAction.getCommentOnMeList())
//     },
//     getCommentOnMeListMore: () => {
//         dispatch(action.EvaluationMeAction.getCommentOnMeListMore())
//     },
//     getCommentOnMeListWaiting: () => {
//         dispatch(action.EvaluationMeAction.getCommentOnMeListWaiting())
//     }
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(CommentOnMeList)


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as action from "../../action";

const {width, height} = Dimensions.get('window')
class EvaluationMe extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getEvaluationMe()
    }
    render() {
        const {EvaluationMeReducer:{evaluationMe}} = this.props

        console.log(evaluationMe)
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={evaluationMe}
                    renderItem={(params) => {
                        const {item, index} = params
                        const userInfo = item.user_detail_info[0]
                        console.log(item)
                        return (
                            <View style={{width: width}}>
                                <View style={{flexDirection: "row"}}>

                                    <TouchableOpacity
                                        style={{marginLeft: width * 0.05, marginTop: width * 0.05}}
                                        onPress={() => {
                                            this.props.navigation.navigate('Space', {userId: item._user_id})
                                        }}>
                                        {userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
                                                                  style={{
                                                                      width: 35,
                                                                      height: 35,
                                                                      borderRadius: 30
                                                                  }}/> :
                                            <Image source={require('../../images/head.png')}
                                                   style={{width: 40, height: 40, borderRadius: 30}}/>}
                                    </TouchableOpacity>

                                    <View style={{
                                        width:width*0.8,
                                        flexDirection: "column",
                                        marginLeft: 10,
                                        marginTop: width * 0.05,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:"#bcbdbe"
                                    }}>
                                        <View style={{flexDirection:'row',justifyContent: "space-between"}}>
                                            <View style={{flexDirection:'column'}}>
                                        <Text style={[globalStyles.fourText, {
                                            fontWeight: "bold"
                                        }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                        <Text style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                            </View>

                                        <TouchableOpacity
                                            style={{marginRight:15}}
                                            onPress={() => {
                                                this.props.navigation.navigate('Comment', {item: item})
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            {/*<Text style={{fontSize: 14,borderWidth:0.5,borderColor:'#0595e5', color:'#0595e5'}}>回复</Text>*/}
                                        </TouchableOpacity>

                                        </View>

                                        <Text style={[globalStyles.smallText, {
                                            fontWeight: "bold", marginTop: 5
                                        }]}>{item.comment}</Text>
                                        {item.comment_num!=0&&<TouchableOpacity style={{ width:width*0.8,height:30,backgroundColor: "#f2f2f2",justifyContent:"center",marginTop: 5}}
                                                                                onPress={()=>{
                                                                                    console.log(item)
                                                                                    this.props.navigation.navigate('CommentReply', {commentId:item._id})
                                                                                    // getCommentTwo({commentId:item._msg_com_id})
                                                                                }}
                                        >
                                            <Text style={{marginLeft:5, color: '#1598cc',fontSize:12}}>共有{item.comment_num}条回复 ></Text>
                                        </TouchableOpacity>}

                                        {/*<View style={{height: 30, flexDirection: "row", alignItems: "center"}}>*/}

                                            {/*<TouchableOpacity*/}
                                                {/*style={{marginLeft: width * 0.28}}*/}
                                                {/*onPress={() => {*/}
                                                    {/*this.props.navigation.navigate('Comment', {item: item})*/}
                                                {/*}}>*/}
                                                {/*<AntDesign name="message1" style={{color: '#838485'}} size={18}/>*/}
                                            {/*</TouchableOpacity>*/}
                                            {/*<TouchableOpacity style={{marginLeft: width * 0.05,flexDirection: "row"}}*/}
                                                              {/*onPress={()=>{setPraise({item:item})}}>*/}
                                                {/*{item.user_praises == "" ? <AntDesign name="like2" size={18} style={{color: '#838485'}}/> :*/}
                                                    {/*<AntDesign name="like1" size={18} style={{color: '#ffa600'}}/>}*/}
                                                {/*<Text style={[globalStyles.midText,{marginLeft:2}]}>{item.agree_num}</Text>*/}
                                            {/*</TouchableOpacity>*/}

                                        {/*</View>*/}
                                    </View>

                                </View>
                            </View>
                        )
                    }}
                    refreshing={false}
                    // onRefresh={() => {
                    //     update(0)
                    // }}
                    // onEndReachedThreshold={0.2}
                    // onEndReached={() => {
                    //     if (!isComplete) {
                    //         getHotList()
                    //     }
                    // }
                    // }
                    // ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                    // ListEmptyComponent={this.renderEmpty}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        EvaluationMeReducer:state.EvaluationMeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({

    getEvaluationMe: (value) => {
        dispatch(action.EvaluationMeAction.getEvaluationMe(value))
    },
    // getCommentTwo: (value) => {
    //     dispatch(action.EvaluationMeAction.getCommentTwo(value))
    // },

})

export default connect(mapStateToProps, mapDispatchProps)(EvaluationMe)

const styles = StyleSheet.create({})

