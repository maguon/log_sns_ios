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

import {Provider, WhiteSpace, WingBlank, Card, Modal, Button, ActivityIndicator} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import * as action from "../../action"
import globalStyles from "../../utils/GlobalStyles"
import Geolocation from '@react-native-community/geolocation'
import * as actionType from "../../actionType/index";
import Video from "react-native-video";
import {fileHost} from '../../config/HostConfig'


const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemInfo: "",
            star: false,
            visible: false,
            uri:"",

        }
    }

    componentDidMount() {
        this.props.getHotLoad()
        this.props.getHotList()
        this.props.getHomeFollow()
        Geolocation.getCurrentPosition(info => this.props.getNearList(info))
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
            return(
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
        // else{
        //     return (
        //         <View style={globalStyles.footerContainer}>
        //             <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
        //         </View>
        //
        //     )
        // }
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

    onClose = () => {
        this.setState({
            visible: false,
            star: false
        });
    }


    renderItem = (props) => {
        const {item,index} = props
        const  media= item.media
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
                                    <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
                                        {userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
                                                                  style={{width: 40, height: 40, borderRadius: 30}}/> :
                                            <Image source={require('../../images/head.png')}
                                                   style={{width: 40, height: 40, borderRadius: 30}}/>}
                                        <TouchableOpacity style={{width: 280, marginLeft: 5}} onPress={() => {
                                            this.props.navigation.navigate('Space', {userId: item._user_id})
                                        }}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <Text
                                                style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>

                                            {item.address_name!=""&&<View style={{flexDirection: 'row',   width:width*0.65}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2, marginLeft: 2
                                                }]}>{item.address_name}</Text>
                                            </View>}
                                        </TouchableOpacity>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, top: -20,}}>
                                        {item.user_relations == "" ?
                                        <Text style={[globalStyles.focus, {backgroundColor: "#000", color: "#fff"}]}
                                              onPress={() => {
                                                  const params={
                                                      item:item,tabIndex:tabIndex
                                                  }
                                                  this.props.follow(params)}}>关注</Text>:
                                            <Text style={[globalStyles.focus, {backgroundColor: "#c1c1c1", color: "#000"}]}
                                              onPress={() => {
                                                  Alert.alert("", "确定要取消关注吗", [{text: "确定", onPress: () => {
                                                          const params={
                                                              item:item,tabIndex:tabIndex
                                                          }
                                                          this.props.cancelFollow(params)
                                                      }},{text: "取消"}])
                                                  }}>取消关注</Text>}
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {
                                    this.props.navigation.navigate('Detail')
                                }}>
                                    {item.info ? (item.info.length > 40 ? item.info.substr(0, 40) + "..." : item.info) : ""}
                                    {item.info.length > 40 ?<Text style={globalStyles.previewText}>全文</Text>:""}
                                </Text>
                                {item.carrier == 2 && <FlatList
                                    data={media}
                                    numColumns={3}
                                    renderItem={(params) => {
                                        const {item,index} = params
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                                                this.props.navigation.navigate("ImageView",{media:media,index:index})
                                            }}>

                                                <View style={globalStyles.item}>
                                                    <Image source={{uri:  item.url,cache: 'force-cache'}}
                                                           style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    }
                                    contentContainerStyle={globalStyles.list_container}
                                />}

                                {item.carrier == 3 &&

                                <Video source={{uri:media[0].url}}
                                       paused={true}
                                       repeat={true}
                                       controls={true}
                                       style={globalStyles.image}/>
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
                                                    visible: true,
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
                                                this.props.navigation.navigate('Comment',{item:item})
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                const params={
                                                    item:item,tabIndex:tabIndex,index:index
                                                }
                                                setPraise(params)
                                            }}>
                                            {item.user_praises==""?<AntDesign name="like2" size={18} style={{color: '#838485'}}/>:
                                                                   <AntDesign name="like1" size={18} style={{color:'#ffa600'}}/>}
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
                homeFollow, homeComplete, homeResultStatus, nearList, nearComplete, nearResultStatus,waiting
            }, getHotList, getHomeFollow, getNearList, setCollection,update
        } = this.props
        const {tabIndex} = params
        // console.log(homeFollow)
        return (
            <Provider>
                <View style={{flex: 1}}>
                    {(tabIndex == 0 && hotLoading) &&
                    <FlatList
                        data={hotList}
                        renderItem={this.renderItem}
                        refreshing = { false }
                        onRefresh = {()=>{
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
                    {(tabIndex == 0 && !hotLoading) && this.renderLoadingView()}

                    {tabIndex == 1 &&
                    <FlatList
                        data={homeFollow}
                        renderItem={this.renderItem}
                        refreshing = { false }
                        onRefresh = {()=>{
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

                    {tabIndex == 2 &&
                    <FlatList
                        data={nearList}
                        renderItem={this.renderItem}
                        refreshing = { false }
                        onRefresh = {()=>{
                            update(2)
                        }}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (!nearComplete) {
                                getNearList()
                            }
                        }}
                        ListFooterComponent={this.ListFooterComponent(nearResultStatus)}
                        ListEmptyComponent={this.renderEmpty}
                    />

                    }
                </View>

                <Modal
                    popup
                    visible={this.state.visible}
                    animationType="slide-up"
                    onClose={this.onClose}
                >
                    <TouchableOpacity
                        style={{height: 80, justifyContent: "center", alignItems: "center", marginBottom: 5}}
                        onPress={() => {
                            this.setState({star: true})
                            setCollection(this.state.itemInfo)
                            this.onClose()
                        }}>
                        <AntDesign name={this.state.star ? "star" : "staro"} size={50}
                                   style={{color: this.state.star ? '#ffa600' : '#838485'}}/>
                        <Text style={globalStyles.midText}>收藏</Text>
                    </TouchableOpacity>
                    <Button onPress={this.onClose}>取消</Button>
                </Modal>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={waiting}
                    onRequestClose={() => { }}
                    style={style.modalContainer}>

                        <View style={style.modalItem}>
                            <ActivityIndicator
                                animating={waiting}
                                style={style.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={style.modalText}>正在上传视频...</Text>
                        </View>

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

    getHotLoad:()=>{
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
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Home)


