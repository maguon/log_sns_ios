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
import {Provider, Tabs, WhiteSpace, WingBlank, Card} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import * as action from "../../action/index"
import globalStyles from "../../utils/GlobalStyles"
import Video from "react-native-video";
import {fileHost, videoHost} from "../../config/HostConfig";
import {CachedImage} from "react-native-img-cache"
import * as actionType from "../../actionType";


const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            praise: false,
            star: false,
            tabIndex:0,

        }
    }

    componentDidMount() {
        this.props.getArtInfo()


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

    renderItem = (props) => {
        const {item,index} = props
        const {setArtPraise} = this.props
        const  media= item.media
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

                                            <View style={{flexDirection: 'row', width: width * 0.65}}>
                                                {item.address_name!=""&&<AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>}
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2
                                                }]}>{item.address_name ? item.address_name : ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                }

                                extra={
                                    <View style={{position: 'absolute', right: 0, marginTop: -20}}>
                                        <Text
                                            style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD hh:mm')}` : ''}</Text>
                                        {/*<Text style={[globalStyles.smallText]}>阅读数:{item.read_num}</Text>*/}
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {
                                    this.props.navigation.navigate('Detail',{item:item,itemList:""})
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
                                                    <CachedImage source={{uri: `${fileHost}/image/${item.url}`}}
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
                                                this.props.navigation.navigate('Detail',{item:item,itemList:""})
                                            }}>
                                            <AntDesign name="message1" style={{color: '#838485'}} size={18}/>
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                const params={
                                                    item:item,tabIndex:this.state.tabIndex
                                                }
                                                setArtPraise(params)
                                            }}>
                                            {item.user_praises==""?<AntDesign name="like2" size={18} style={{color: '#838485'}}/>:
                                                <AntDesign name="like1" size={18} style={{color:'#ffa600'}}/>}
                                            <Text
                                                style={[globalStyles.midText, {marginLeft: 5}]}>{item.agree_num ? item.agree_num : 0}</Text>
                                        </TouchableOpacity>

                                        <Text style={[globalStyles.midText, {fontSize: 14}]}
                                              onPress={() => {
                                                  const params={item:item,tabIndex:this.state.tabIndex}
                                                  Alert.alert("", "确认删除", [{
                                                      text: "取消",
                                                      onPress: () => console.log("canncel")
                                                  },{
                                                      text: "确定",
                                                      onPress:()=>{this.props.itemDelete(params)}
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
        const {
            articleReducer: {
                artInfo, isComplete, isResultStatus, artLoading, artArticle, artComplete, artResultStatus,
                artImage, imgComplete, imgResultStatus, artVideo, vidComplete, vidResultStatus, artHelp, helpComplete, helpResultStatus
            }, getArtInfo, getArtArticle, getArtImage, getArtHelp, getArtVideo,update} = this.props

        return (
            <Provider>
                <Tabs tabs={tabs}
                      onChange={(tab, index) => {
                          this.setState({tabIndex: index})
                          this.props.artLoad()
                          if(index==0){
                              this.props.getArtInfo()
                          }else if(index==1){
                              this.props.getArtArticle()
                          }else if(index==2){
                              this.props.getArtImage()
                          }else if(index==3){
                              this.props.getArtVideo()
                          }else if(index==4){
                              this.props.getArtHelp()
                          }
                      }}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize: 14}}
                >
                    <View style={{flex: 1}}>
                        {artLoading && <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artInfo}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={false}
                            onRefresh={() => {
                                update(0)
                            }}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!isComplete) {
                                    getArtInfo()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                        />}
                        {!artLoading && this.renderLoadingView()}
                    </View>
                    <View style={{flex: 1}}>
                        {artLoading &&<FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artArticle}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={false}
                            onRefresh={() => {
                                update(1)
                            }}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!artComplete) {
                                    getArtArticle()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(artResultStatus)}
                        />}

                        {!artLoading && this.renderLoadingView()}
                    </View>
                    <View style={{flex: 1}}>
                        {artLoading && <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artImage}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={false}
                            onRefresh={() => {
                                update(2)
                            }}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!imgComplete) {
                                    getArtImage()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(imgResultStatus)}
                        />}
                        {!artLoading && this.renderLoadingView()}
                    </View>
                    <View style={{flex: 1}}>
                        {artLoading &&<FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artVideo}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={false}
                            onRefresh={() => {
                                update(3)
                            }}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!vidComplete) {
                                    getArtVideo()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(vidResultStatus)}
                        />}
                        {!artLoading && this.renderLoadingView()}
                    </View>
                    <View style={{flex: 1}}>
                        {artLoading &&<FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artHelp}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={false}
                            onRefresh={() => {
                                update(4)
                            }}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!helpComplete) {
                                    getArtHelp()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(helpResultStatus)}
                        />}
                        {!artLoading && this.renderLoadingView()}
                    </View>
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
    artLoad: () => {
        dispatch({type: actionType.ArticleType.set_ArtLoading, payload: {artLoading: false}})
    },
    update: () => {
        dispatch(action.ArticleAction.update())
    },
    getArtInfo: () => {
        dispatch(action.ArticleAction.getArtInfo())
    },
    getArtArticle: () => {
        dispatch(action.ArticleAction.getArtArticle())
    },
    getArtImage: () => {
        dispatch(action.ArticleAction.getArtImage())
    },
    getArtHelp: () => {
        dispatch(action.ArticleAction.getArtHelp())
    },
    getArtVideo: () => {
        dispatch(action.ArticleAction.getArtVideo())
    },
    itemDelete: (value ) => {
        dispatch(action.ArticleAction.itemDelete(value))
    },
    setArtPraise: (value ) => {
        dispatch(action.ArticleAction.setArtPraise(value))
    },

})

export default connect(mapStateToProps, mapDispatchProps)(Article)




