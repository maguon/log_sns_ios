import React from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground, Alert
} from 'react-native'
import {connect} from "react-redux"
import {Provider, WhiteSpace, WingBlank,Card} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import globalStyles from "../../utils/GlobalStyles"
import * as action from "../../action/index"
import Video from "react-native-video";
import {fileHost, videoHost} from "../../config/HostConfig";
import {CachedImage} from "react-native-img-cache"



const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            praise: false,
            star: false,
        }
    }

    componentDidMount() {
        this.props.getCollection()
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }


    ListFooterComponent = (param) => {
        if(param==1) {
            return(
                <View style={{height: 10}}/>
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

    renderItem = (props) => {
        const {item,index} = props
        const {delCollection,setColPraise}=this.props
        const userInfo = item.msg_user_detail_info[0]
        const msgInfo=item.msg_info[0]

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
                                            this.props.navigation.navigate('Space', {userId: msgInfo._user_id})
                                        }}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <View style={{flexDirection: 'row',width: width * 0.65}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2,
                                                }]}>{msgInfo.address_name ? msgInfo.address_name : ''}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, marginTop: -20}}>
                                        <Text
                                            style={[globalStyles.smallText]}>{msgInfo.created_at ? `${moment(msgInfo.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {
                                    this.props.navigation.navigate('CollectionDetail',{item:item,itemList:item})
                                }}>
                                    {msgInfo.info ? (msgInfo.info.length > 40 ? msgInfo.info.substr(0, 40) + "..." : msgInfo.info) : ""}
                                    {msgInfo.info.length > 40 ?<Text style={globalStyles.previewText}>全文</Text>:""}
                                </Text>
                                {msgInfo.carrier == 2 && <FlatList
                                    data={msgInfo.media}
                                    numColumns={3}
                                    keyExtractor={(item, index) => `${index}`}
                                    renderItem={(params) => {
                                        const {item,index} = params
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                                                this.props.navigation.navigate("ImageView",{media:msgInfo.media,index:index})
                                            }}>

                                                <View style={globalStyles.item}>
                                                    <CachedImage source={{uri: `${fileHost}/image/${item.url}`}}

                                                           style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    }
                                    contentContainerStyle={globalStyles.list_container}
                                />}

                                {msgInfo.carrier == 3 &&

                                <Video source={{uri:`${videoHost}${msgInfo.media[0].url}`}}
                                       paused={true}
                                       repeat={true}
                                       controls={true}
                                       resizeMode="cover"
                                       style={globalStyles.image}/>
                                }
                                {msgInfo.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}
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
                                                Alert.alert("", "确定要取消收藏", [{text: "取消"},{text: "确定", onPress: () => {delCollection(item)}}])
                                            }}>
                                            <AntDesign name="star" size={18}
                                                       style={{color:'#ffa600'}}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>取消收藏</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.props.navigation.navigate('Detail',{item:item,itemList:""})
                                            }}>
                                            <AntDesign name="message1" style={{color:'#838485'}} size={18}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{msgInfo.comment_num ? msgInfo.comment_num : 0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                setColPraise(item)
                                            }}>
                                            {msgInfo.user_praises==""?<AntDesign name="like2" size={18} style={{color: '#838485'}}/>:
                                                <AntDesign name="like1" size={18} style={{color:'#ffa600'}}/>}
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{msgInfo.agree_num ? msgInfo.agree_num : 0}</Text>
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
        const {collectionReducer:{collectionList,colResultStatus,colComplete},getCollectionList}=this.props
        return (
            <Provider>
                <ScrollView>
                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={collectionList}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.renderEmpty}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (!colComplete) {
                                getCollectionList()
                            }
                        }}
                        ListFooterComponent={this.ListFooterComponent(colResultStatus)}
                    />
                </ScrollView>
            </Provider>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        collectionReducer: state.CollectionReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getCollection: () => {
        dispatch(action.CollectionAction.getCollection())
    },

    getCollectionList: () => {
        dispatch(action.CollectionAction.getCollectionList())
    },

    setColPraise: (value) => {
        dispatch(action.CollectionAction.setColPraise(value))
    },
    delCollection: (value) => {
        dispatch(action.CollectionAction.delCollection(value))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Collection)

