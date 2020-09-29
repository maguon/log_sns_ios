import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions, Alert,
} from 'react-native'
import {Provider, Tabs, WhiteSpace, WingBlank, Card, Modal, Button} from '@ant-design/react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import {connect} from "react-redux"
import globalStyles from '../../utils/GlobalStyles'
import VoteItem from '../modules/VoteItem'
import * as action from "../../action/index"
import * as actionType from "../../actionType";
import Video from "react-native-video";
import {fileHost, videoHost} from "../../config/HostConfig";
import Entypo from "react-native-vector-icons/Entypo";
import {CacheHelper, AnimatedCacheImage} from 'react-native-rn-cacheimage';



const {width,height} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
let flatIndex=""
let infoFlat=""
let videoFlat=""
let helpFlat=""
let voteFlat = ""


export const renderComFlat =()=> {
    if(infoFlat==""){
        return
    }else if(flatIndex==0){
        infoFlat.scrollToOffset({offset: 0})
    }else if(flatIndex==1){
        videoFlat.scrollToOffset({offset: 0})
    }else if(flatIndex==2){
        helpFlat.scrollToOffset({offset: 0})
    }else if(flatIndex==3){
        voteFlat.scrollToOffset({offset: 0})
    }
 }

class Community extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            itemInfo:"",
            tabIndex:0,
            uri: "",
            moreVisible: false,
            shareVisible:false,
            follow:false,
            colls:false
        }
    }


    componentDidMount() {
        this.props.getComLoad()
        this.props.getComInfo()


    }


    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }


    //加载等待页
    renderLoadingView() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }


    ListFooterComponent = (param) => {
        if(param==1) {
            return(
                <View style={globalStyles.footerContainer}>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
                </View>
            )
        }else if(param==2) {
            return (
                <View style={globalStyles.footerContainer}>
                    <ActivityIndicator/>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
                </View>
            )
        }
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

    renderItem = (props) => {
        const {item,index} = props
        const  media= item.media
        const userInfo = item.user_detail_info[0]
        const {setComPraise} = this.props
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
                                                              follow:item.user_relations == "" ?true:false,
                                                              colls:item.user_msg_colls == "" ? true:false ,
                                                          })
                                                      }
                                                      }>
                                        <AntDesign name="ellipsis1" size={30} style={{color: '#414445'}}/>
                                    </TouchableOpacity>

                                }
                            />
                            <Card.Body>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('Detail',{item:item,itemList:"",callBack:()=>{this.props.update({tabIndex:this.state.tabIndex})}})
                                }}>
                                    <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} >
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
                                                    <AnimatedCacheImage source={{
                                                        uri: `${fileHost}/image/${item.url}`
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

                                <Video source={{uri:`${videoHost}${media[0].url}`}}
                                       paused={true}
                                       repeat={true}
                                       controls={true}
                                       resizeMode="cover"
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
                                                this.props.navigation.navigate('Detail',{item:item,itemList:"",callBack:()=>{this.props.update({tabIndex:this.state.tabIndex})}})
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                const params = {
                                                    item: item, tabIndex: this.state.tabIndex, index: index
                                                }
                                                setComPraise(params)
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
    renderItemTo = (props) => {
        const {item} = props
        return (
            <View style={{flex: 1}}>
                <VoteItem item={item} navigation={this.props.navigation}/>
            </View>
        )
    }

    render() {
        const tabs = [{title: '最近发布'}, {title: '视频'}, {title: '求助'}, {title: '投票'}]
        const {navigation,communityReducer: {comInfo,isComplete,isResultStatus, comLoading, comVideo, vidComplete, vidResultStatus,
            comHelp, helpComplete, helpResultStatus, comVoteList, voteComplete, voteResultStatus}, homeReducer: {waiting},
            getComInfo,getComVideo,getComHelp,getComVoteList,setCollection,update, shielding, delCollection} = this.props

        return (
            <Provider>
                <Tabs tabs={tabs}
                      onChange={(tab, index) => {
                          this.setState({tabIndex: index})
                          // this.props.getComLoad()
                          if(index==0){
                              getComInfo()
                          }else if(index==1){
                              getComVideo()
                          }else if(index==2){
                             getComHelp()
                          }else if(index==3){
                              getComVoteList()
                          }
                          flatIndex=index
                      }}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize: 14}}
                >
                    <View style={{flex: 1}}>
                        {comLoading&&
                            <FlatList
                                ref={(flatList) => {
                                    infoFlat = flatList
                                }}
                                data={comInfo}
                                renderItem={this.renderItem}
                                refreshing = { false }
                                onRefresh = {()=>{
                                    update({tabIndex:0,results:'success'})
                                }}
                                // ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!isComplete) {
                                       getComInfo()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                            />}
                        {!comLoading && this.renderLoadingView()}
                        </View>

                        <View style={{flex: 1}}>
                             <FlatList
                                ref={(flatList) => {
                                    videoFlat = flatList
                                }}
                                data={comVideo}
                                renderItem={this.renderItem}
                                refreshing = { false }
                                onRefresh = {()=>{
                                    update({tabIndex:1,results:'success'})
                                }}
                                // ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!vidComplete) {
                                       getComVideo()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(vidResultStatus)}
                            />
                        </View>


                        <View style={{flex: 1}}>
                            <FlatList
                                ref={(flatList) => {
                                    helpFlat = flatList
                                }}
                                data={comHelp}
                                renderItem={this.renderItem}
                                refreshing = { false }
                                onRefresh = {()=>{
                                    update({tabIndex:2,results:'success'})
                                }}
                                // ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!helpComplete) {
                                       getComHelp()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(helpResultStatus)}
                            />

                        </View>


                        <View style={{flex: 1}}>
                           <FlatList
                                ref={(flatList) => {
                                    voteFlat = flatList
                                }}
                                data={comVoteList}
                                renderItem={this.renderItemTo}
                                refreshing = { false }
                                onRefresh = {()=>{
                                    update({tabIndex:3,results:'success'})
                                }}
                                // ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!voteComplete) {
                                        getComVoteList()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(voteResultStatus)}
                            />

                        </View>

                </Tabs>


                <Modal
                    popup
                    visible={this.state.shareVisible}
                    animationType="slide-up"
                    onClose={this.shareClose}
                >
                    <TouchableOpacity
                        style={{height: 80, justifyContent: "center", alignItems: "center", marginBottom: 5}}
                    >
                        <AntDesign name="staro"size={50} color={'#ffa600'}/>
                        <Text style={globalStyles.midText}>分享</Text>
                    </TouchableOpacity>
                    <Button onPress={this.shareClose}>取消</Button>
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
                        {this.state.follow?
                            <TouchableOpacity style={style.border} onPress={() => {
                                this.setState({
                                    follow:false
                                })
                                const params = {
                                    item: this.state.itemInfo, tabIndex:this.state.tabIndex
                                }
                                this.props.comFollow(params)
                            }}>
                                <Entypo name="eye" size={20} color={'#22caff'}/>
                                <Text style={style.text}>关注</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity style={style.border} onPress={() => {

                                Alert.alert("", "确定要取消关注吗", [{text: "取消"}, {
                                    text: "确定", onPress: () => {
                                        this.setState({
                                            follow:true
                                        })
                                        const params = {
                                            item: this.state.itemInfo, tabIndex: this.state.tabIndex
                                        }
                                        this.props.comCancelFollow(params)
                                    }
                                }])
                            }}>
                                <Entypo name="eye-with-line" size={20} color={'#838485'}/>
                                <Text style={style.text}>已关注</Text>
                            </TouchableOpacity>}

                        {this.state.colls? <TouchableOpacity
                            style={style.border} onPress={() => {
                            this.setState({
                                colls: false
                            })
                            setCollection({item: this.state.itemInfo, tabIndex: this.state.tabIndex})
                            this.moreClose()
                        }}>
                            <AntDesign name="hearto" size={20} color={'#838485'}/>
                            <Text style={style.text}>收藏</Text>
                        </TouchableOpacity>:<TouchableOpacity
                            style={style.border}
                            onPress={() => {
                                Alert.alert("", "确定要取消收藏吗", [{text: "取消"}, {
                                    text: "确定", onPress: () => {
                                        this.setState({
                                            colls: true
                                        })
                                        console.log(this.state.itemInfo)
                                        delCollection({id: this.state.itemInfo.user_msg_colls[0]._id, tabIndex: this.state.tabIndex})
                                        this.moreClose()
                                    }
                                }])

                            }}
                        >
                            <AntDesign name="heart" size={20} color={'#ffaf27'}/>
                            <Text style={style.text}>已收藏</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity style={style.border}
                                          onPress={() => {
                                              Alert.alert("", "确定要屏蔽此用户消息吗", [{text: "取消"}, {
                                                  text: "确定", onPress: () => {
                                                      const params = {
                                                          item: this.state.itemInfo, tabIndex: this.state.tabIndex
                                                      }
                                                      shielding(params)
                                                      this.moreClose()
                                                  }
                                              }])

                                          }}>
                            <AntDesign name="deleteuser" size={20} color={'#838485'}/>
                            <Text style={style.text}>屏蔽</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40}}
                                          onPress={()=>{
                                              this.moreClose()
                                              this.props.navigation.navigate('Report',{item: this.state.itemInfo})
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



const mapStateToProps = (state) => {
    return {
        communityReducer: state.CommunityReducer,
        homeReducer: state.HomeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getComLoad:()=>{
        dispatch({type: actionType.CommunityType.set_ComLoading, payload: {comLoading: false}})
    },
    getComInfo: () => {
        dispatch(action.CommunityAction.getComInfo())
    },
    getComHelp: () => {
        dispatch(action.CommunityAction.getComHelp())
    },
    getComVideo: () => {
        dispatch(action.CommunityAction.getComVideo())
    },
    getComVoteList: () => {
        dispatch(action.CommunityAction.getComVoteList())
    },
    setCollection: (value) => {
        dispatch(action.CommunityAction.setCollection(value))
    },
    delCollection: (value) => {
        dispatch(action.CommunityAction.delCollection(value))
    },
    setComPraise: (value) => {
        dispatch(action.CommunityAction.setComPraise(value))
    },
    comCancelFollow: (value) => {
        dispatch(action.CommunityAction.comCancelFollow(value))
    },
    comFollow: (value) => {
        dispatch(action.CommunityAction.comFollow(value))
    },
    update: (value) => {
        dispatch(action.CommunityAction.update(value))
    },
    shielding: (value) => {
        dispatch(action.CommunityAction.shielding(value))
    },


})

export default connect(mapStateToProps, mapDispatchProps)(Community)


const style = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
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

})
