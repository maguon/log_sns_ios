import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import {fileHost, videoHost} from "../../config/HostConfig";
import Video from "react-native-video";
import {Card, Provider} from "@ant-design/react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import * as action from "../../action";
import {ActivityIndicator} from "@ant-design/react-native";
import {CacheHelper, AnimatedCacheImage} from 'react-native-rn-cacheimage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3

class CollectionDetail extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const {navigation: {state: {params: {item}}}} = this.props
        this.props.CollCommentOne(item)
        this.props.getCommentUser(item)
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
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无评论</Text>
            </View>
        )
    }

    //加载等待页
    renderLoadingView() {
        return (
            <View style={{marginTop:30}}>
                <ActivityIndicator animating={true} />
            </View>)
    }

    render() {
        const {CollectionDetailReducer: {Coll_comment,collUser,Loading}, setPraise} = this.props
        // console.log(collUser)
        // console.log(Coll_comment)
         const media = collUser.media
        const item = collUser

        if (item.carrier == 2) {
            if (item.media.length < 2) {
                cellWH = (width - 2 * 20 - 15) / 1.1
            } else if (item.media.length < 3) {
                cellWH = (width - 2 * 20 - 15) / 2.1
            } else if (item.media.length >= 3) {
                cellWH = (width - 2 * 20 - 15) / 3.3
            }
        }

        return (
            <Provider>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                        <View style={{
                            width: width * 0.9,
                            height: 40,
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: width * 0.05,
                            justifyContent: "space-between"
                        }}>
                            <Text
                                style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                            <Text style={[globalStyles.smallText]}>{item.read_num} 人阅读</Text>
                        </View>
                        <Text style={[globalStyles.midText, {
                            marginLeft: width * 0.05,
                            marginRight: width * 0.05
                        }]}>{item.info ? item.info : ""}</Text>

                        {item.carrier == 2 && <FlatList
                            data={media}
                            numColumns={3}
                            renderItem={(params) => {
                                const {item, index} = params
                                return (
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        this.props.navigation.navigate("ImageView", {
                                            media: media,
                                            index: index
                                        })
                                    }}>

                                        <View style={globalStyles.item}>
                                            <AnimatedCacheImage source={{
                                                uri: `${fileHost}/image/${item.url}`,
                                            }}
                                                   style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            }
                            contentContainerStyle={globalStyles.list_container}
                        />}

                        {item.carrier == 3 &&

                        <Video source={{uri: `${videoHost}${media[0].url}`}}
                               paused={true}
                               repeat={true}
                               controls={true}
                               resizeMode="cover"
                               style={globalStyles.image}/>
                        }
                        {item.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}
                                                               style={globalStyles.image}></ImageBackground>}

                        <View style={{
                            width: width, height: 40, backgroundColor: "#f2f2f2",
                            flexDirection: "row", alignItems: "center", marginTop: 20
                        }}>
                            <Text
                                style={[globalStyles.largeText, {marginLeft: 20}]}>评论（{item.comment_num}）</Text>
                            <View style={{position:'absolute',right:10,flexDirection: "row", alignItems: "center"}}>
                            <Text style={[globalStyles.midText, {marginRight: 20}]}>收藏 {item.collect_num}</Text>
                            <Text style={[globalStyles.midText, {marginRight: 20}]}>赞 {item.agree_num}</Text>
                            </View>
                        </View>

                        <View style={{width: width, marginBottom: 40}}>

                            {Loading ?this.renderLoadingView():< FlatList
                                    data={Coll_comment}
                                    renderItem={(params) => {
                                        const {item, index} = params
                                        const userInfo = item.user_detail_info[0]
                                        const msgInfo = item.msg_info[0]
                                        // console.log(item)
                                        return (
                                            <View style={{width: width}}>
                                                <View style={{flexDirection: "row"}}>

                                                    <TouchableOpacity
                                                        style={{marginLeft:20, marginTop:15}}
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
                                                        width: width * 0.8,
                                                        flexDirection: "column",
                                                        marginLeft: 10,
                                                        marginTop: 15,
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: "#bcbdbe"
                                                    }}>
                                                        <Text style={[globalStyles.fourText, {
                                                            fontWeight: "bold"
                                                        }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                                        <Text style={[globalStyles.smallText, {
                                                            fontWeight: "bold", marginTop: 5
                                                        }]}>{item.comment}</Text>
                                                        {item.comment_num != 0 && <TouchableOpacity style={{
                                                            width: width * 0.8,
                                                            height: 30,
                                                            backgroundColor: "#f2f2f2",
                                                            justifyContent: "center",
                                                            marginTop: 5
                                                        }} onPress={() => {
                                                            this.props.navigation.navigate('CommentReply', {
                                                                commentId: item._id,
                                                                userId: item._user_id
                                                            })
                                                        }}
                                                        >
                                                            <Text style={{
                                                                marginLeft: 5,
                                                                color: '#1598cc',
                                                                fontSize: 12
                                                            }}>共有{item.comment_num}条回复
                                                                ></Text>
                                                        </TouchableOpacity>}

                                                        <View style={{
                                                            height: 30,
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            <Text
                                                                style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>

                                                            <View style={{position:'absolute',right:10,flexDirection: "row", alignItems: "center"}}>
                                                            <TouchableOpacity
                                                                onPress={() => {

                                                                    this.props.navigation.navigate('Comment', {
                                                                        item: item,
                                                                        level: 2,callBack:()=>{this.props.CollCommentOne(item)}
                                                                    })
                                                                }}>
                                                                <AntDesign name="message1" style={{color: '#838485'}}
                                                                           size={18}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={{marginLeft: 20, flexDirection: "row"}}
                                                                onPress={() => {
                                                                    setPraise({item: item})
                                                                }}>
                                                                {item.user_praises == "" ?
                                                                    <AntDesign name="like2" size={18}
                                                                               style={{color: '#838485'}}/> :
                                                                    <AntDesign name="like1" size={18}
                                                                               style={{color: '#ffa600'}}/>}
                                                                <Text
                                                                    style={[globalStyles.midText, {marginLeft: 2}]}>{item.agree_num}</Text>
                                                            </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                    ListEmptyComponent={this.renderEmpty}
                                />}

                        </View>
                </ScrollView>
                <View style={{
                    height: 40,
                    width: width,
                    backgroundColor: "#f2f2f2",
                    justifyContent: "center"
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity style={[globalStyles.midText, styles.bottomBut]}>
                            <AntDesign name="export" size={18} style={{color: '#838485'}}/>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>转发</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[globalStyles.midText, styles.bottomBut]}
                            onPress={() => {
                                this.props.navigation.navigate('Comment', {item: item, level: 1,callBack:()=>{this.props.getCommentUser(item)}})
                            }}>
                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>评论</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.midText, styles.bottomBut]}
                            onPress={() => {
                                const params = {
                                    item: collUser
                                }
                                this.props.setPraiseOne(params)
                            }}>
                            {collUser.user_praises == "" ?
                                <AntDesign name="like2" size={18} style={{color: '#838485'}}/> :
                                <AntDesign name="like1" size={18} style={{color: '#ffa600'}}/>}
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>赞</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </SafeAreaView>
            </Provider>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        CollectionDetailReducer: state.CollectionDetailReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getCommentUser: (value) => {
        dispatch(action.CollectionDetailAction.getCommentUser(value))
    },
    CollCommentOne: (value) => {
        dispatch(action.CollectionDetailAction. CollCommentOne(value))
    },
    setPraise: (value) => {
        dispatch(action.CollectionDetailAction.setPraise(value))
    },

    setPraiseOne: (value) => {
        dispatch(action.CollectionDetailAction.setPraiseOne(value))
    },

})

export default connect(mapStateToProps, mapDispatchProps)(CollectionDetail)

const styles = StyleSheet.create({
    bottomBut: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.33
    }

})

