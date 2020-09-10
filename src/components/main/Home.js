import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ImageBackground, Alert, StyleSheet
} from 'react-native'

import {
    Provider,
    WhiteSpace,
    WingBlank,
    Card,
    Modal,
    Button,
    ActivityIndicator,
    Popover
} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import * as action from "../../action"
import globalStyles from "../../utils/GlobalStyles"
import Geolocation from '@react-native-community/geolocation'
import * as actionType from "../../actionType/index";
import Video from "react-native-video";
import {fileHost, videoHost} from '../../config/HostConfig'
import Entypo from "react-native-vector-icons/Entypo";
import {CacheHelper, AnimatedCacheImage} from 'react-native-rn-cacheimage';

const {width, height} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
const Item = Popover.Item

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemInfo: "",
            uri: "",
            moreVisible: false,
            shareVisible: false,
            follow: false,
            colls:false
        }
    }

    componentDidMount() {
        this.props.getHotLoad()
        this.props.getHotList()
        // this.props.getHomeFollow()
        // Geolocation.getCurrentPosition(info => this.props.getNearList(info))
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
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

    //加载等待页
    renderLoadingView() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            }}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    moreClose = () => {
        this.setState({
            moreVisible: false
        });
    }
    shareClose = () => {
        this.setState({
            shareVisible: false
        });
    }
    onLoadStart = () => {
        return (
            <ActivityIndicator size="large" color="red"/>
        )
    }

    renderItem = (props) => {
        const {item, index} = props
        const media = item.media
        const userInfo = item.user_detail_info[0]
        const {setPraise, navigation: {state: {params = {tabIndex: 0}}}} = this.props
        const {tabIndex} = params
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
            <View style={{flex: 1}}>
                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Header
                                title={
                                    <TouchableOpacity style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}
                                                      onPress={() => {
                                                          this.props.navigation.navigate('Space', {userId: item._user_id})
                                                      }}>
                                        {userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
                                                                  style={{width: 40, height: 40, borderRadius: 30}}/> :
                                            <Image source={require('../../images/head.png')}
                                                   style={{width: 40, height: 40, borderRadius: 30}}/>}
                                        <View style={{width: width * 0.5, marginLeft: 5}}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <Text
                                                style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>

                                            {item.address_name != "" &&
                                            <View style={{flexDirection: 'row', width: width * 0.65}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2, marginLeft: 2
                                                }]}>{item.address_name}</Text>
                                            </View>}
                                        </View>
                                    </TouchableOpacity>
                                }

                                extra={
                                    <TouchableOpacity style={{position: 'absolute', right: 0, top: -25,}}
                                                      onPress={() => {
                                                          this.setState({
                                                              moreVisible: true,
                                                              itemInfo: item,
                                                              follow: item.user_relations == "" ? true : false,
                                                              colls:item.user_msg_colls == "" ? false:true ,
                                                          })
                                                      }
                                                      }>
                                        <AntDesign name="ellipsis1" size={30} style={{color: '#414445'}}/>
                                    </TouchableOpacity>
                                }
                            />
                            <Card.Body>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('Detail', {item: item, itemList: "",})
                                }}>
                                    <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]}>
                                        {item.info ? (item.info.length > 40 ? item.info.substr(0, 40) + "..." : item.info) : ""}
                                        {item.info.length > 40 ? <Text style={globalStyles.previewText}>全文</Text> : ""}
                                    </Text>
                                </TouchableOpacity>
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
                                                    <AnimatedCacheImage source={{uri: `${fileHost}/image/${item.url}`}}
                                                                        onLoadStart={this.onLoadStart}
                                                                 style={{
                                                                     width: cellWH,
                                                                     height: cellWH,
                                                                     borderRadius: 5
                                                                 }}/>
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
                                    //
                                    // <ImageBackground source={{uri: 'http://media.myxxjs.com/group1/M00/00/01/Ch4sOV9YH8CADDYtAAEZs2X_3f4797.png'}}
                                    //              style={globalStyles.image}>
                                    //     <TouchableOpacity  onPress={() => {
                                    //         this.props.navigation.navigate('Detail', {item: item, itemList: ""})
                                    //     }}>
                                    //     <AntDesign name="play" size={60} color='#323334'/>
                                    //     </TouchableOpacity>
                                    // </ImageBackground>

                               }


                                {item.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}
                                                                       style={globalStyles.image}></ImageBackground>}
                            </Card.Body>

                            <Card.Footer
                                content={
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.setState({
                                                    shareVisible: true,
                                                    itemInfo: item
                                                })
                                            }}>
                                            <AntDesign name="export" size={18}
                                                       style={{color: '#838485'}}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.collect_num ? item.collect_num : 0}</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.props.navigation.navigate('Detail', {item: item, itemList: ""})
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                const params = {
                                                    item: item, tabIndex: tabIndex, index: index
                                                }
                                                setPraise(params)
                                            }}>
                                            {item.user_praises == "" ?
                                                <AntDesign name="like2" size={18} style={{color: '#838485'}}/> :
                                                <AntDesign name="like1" size={18} style={{color: '#ffa600'}}/>}
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.agree_num ? item.agree_num : 0}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </Card>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
                </View>
            </View>
        )
    }


    render() {
        const {
            navigation: {state: {params = {tabIndex: 0}}}, homeReducer: {
                hotList, hotLoading, isComplete, isResultStatus,
                homeFollow, homeComplete, homeResultStatus, nearList, nearComplete, nearResultStatus, waiting
            }, getHotList, getHomeFollow, getNearList, setCollection, update, shielding,delCollection
        } = this.props
        const {tabIndex} = params
        return (
            <Provider>
                <View style={{flex: 1}}>
                    {(tabIndex == 0 && hotLoading) &&
                    <FlatList
                        data={hotList}
                        renderItem={this.renderItem}
                        refreshing={false}
                        onRefresh={() => {
                            update(0)
                        }}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (!isComplete) {
                                getHotList()
                            }
                        }
                        }
                        ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                        ListEmptyComponent={this.renderEmpty}
                    />
                    }


                    {(tabIndex == 1 && hotLoading) &&
                    <FlatList
                        data={homeFollow}
                        renderItem={this.renderItem}
                        refreshing={false}
                        onRefresh={() => {
                            update(1)
                        }}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (!homeComplete) {
                                getHomeFollow()
                            }
                        }}
                        ListFooterComponent={this.ListFooterComponent(homeResultStatus)}
                        ListEmptyComponent={this.renderEmpty}
                    />
                    }


                    {(tabIndex == 2 && hotLoading) &&
                    <FlatList
                        data={nearList}
                        renderItem={this.renderItem}
                        refreshing={false}
                        onRefresh={() => {
                            update(2)
                        }}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (!nearComplete) {
                                Geolocation.getCurrentPosition(info => this.props.getNearList(info))
                            }
                        }}
                        ListFooterComponent={this.ListFooterComponent(nearResultStatus)}
                        ListEmptyComponent={this.renderEmpty}
                    />

                    }
                    {!hotLoading && this.renderLoadingView()}
                </View>

                <Modal
                    popup
                    visible={this.state.shareVisible}
                    animationType="slide-up"
                    onClose={this.shareClose}
                >
                    <TouchableOpacity
                        style={{height: 80, justifyContent: "center", alignItems: "center", marginBottom: 5}}
                    >
                        <AntDesign name="staro" size={50} color={'#ffa600'}/>
                        <Text style={globalStyles.midText}>分享</Text>
                    </TouchableOpacity>
                    <Button onPress={this.shareClose}>取消</Button>
                </Modal>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={waiting}
                    onRequestClose={() => {
                    }}
                    style={style.modalContainer}>

                    <View style={style.modalItem}>
                        <ActivityIndicator
                            animating={waiting}
                            style={style.modalActivityIndicator}
                            size="large"
                        />
                        <Text style={style.modalText}>正在加载...</Text>
                    </View>

                </Modal>


                <Modal
                    popup
                    visible={this.state.moreVisible}
                    animationType="slide-up"
                    onClose={this.moreClose}
                    style={{borderRadius: 10}}
                >
                    <ScrollView style={{height: 160, paddingVertical: 5, paddingHorizontal: 50}}>
                        {this.state.follow ?
                            <TouchableOpacity style={style.border} onPress={() => {
                                this.setState({
                                    follow: false
                                })
                                const params = {
                                    item: this.state.itemInfo, tabIndex: tabIndex
                                }
                                this.props.follow(params)
                            }}>
                                <Entypo name="eye" size={20} color={'#22caff'}/>
                                <Text style={style.text}>关注</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity style={style.border} onPress={() => {

                                Alert.alert("", "确定要取消关注吗", [{text: "取消"}, {
                                    text: "确定", onPress: () => {
                                        this.setState({
                                            follow: true
                                        })
                                        const params = {
                                            item: this.state.itemInfo, tabIndex: tabIndex
                                        }
                                        this.props.cancelFollow(params)
                                    }
                                }])
                            }}>
                                <Entypo name="eye-with-line" size={20} color={'#838485'}/>
                                <Text style={style.text}>已关注</Text>
                            </TouchableOpacity>}

                        {this.state.colls? <TouchableOpacity
                            style={style.border} onPress={() => {
                            Alert.alert("", "确定要取消收藏吗", [{text: "取消"}, {
                                text: "确定", onPress: () => {
                                    this.setState({
                                        colls: false
                                    })
                                    console.log(this.state.itemInfo)
                                    delCollection({item: this.state.itemInfo, tabIndex: tabIndex})
                                }
                            }])

                        }}
                        >
                            <AntDesign name="heart" size={20} color={'#ffaf27'}/>
                            <Text style={style.text}>已收藏</Text>
                        </TouchableOpacity>:<TouchableOpacity
                            style={style.border} onPress={() => {
                            this.setState({
                                colls: true
                            })
                            console.log(this.state.itemInfo)
                            setCollection({item: this.state.itemInfo, tabIndex: tabIndex})
                        }}>
                            <AntDesign name="hearto" size={20} color={'#838485'}/>
                            <Text style={style.text}>收藏</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity style={style.border}
                                          onPress={() => {
                                              Alert.alert("", "确定要屏蔽此用户消息吗", [{text: "取消"}, {
                                                  text: "确定", onPress: () => {
                                                      const params = {
                                                          item: this.state.itemInfo, tabIndex: tabIndex
                                                      }
                                                      shielding(params)
                                                      this.moreClose()
                                                  }
                                              }])

                                          }}>
                            <AntDesign name="deleteuser" size={20} color={'#838485'}/>
                            <Text style={style.text}>屏蔽</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40}}
                            onPress={() => {
                                this.moreClose()
                                this.props.navigation.navigate('Report', {item: this.state.itemInfo})
                            }}>
                            <AntDesign name="warning" size={20} color={'#ff1a37'}/>
                            <Text style={style.text}>举报</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Button type="primary" onPress={this.moreClose}>
                        取消
                    </Button>
                </Modal>

            </Provider>
        )
    }
}


