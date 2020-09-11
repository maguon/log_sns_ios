import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as action from "../../action";
import {fileHost} from "../../config/HostConfig";
import {ActivityIndicator} from "@ant-design/react-native";
import * as actionType from "../../actionType";

const {width, height} = Dimensions.get('window')
class Evaluation extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getEvaluation()
    }
    componentWillUnmount() {
        this.props.loading()
    }

    ListFooterComponent = (param) => {
        if(param==0){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator/>
                </View>
            )
        }else if (param == 1) {
            return(
                <View style={globalStyles.footerContainer}>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
                </View>
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
        const {EvaluationReducer:{evaluation,isComplete,isResultStatus},getEvaluation,update} = this.props

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={evaluation}
                    renderItem={(params) => {
                        const {item, index} = params
                        const userInfo = item.user_detail_info[0]
                        const msgUserInfo = item.msg_user_detail_info[0]
                        const msgInfo=item.msg_info[0]
                        console.log(item)
                        return (
                            <View style={{width: width}}>
                                <View style={{flexDirection: "row"}}>

                                    <TouchableOpacity
                                        style={{marginLeft: width * 0.05, marginTop: width * 0.05}}
                                        // onPress={() => {
                                        //     this.props.navigation.navigate('Space', {userId: item._user_id})
                                        // }}
                                    >
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
                                        marginTop: 10,
                                        marginBottom:10
                                    }}>
                                        <TouchableOpacity style={{flexDirection:'row',justifyContent: "space-between"}}  onPress={() => {
                                            this.props.navigation.navigate('Space', {userId: item._user_id})
                                        }}>
                                            <View style={{flexDirection:'column'}}>
                                                <Text style={[globalStyles.fourText, {
                                                    fontWeight: "bold"
                                                }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                                <Text style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                            </View>

                                        </TouchableOpacity>

                                        <Text style={[globalStyles.smallText, {
                                            fontWeight: "bold", marginTop: 5
                                        }]}>{item.comment}</Text>
                                        {item.comment_num!=0&&<TouchableOpacity style={{ width:width*0.8,height:30,backgroundColor: "#f2f2f2",justifyContent:"center",marginTop: 5}}
                                                                                onPress={()=>{
                                                                                    console.log(item)
                                                                                    this.props.navigation.navigate('CommentReply', {commentId:item._id,userId:item._user_id})
                                                                                    // getCommentTwo({commentId:item._msg_com_id})
                                                                                }}
                                        >
                                            <Text style={{marginLeft:5, color: '#1598cc',fontSize:12}}>共有{item.comment_num}条回复 ></Text>
                                        </TouchableOpacity>}


                                    </View>

                                </View>
                                { msgInfo&&<View style={{height: 80, flexDirection: "row", alignItems: "center",backgroundColor:'#f2f2f2' }}>

                                    <TouchableOpacity
                                        style={{marginLeft:  width * 0.05,flexDirection: "row",}}
                                        onPress={() => {
                                            this.props.navigation.navigate('Detail',{item: msgInfo,itemList:item})
                                        }}>
                                        {msgInfo.carrier==1&&<Image source={{uri: msgUserInfo.avatar, cache: 'force-cache'}}
                                                                    style={{width: 50, height: 50}}/>}
                                        {msgInfo.carrier==2&&<Image source={{uri: `${fileHost}/image/${msgInfo.media[0].url}`, cache: 'force-cache'}}
                                                                    style={{width: 50, height: 50}}/>}
                                        {msgInfo.carrier==3&&<Image source={{uri: `${fileHost}/image/${msgInfo.media[0].preview}`, cache: 'force-cache'}}
                                                                    style={{width: 50, height: 50}}/>}
                                        <View style={{flexDirection:'column',marginLeft:5}}>
                                            <Text style={[globalStyles.fourText, {
                                                fontWeight: "bold"
                                            }]}>{msgUserInfo.nick_name ? msgUserInfo.nick_name : '暂无昵称'}</Text>
                                            <Text style={[globalStyles.smallText,{marginTop:5, width:width*0.7}]}>{msgInfo.info ? (msgInfo.info.length > 80 ? msgInfo.info.substr(0, 80) + "..." : msgInfo.info) : ""}</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>}
                                <View style={{height: 1,backgroundColor:'#c0c1c2' }}></View>
                            </View>
                        )
                    }}
                    refreshing={false}
                    onRefresh={() => {
                        update()
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (!isComplete) {
                            getEvaluation()
                        }
                    }
                    }
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                    // ListEmptyComponent={this.renderEmpty}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        EvaluationReducer:state.EvaluationReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    loading: () => {
        dispatch({type: actionType.EvaluationType.evaLoading})
    },
    getEvaluation: (value) => {
        dispatch(action.EvaluationAction.getEvaluation(value))
    },
    update: (value) => {
        dispatch(action.EvaluationMeAction.update(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Evaluation)

const styles = StyleSheet.create({})




