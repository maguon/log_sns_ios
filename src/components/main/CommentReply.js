import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, FlatList, ScrollView,TouchableOpacity,Image, Dimensions} from 'react-native'
import * as action from "../../action";
import globalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ActivityIndicator} from "@ant-design/react-native";

const {width, height} = Dimensions.get('window')
class CommentReply extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const {navigation: {state: {params: {commentId,userId}}}} = this.props
        this.props.getCommentReply({commentId,userId})
    }


    ListFooterComponent = (param) => {
        if (param == 1) {
            return (
                <View style={{height: 10}}/>
            )

        } else if (param == 2) {
            return (
                <View style={globalStyles.footerContainer}>
                    <ActivityIndicator/>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
                </View>
            )
        }

    }
    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }

    render() {
        const {navigation: {state: {params: {commentId,userId}}},CommentReplyReducer:{commentReply}} = this.props
        console.log(this.props)
        return (
            <ScrollView >
                <FlatList
                    data={commentReply}
                    renderItem={(params) => {
                        const {item} = params
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
                                        <TouchableOpacity  onPress={() => {
                                            this.props.navigation.navigate('Space', {userId: item._user_id})
                                        }}>
                                        <Text style={[globalStyles.fourText, {
                                            fontWeight: "bold"
                                        }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                        </TouchableOpacity>
                                        <Text style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>

                                        <TouchableOpacity>
                                        <Text style={[globalStyles.smallText, {
                                            fontWeight: "bold", marginTop: 5, marginBottom:10
                                        }]}>{item.comment}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                    }}
                    refreshing={false}
                    // ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                    ListEmptyComponent={this.renderEmpty}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        CommentReplyReducer:state.CommentReplyReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getCommentReply: (value) => {
        dispatch(action.CommentReplyAction.getCommentReply(value))
    },

})

export default connect(mapStateToProps, mapDispatchProps)(CommentReply)

const styles = StyleSheet.create({})

