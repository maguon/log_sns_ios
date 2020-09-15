import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import * as action from "../../action";
import {fileHost} from "../../config/HostConfig";
import {ActivityIndicator} from "@ant-design/react-native";
import * as actionType from "../../actionType";

const {width, height} = Dimensions.get('window')
class PraiseMe extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getLikeMeList()
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
        const {praiseMeReducer:{likeMe,isComplete,isResultStatus},getLikeMeList,update} = this.props

        console.log(likeMe)

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={likeMe}
                    renderItem={(params) => {
                        const {item, index} = params
                        const userInfo = item.praise_user_detail_info[0]
                        const msgUserInfo = item.msg_user_detail_info[0]
                        const msgInfo=item.msg_info[0]

                        return (
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: "row",height:50,alignItems: "center"}}>

                                    <TouchableOpacity
                                        style={{marginLeft: width * 0.05,flexDirection:'row',}}
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



                                            <View style={{flexDirection:'column',marginLeft:5}}>
                                                <Text style={[globalStyles.fourText, {
                                                    fontWeight: "bold"
                                                }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                                <Text style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                            </View>
                                </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{position: 'absolute',right:10,width:50,height:20,borderWidth:0.5,borderColor:'#0595e5',alignItems:"center",justifyContent:"center"}}
                                            onPress={() => {
                                                this.props.navigation.navigate('Comment', {item: item,level:2})
                                            }}>
                                            <Text style={{fontSize: 14, color:'#0595e5'}}>回复</Text>
                                        </TouchableOpacity>



                                </View>
                                {item.type==1?<Text style={[globalStyles.midText,{marginLeft: width * 0.08, marginBottom:5}]}>赞了你动态</Text>:
                                    <Text style={[globalStyles.midText,{marginLeft: width * 0.08, marginBottom:5}]}>赞了你评论</Text>}
                                { msgInfo&&<View style={{height: 80, flexDirection: "row", alignItems: "center",backgroundColor:'#f2f2f2' }}>

                                    <TouchableOpacity
                                        style={{marginLeft:  width * 0.05,flexDirection: "row",}}
                                        onPress={() => {
                                            this.props.navigation.navigate('Detail',{item: msgInfo,itemList:item,callBack:()=>{this.props.update()}})
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
                            getLikeMeList()
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
        praiseMeReducer: state.PraiseMeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    loading: () => {
        dispatch({type: actionType.PraiseMeType.set_likeMeLoading})
    },
    getLikeMeList: () => {
        dispatch(action.PraiseMeAction.getLikeMeList())
    },
    update: () => {
        dispatch(action.PraiseMeAction.update())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(PraiseMe)

const styles = StyleSheet.create({})




