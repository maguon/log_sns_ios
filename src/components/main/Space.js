import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity, ImageBackground
} from 'react-native'
import * as action from "../../action/index";
import globalStyles, {styleColor} from "../../utils/GlobalStyles"
import AntDesign from "react-native-vector-icons/AntDesign"
import {Button, Modal, Provider, WhiteSpace, WingBlank,Card} from "@ant-design/react-native"
import moment from "moment"
import * as actionType from "../../actionType";
import Video from "react-native-video";
import {fileHost, videoHost} from "../../config/HostConfig";

const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
class Space extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemInfo:"",
            focus: false,
            praise: false,
            star: false,
            visible:false,
        }
    }

    componentDidMount() {
        const {params: {userId}} = this.props.navigation.state
        this.props.getSpaceLoad()
        this.props.getSpaceData(userId)
        this.props.getSpaceUser(userId)
        this.props.followStatus(userId)
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
    }

    renderItem = (props) => {
        const {item,index} = props
        const userInfo = item.user_detail_info[0]
        const  media= item.media

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
                                        <TouchableOpacity style={{width: 280, marginLeft: 5}}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <View style={{flexDirection: 'row'}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2,marginRight:15
                                                }]}>{item.address_name ? item.address_name : ''}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, marginTop: -15}}>
                                        <Text
                                            style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
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
                                                    <Image source={{uri: `${fileHost}/image/${item.url}`,cache: 'force-cache'}}
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
                                                this.props.navigation.navigate('Comment')
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                const params={
                                                    item:item,index:index
                                                }
                                                this.props.setPraise(params)
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

    cancelFollow = (param) => {
        Alert.alert("", `确定要取消关注吗？`, [{
            text: "确定", onPress: () => {
                this.props.cancelFollow(param)
            }
        }, {text: "取消", onPress: () => console.log('Cancel Pressed')}])

    }
    follow = (param) => {
        this.props.follow(param)
    }

    onClose = () => {
        this.setState({
            visible: false,
            star:false
        });
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


    render() {
        const {spaceReducer: {spaceData, spaceUser, spaceHidden,isComplete,spaceLoading, isResultStatus},getSpaceData, setCollection, follow, navigation: {state: {params: {userId}}}} = this.props
console.log(spaceData)
        return (
            <Provider>
            <View style={{flex: 1}}>
                <View style={{width: width, backgroundColor: styleColor}}>
                    <View style={{height: 50, flexDirection: "row", alignItems: "flex-end", marginLeft: 10}}>
                        <AntDesign name="left" size={20} style={{color: '#fff'}}
                                   onPress={() => this.props.navigation.goBack()}/>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                        <View style={{marginLeft: 10, marginRight: 10, marginBottom: 25}}>
                            {spaceUser.avatar ? <Image source={{uri: spaceUser.avatar}}
                                                       style={{width: 60, height: 60, borderRadius: 30}}/> :
                                <Image source={require('../../images/head.png')}
                                       style={{width: 60, height: 60, borderRadius: 30}}/>}
                        </View>


                        <View style={{width: width * 0.5}}>
                            <Text
                                style={[globalStyles.largeText, {color: '#fff'}]}>{spaceUser.nick_name ? spaceUser.nick_name : ""}</Text>
                            <Text style={[globalStyles.smallText, {marginTop: 5, color: '#fff'}]}>
                                关注 {spaceUser.follow_num ? spaceUser.follow_num : ""}|
                                粉丝 {spaceUser.attention_num ? spaceUser.attention_num : ""}</Text>
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                <Text style={[globalStyles.smallText, {
                                    marginTop: 2,
                                    color: '#fff',
                                    marginLeft: 2
                                }]}>{spaceUser.city_name ? spaceUser.city_name : ""}</Text>
                            </View>
                            <Text style={[globalStyles.smallText, {
                                marginTop: 5,
                                marginBottom: 15,
                                color: '#fff'
                            }]}>{spaceUser.intro ? spaceUser.intro : ""}</Text>
                        </View>



                            {spaceHidden.length==0 ?
                                    <Text style={[style.focus,{ backgroundColor: "#ffd000"}]}
                                                 onPress={() => {
                                                     this.follow(userId)
                                                 }}>关注</Text> : <Text style={[style.focus,{backgroundColor: "#8a8a8a"}]}
                                      onPress={()=>{this.cancelFollow(userId)}}>取消关注</Text>}


                    </View>
                </View>

                {spaceLoading?<FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={spaceData}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        // if (!isComplete) {
                        //     getSpaceData()
                        // }
                    }}
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                />:this.renderLoadingView()}

            </View>

                <Modal
                    popup
                    visible={this.state.visible}
                    animationType="slide-up"
                    onClose={this.onClose}
                >
                    <TouchableOpacity style={{height:80,justifyContent: "center",alignItems:"center",marginBottom:5}}
                                      onPress={()=>{
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
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        spaceReducer: state.SpaceReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getSpaceLoad:()=>{
        dispatch({type: actionType.SpaceType.get_spaceData_Loading, payload: {spaceLoading: false}})
    },
    getSpaceData: (value) => {
        console.log(value)
        dispatch(action.SpaceAction.getSpaceData(value))
    },
    getSpaceUser: (value) => {
        dispatch(action.SpaceAction.getSpaceUser(value))
    },
    followStatus: (value) => {
        dispatch(action.SpaceAction.followStatus(value))
    },
    cancelFollow: (value) => {
        dispatch(action.SpaceAction.cancelFollow(value))
    },
    follow: (value) => {
        dispatch(action.SpaceAction.follow(value))
    },
    setCollection: (value) => {
        dispatch(action.HomeAction.setCollection(value))
    },
    setPraise: (value) => {
        dispatch(action.SpaceAction.setPraise(value))
    },
})
export default connect(mapStateToProps, mapDispatchProps)(Space)


const style = StyleSheet.create({
    focus: {
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 12,
        position: 'absolute',
        right: 10,
        top: 0
    }
})
