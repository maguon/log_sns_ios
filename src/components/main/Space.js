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
import Item from "../modules/Item"
import moment from "moment"

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

    ListFooterComponent = () => {
        return (
            <View style={globalStyles.footerContainer}>
                <ActivityIndicator color={globalStyles.styleColor} styleAttr='Small'/>
                <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载...</Text>
            </View>
        )
    }

    renderItem = (props) => {
        const {item} = props
        const userInfo = item.user_detail_info[0]

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
                                                    marginLeft: 2
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
                                    <Text style={globalStyles.previewText}>全文</Text>
                                </Text>
                                {item.carrier == 2 && <FlatList
                                    data={item.media}
                                    numColumns={3}
                                    renderItem={(params)=> {
                                        const { item } = params
                                        return (
                                            <TouchableOpacity activeOpacity={0.5}>
                                                <View style={globalStyles.item}>
                                                    <Image source={{uri: item.url}}
                                                           style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    }
                                    keyExtractor={(item, index) => `${index}`}
                                    contentContainerStyle={globalStyles.list_container}
                                />}

                                {item.carrier == 3 && <ImageBackground source={require('../../images/tall.png')}
                                                                       style={[globalStyles.image, {backgroundColor: '#292929'}]}>
                                    <AntDesign name="play" size={50} style={{color: '#cecece'}}></AntDesign>
                                </ImageBackground>}
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
                                                    itemInfo:item
                                                })
                                            }}>
                                            <AntDesign name="export" size={18}
                                                       style={{color:'#838485'}}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{item.collect_num ? item.collect_num :0}</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.props.navigation.navigate('Comment')
                                            }}>
                                            <AntDesign name="message1" style={{color:'#838485'}} size={18}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.setState({
                                                    praise: !this.state.praise
                                                })
                                            }}>
                                            <AntDesign name={this.state.praise ? "like1" : "like2"} size={18}
                                                       style={{color: this.state.praise ? '#ffa600' : '#838485'}}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]} >{item.agree_num ? item.agree_num : 0}</Text>
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

    render() {
        const {spaceReducer: {spaceData, spaceUser, spaceHidden, isResultStatus}, setCollection, follow, navigation: {state: {params: {userId}}}} = this.props
console.log(spaceHidden)
        return (
            <Provider>
            <View style={{flex: 1}}>
                <View style={{width: width, backgroundColor: styleColor}}>
                    <View style={{height: 75, flexDirection: "row", alignItems: "flex-end", marginLeft: 10}}>
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

                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={spaceData}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        // if (isResultStatus == 0) {
                        //     props.getFansListMore()
                        // }
                    }}
                    ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent :
                        <View style={{height: 10}}/>}
                />

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
    getSpaceData: (value) => {
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
