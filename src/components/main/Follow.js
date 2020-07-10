import React from 'react'
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native'
import {connect} from "react-redux"
import {Button, WingBlank, WhiteSpace, List, ListView, Provider} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action/index"
import index from "../../reducer";


const {width} = Dimensions.get('window')

class Follow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }

    componentDidMount() {
        this.props.getFollowList()
        this.props.getTitle()

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
    removeFollow = (param) => {
        Alert.alert("", `确定要取消关注吗？`, [{text: "取消", onPress: () => console.log('Cancel Pressed')},{
            text: "确定", onPress: () => {
                this.props.removeFollow(param)
            }
        }])

    }
    follow = (param) => {
        this.props.follow(param)
    }
    renderItem = (props) => {
        const {item, index} = props
        const detailItem = item.follow_user_detail_info[0]
        const loginItem = item.follow_user_login_info[0]
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={style.content} onPress={() => this.props.navigation.navigate("Space",{userId:item._user_by_id})}>
                    {detailItem.avatar ? <Image source={{uri: detailItem.avatar}} style={style.image}/> :
                        <Image source={require('../../images/head.png')}
                               style={style.image}/>}
                    <View>
                        <Text
                            style={globalStyles.largeText}>{detailItem.nick_name ? `${detailItem.nick_name}` : `${loginItem.phone}`}</Text>
                        <Text
                            style={[globalStyles.smallText, {marginTop: 2}]}>{detailItem.intro ? `${detailItem.intro}` : "无签名"}</Text>
                    </View>

                    {item.follow_status == 1 ? <Text style={[style.focus, {backgroundColor: "#fff", color: "#000"}]}
                                                     onPress={() => {
                                                         this.removeFollow({
                                                             followUserId: item._user_by_id,
                                                             index: index
                                                         })
                                                     }}>取消关注</Text> :
                        <Text style={[style.focus, {backgroundColor: "#000", color: "#fff"}]}
                              onPress={() => this.follow({followUserId: item._user_by_id, index: index})}>关注</Text>}

                </TouchableOpacity>

                <Text style={{backgroundColor: '#d7d7d7', width: width * 0.82, height: 0.2, marginLeft: width * 0.18}}/>
            </View>
        );
    };

    render() {
        const {followReducer: {followList, isResultStatus,isComplete},getFollowList} = this.props
        console.log(this.props)

        return (
            <Provider>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    keyExtractor={(item, index) => `${index}`}
                    data={followList}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (!isComplete) {
                            getFollowList()
                        }
                    }}
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                    ListEmptyComponent={this.renderEmpty}
                />
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        followReducer: state.FollowReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    getTitle: () => {
        dispatch(action.FollowAction.getTitle(ownProps))
    },
    getFollowList: () => {
        dispatch(action.FollowAction.getFollowList())
    },

    follow: (param) => {
        dispatch(action.FollowAction.follow(param))
    },
    removeFollow: (param) => {
        dispatch(action.FollowAction.removeFollow(param))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Follow)


const style = StyleSheet.create({
    content: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    focus: {
        // overflow: 'hidden',
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        // backgroundColor: '#ffd000',
        borderWidth: 0.5,
        borderColor: '#000',
        color: '#000',
        fontSize: 12,
        position: 'absolute',
        right: 10
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 30,
    },
})