const style = StyleSheet.create({
    modalContainer: {
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#d4d4d4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: '#414445',
        marginLeft: 10
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
});

const mapStateToProps = (state) => {
    return {
        homeReducer: state.HomeReducer
    }
}

const mapDispatchProps = (dispatch) => ({

    getHotLoad: () => {
        dispatch({type: actionType.HomeActionType.set_HotLoading, payload: {hotLoading: false}})
    },
    getHotList: () => {
        dispatch(action.HomeAction.getHotList())
    },
    getHomeFollow: () => {
        dispatch(action.HomeAction.getHomeFollow())
    },
    getNearList: (value) => {
        dispatch(action.HomeAction.getNearList(value))
    },
    setCollection: (value) => {
        dispatch(action.HomeAction.setCollection(value))
    },
    delCollection: (value) => {
        dispatch(action.HomeAction.delCollection(value))
    },
    setPraise: (value) => {
        dispatch(action.HomeAction.setPraise(value))
    },

    cancelFollow: (value) => {
        dispatch(action.HomeAction.cancelFollow(value))
    },
    follow: (value) => {
        dispatch(action.HomeAction.follow(value))
    },
    update: (value) => {
        dispatch(action.HomeAction.update(value))
    },
    shielding: (value) => {
        dispatch(action.HomeAction.shielding(value))
    },
    // cancelShielding: (value) => {
    //     dispatch(action.HomeAction.cancelShielding(value))
    // },

})

export default connect(mapStateToProps, mapDispatchProps)(Home)


