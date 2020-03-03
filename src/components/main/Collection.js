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
import Item from "../modules/Item"
import * as action from "../../action/index"




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
        this.props.getCollectionList()
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
        const {delCollection}=this.props
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

                                            <View style={{flexDirection: 'row'}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2
                                                }]}>{msgInfo.address_name ? msgInfo.address_name : ''}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, marginTop: -15}}>
                                        <Text
                                            style={[globalStyles.smallText]}>{msgInfo.created_at ? `${moment(msgInfo.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {
                                    this.props.navigation.navigate('Detail')
                                }}>
                                    {msgInfo.info ? (msgInfo.info.length > 40 ? msgInfo.info.substr(0, 40) + "..." : msgInfo.info) : ""}
                                    <Text style={globalStyles.previewText}>全文</Text>
                                </Text>
                                {msgInfo.carrier == 2 && <FlatList
                                    data={msgInfo.media}
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

                                {msgInfo.carrier == 3 && <ImageBackground source={require('../../images/tall.png')}
                                                                       style={[globalStyles.image, {backgroundColor: '#292929'}]}>
                                    <AntDesign name="play" size={50} style={{color: '#cecece'}}></AntDesign>
                                </ImageBackground>}
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
                                                Alert.alert("", "确定要取消收藏", [{text: "确定", onPress: () => {delCollection(item._id)}},{text: "取消"}])
                                            }}>
                                            <AntDesign name="star" size={18}
                                                       style={{color:'#ffa600'}}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>取消收藏</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.props.navigation.navigate('Comment')
                                            }}>
                                            <AntDesign name="message1" style={{color:'#838485'}} size={18}/>
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{msgInfo.comment_num ? msgInfo.comment_num : 0}</Text>
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
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{msgInfo.agree_num ? msgInfo.agree_num : 0}</Text>
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
        const {collectionReducer:{collectionList,isResultStatus}}=this.props

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
                            // if (isResultStatus == 0) {
                            //     props.getFansListMore()
                            // }
                        }}
                        ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent :
                            <View style={{height: 10}}/>}
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
    getCollectionList: () => {
        dispatch(action.CollectionAction.getCollectionList())
    },
    delCollection: (value) => {
        dispatch(action.CollectionAction.delCollection(value))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Collection)

