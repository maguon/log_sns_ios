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
import {Card, Provider} from "@ant-design/react-native/lib/card";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import * as action from "../../action";
import {ActivityIndicator} from "@ant-design/react-native";
import {CachedImage} from "react-native-img-cache"

const {width, height} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3

class CollectionDetail extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const {navigation: {state: {params: {item}}}} = this.props
        this.props.CollCommentOne(item)
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
        const {navigation: {state: {params: {item}}}, CollectionDetailReducer: {Coll_comment}, setPraise} = this.props
        console.log(item)
        const detailInfo = item.msg_user_detail_info[0]
        const media = item.msg_info[0].media
        const msgInfo = item.msg_info[0]
        if (msgInfo.carrier == 2) {
            if (msgInfo.media.length < 2) {
                cellWH = (width - 2 * 20 - 15) / 1.1
            } else if (msgInfo.media.length < 3) {
                cellWH = (width - 2 * 20 - 15) / 2.1
            } else if (msgInfo.media.length >= 3) {
                cellWH = (width - 2 * 20 - 15) / 3.3
            }
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>
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
                            <Text style={[globalStyles.smallText]}>{msgInfo.read_num} 人阅读</Text>
                        </View>
                        <Text style={[globalStyles.midText, {
                            marginLeft: width * 0.05,
                            marginRight: width * 0.05
                        }]}>{msgInfo.info ? msgInfo.info : ""}</Text>

                        {msgInfo.carrier == 2 && <FlatList
                            data={media}
                            numColumns={3}
                            renderItem={(params) => {
                                const {items, index} = params
                                return (
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        this.props.navigation.navigate("ImageView", {
                                            media: media,
                                            index: index
                                        })
                                    }}>

                                        <View style={globalStyles.item}>
                                            <CachedImage source={{
                                                uri: `${fileHost}/image/${items.url}`,
                                            }}
                                                   style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            }
                            contentContainerStyle={globalStyles.list_container}
                        />}

                        {msgInfo.carrier == 3 &&

                        <Video source={{uri: `${videoHost}${media[0].url}`}}
                               paused={true}
                               repeat={true}
                               controls={true}
                               resizeMode="cover"
                               style={globalStyles.image}/>
                        }
                        {msgInfo.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}
                                                               style={globalStyles.image}></ImageBackground>}

                        <View style={{
                            width: width, height: 40, backgroundColor: "#f2f2f2",
                            flexDirection: "row", alignItems: "center", marginTop: 20
                        }}>
                            <Text
                                style={[globalStyles.largeText, {marginLeft: width * 0.05}]}>评论（{msgInfo.comment_num}）</Text>
                            <Text style={[globalStyles.midText, {marginLeft: width * 0.3}]}>收藏 {msgInfo.collect_num}</Text>
                            <Text style={[globalStyles.midText, {marginLeft: width * 0.1}]}>赞 {msgInfo.agree_num}</Text>
                        </View>

                        <View style={{width: width, marginBottom: 40}}>
                            {Coll_comment == "" ?
                                <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}><Text
                                    style={{fontSize: 18, color: "#838485"}}>暂无评论</Text></View> :
                                < FlatList
                                    data={Coll_comment}
                                    renderItem={(params) => {
                                        const {items, index} = params
                                        const userInfo = items.user_detail_info[0]
                                        // console.log(item)
                                        return (
                                            <View style={{width: width}}>
                                                <View style={{flexDirection: "row"}}>

                                                    <TouchableOpacity
                                                        style={{marginLeft: width * 0.05, marginTop: width * 0.05}}
                                                        onPress={() => {
                                                            this.props.navigation.navigate('Space', {userId: items._user_id})
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
                                                        marginTop: width * 0.05,
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: "#bcbdbe"
                                                    }}>
                                                        <Text style={[globalStyles.fourText, {
                                                            fontWeight: "bold"
                                                        }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                                                        <Text style={[globalStyles.smallText, {
                                                            fontWeight: "bold", marginTop: 5
                                                        }]}>{items.comment}</Text>
                                                        {items.comment_num != 0 && <TouchableOpacity style={{
                                                            width: width * 0.8,
                                                            height: 30,
                                                            backgroundColor: "#f2f2f2",
                                                            justifyContent: "center",
                                                            marginTop: 5
                                                        }} onPress={() => {
                                                            this.props.navigation.navigate('CommentReply', {
                                                                commentId: items._id,
                                                                userId: items._user_id
                                                            })
                                                        }}
                                                        >
                                                            <Text style={{
                                                                marginLeft: 5,
                                                                color: '#1598cc',
                                                                fontSize: 12
                                                            }}>共有{items.comment_num}条回复
                                                                ></Text>
                                                        </TouchableOpacity>}

                                                        <View style={{
                                                            height: 30,
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            <Text
                                                                style={[globalStyles.smallText]}>{items.created_at ? `${moment(items.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                                            <TouchableOpacity
                                                                style={{marginLeft: width * 0.28}}
                                                                onPress={() => {
                                                                    this.props.navigation.navigate('Comment', {
                                                                        item: items,
                                                                        level: 2
                                                                    })
                                                                }}>
                                                                <AntDesign name="message1" style={{color: '#838485'}}
                                                                           size={18}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={{marginLeft: width * 0.05, flexDirection: "row"}}
                                                                onPress={() => {
                                                                    setPraise({items: items})
                                                                }}>
                                                                {items.user_praises == "" ?
                                                                    <AntDesign name="like2" size={18}
                                                                               style={{color: '#838485'}}/> :
                                                                    <AntDesign name="like1" size={18}
                                                                               style={{color: '#ffa600'}}/>}
                                                                <Text
                                                                    style={[globalStyles.midText, {marginLeft: 2}]}>{items.agree_num}</Text>
                                                            </TouchableOpacity>

                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            }
                        </View>


                    </View>
                </ScrollView>
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    height: 40,
                    width: width,
                    backgroundColor: "#f2f2f2",
                    justifyContent: "center"
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity style={[globalStyles.midText, styles.bottomBut]}>
                            <AntDesign name="export" size={18} style={{color: '#838485'}}/>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>收藏</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[globalStyles.midText, styles.bottomBut]}
                            onPress={() => {
                                this.props.navigation.navigate('Comment', {item: item, level: 1})
                            }}>
                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>评论</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.midText, styles.bottomBut]}
                            onPress={() => {
                                const params = {
                                    item: item, tabIndex: 0
                                }
                                this.props.Praise(params)
                            }}>
                            {item.user_praises == "" ?
                                <AntDesign name="like2" size={18} style={{color: '#838485'}}/> :
                                <AntDesign name="like1" size={18} style={{color: '#ffa600'}}/>}
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>赞</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        CollectionDetailReducer: state.CollectionDetailReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    CollCommentOne: (value) => {
        dispatch(action.CollectionDetailAction. CollCommentOne(value))
    },
    CollCommentTwo: (value) => {
        dispatch(action.CollectionDetailAction. CollCommentTwo(value))
    },
    setPraise: (value) => {
        dispatch(action.CollectionDetailAction.setPraise(value))
    },
    Praise: (value) => {
        dispatch(action.HomeAction.setPraise(value))
    }

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

