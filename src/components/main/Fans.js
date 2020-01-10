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
import * as action from "../../action/index";
import index from "../../reducer";


const {width} = Dimensions.get('window')

class Fans extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }

    componentDidMount() {
        this.props.getFansList()
        this.props.getTitle()
    }


    renderEmpty = () => {
        return (
            <View style={style.listEmptyContainer}>
                <Text style={[globalStyles.largeText, style.listEmptyText]}>暂无粉丝</Text>
            </View>
        )
    }

    ListFooterComponent = () => {
        return (
            <View style={style.footerContainer}>
                <ActivityIndicator color={globalStyles.styleColor} styleAttr='Small'/>
                <Text style={[globalStyles.smallText, style.footerText]}>正在加载...</Text>
            </View>
        )
    }
    removeFans = (param) => {
        Alert.alert("", `确定要取消关注吗？`, [{text: "确定", onPress: () => {this.props.removeFans(param)}},{text: "取消",onPress: () => console.log('Cancel Pressed')}])

    }
    fans = (param) => {
        this.props.fans(param)
    }
    renderItem = (props) => {
        const {item,index} = props
        const detailItem = item.attention_user_detail_info[0]
        const loginItem = item.attention_user_login_info[0]
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={style.content} onPress={() => this.props.navigation.navigate("Space")}>
                    {detailItem.avatar ? <Image source={{uri: detailItem.avatar}} style={{width: 50, height: 50}}/> :
                        <Image source={require('../../images/head.png')}
                               style={style.image}/>}
                    <View>
                        <Text
                            style={globalStyles.largeText}>{detailItem.nick_name ? `${detailItem.nick_name}` : `${loginItem.phone}`}</Text>
                        <Text
                            style={[globalStyles.smallText, {marginTop: 2}]}>{detailItem.intro ? `${detailItem.intro}` : "无签名"}</Text>
                    </View>

                    {item.fans_status == 1? <Text style={[style.focus, {backgroundColor: "#fff"}]}
                                                    onPress={() => {this.removeFans({fansUserId: item._user_id,index:index})}}>取消关注</Text> :
                        <Text style={[style.focus, {backgroundColor: "#fece09"}]}
                              onPress={() => this.fans({fansUserId: item._user_id,index:index})}>关注</Text>}

                </TouchableOpacity>

                <Text style={{backgroundColor: '#d7d7d7', width: width * 0.82, height: 0.2, marginLeft: width * 0.18}}/>
            </View>
        );
    };

    render() {
        const {fansReducer: {fansList, isResultStatus}} = this.props
        console.log(fansList)

        return (
            <Provider>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    keyExtractor={(item, index) => `${index}`}
                    data={fansList}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (isResultStatus == 0) {
                            props.getFansListMore()
                        }
                    }}
                    ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent : <View style={{height: 10}}/>}

                />
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        fansReducer: state.FansReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    getTitle:()=>{
        dispatch(action.FansAction.getTitle(ownProps))
    },
    getFansList: () => {
        dispatch(action.FansAction.getFansList())
    },
    getFansListMore: (value) => {
        dispatch(action.FansAction.getFansListMore(value))
    },
    fans: (param) => {
        dispatch(action.FansAction.fans(param))
    },
    removeFans: (param) => {
        dispatch(action.FansAction.removeFans(param))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Fans)


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
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})




