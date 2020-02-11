import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    ActivityIndicator, Dimensions, Image, TouchableOpacity, ImageBackground, Alert
} from 'react-native'
import {connect} from "react-redux"
import {Provider, Tabs, WhiteSpace, WingBlank,Card} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import Item from '../modules/Item'
import * as action from "../../action/index"
import globalStyles from "../../utils/GlobalStyles"




const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            praise: false,
            star: false
        }
    }

    componentDidMount() {
        this.props.getArtInfo()
        this.props.getArtArticle()
        this.props.getArtImage()
        this.props.getArtVideo()
        this.props.getArtAddress()
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
                                        <View style={{width: 280, marginLeft: 5}}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <View style={{flexDirection: 'row'}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2
                                                }]}>{item.address_name ? item.address_name : ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, marginTop: -15}}>
                                        <Text
                                            style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                                        <Text style={[globalStyles.smallText]}>阅读数:{item.read_num}</Text>
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
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{item.agree_num ? item.agree_num : 0}</Text>
                                        </TouchableOpacity>

                                        <Text style={[globalStyles.midText, {fontSize: 14}]}
                                                                onPress={() => {
                                                                    Alert.alert("", "确认删除", [{
                                                                        text: "确定",
                                                                        onPress:itemDelete
                                                                    }, {text: "取消",
                                                                        onPress: () => console.log("canncel")
                                                                    }])
                                                                }}>删除</Text>
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
        const tabs = [{title: '所有'}, {title: '文章'}, {title: '图片'}, {title: '视频'}, {title: '求助'}]
        const {articleReducer: {artInfo, artArticle, artImage, artVideo, artAddress, isResultStatus}} = this.props

        return (
            <Provider>
                <Tabs tabs={tabs}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize: 14}}
                >
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artInfo}
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
                    <ScrollView>

                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artArticle}
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
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artImage}
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
                    <ScrollView>
                        <View>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={artVideo}
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
                    </ScrollView>
                    <ScrollView>
                        <View>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={artAddress}
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
                    </ScrollView>
                </Tabs>
            </Provider>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        articleReducer: state.ArticleReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getArtInfo: () => {
        dispatch(action.ArticleAction.getArtInfo())
    },
    getArtArticle: () => {
        dispatch(action.ArticleAction.getArtArticle())
    },
    getArtImage: () => {
        dispatch(action.ArticleAction.getArtImage())
    },
    getArtVideo: () => {
        dispatch(action.ArticleAction.getArtVideo())
    },
    getArtAddress: () => {
        dispatch(action.ArticleAction.getArtAddress())
    },

})

export default connect(mapStateToProps, mapDispatchProps)(Article)




