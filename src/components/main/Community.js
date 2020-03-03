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
    Dimensions
} from 'react-native'
import {Provider, Tabs, WhiteSpace, WingBlank, Card, Modal, Button} from '@ant-design/react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import {connect} from "react-redux"
import globalStyles from '../../utils/GlobalStyles'
import VoteItem from '../modules/VoteItem'
import Item from '../modules/Item'
import * as action from "../../action/index"



const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3
class Community extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            praise: false,
            star: false,
            visible:false,
        }
    }


    componentDidMount() {
        this.props.getComInfo()
        this.props.getComVideo()
        this.props.getComHelp()
        this.props.getComVoteList()

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


    ListFooterComponent = (param) => {
        if(param==1) {
            return (
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

    onClose = () => {
        this.setState({
            visible: false,
        });
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
                                        <TouchableOpacity style={{width: 280, marginLeft: 5}} onPress={() => {
                                            this.props.navigation.navigate('Space', {userId: item._user_id})
                                        }}>
                                            <Text
                                                style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                                            <View style={{flexDirection: 'row'}}>
                                                <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                                <Text style={[globalStyles.smallText, {
                                                    marginTop: 2,
                                                    marginLeft: 2, marginRight:15
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
                                                    visible: true
                                                })
                                            }}>
                                            <AntDesign name={this.state.star ? "star" : "staro"} size={18}
                                                       style={{color: this.state.star ? '#ffa600' : '#838485'}}/>
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
                                            <Text style={[globalStyles.midText,{marginLeft:5}]}>{item.agree_num ? item.agree_num : 0}</Text>
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
        const {communityReducer: {comInfo,isComplete,isResultStatus, comLoading, comVideo, vidComplete, vidResultStatus,
            comHelp, helpComplete, helpResultStatus, comVoteList, voteComplete, voteResultStatus},
            getComInfo,getComVideo,getComHelp,getComVoteList} = this.props

        return (
            <Provider>
                <Tabs tabs={tabs}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize: 14}}
                >
                    <View style={style.content}>
                        {comLoading&&
                            <FlatList
                                data={comInfo}
                                renderItem={this.renderItem}
                                ListEmptyComponent={this.renderEmpty}
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

                        <View>
                            <FlatList
                                data={comVideo}
                                renderItem={this.renderItem}
                                ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!vidComplete) {
                                       getComVideo()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(vidResultStatus)}
                            />
                        </View>


                        <View>
                            <FlatList
                                data={comHelp}
                                renderItem={this.renderItem}
                                ListEmptyComponent={this.renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (!helpComplete) {
                                       getComHelp()
                                    }
                                }}
                                ListFooterComponent={this.ListFooterComponent(helpResultStatus)}
                            />
                        </View>


                        <View style={style.content}>
                            <FlatList
                                data={comVoteList}
                                renderItem={this.renderItemTo}
                                ListEmptyComponent={this.renderEmpty}
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
                    visible={this.state.visible}
                    animationType="slide-up"
                    onClose={this.onClose}
                >
                    <Button>从相册中选择</Button>
                    <Button>拍照</Button>
                    <Button onPress={this.onClose}>取消</Button>
                </Modal>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        communityReducer: state.CommunityReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
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


})

export default connect(mapStateToProps, mapDispatchProps)(Community)


const style = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },


})
