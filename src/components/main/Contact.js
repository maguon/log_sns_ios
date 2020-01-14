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
import {Button,Provider} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action/index"


const {width} = Dimensions.get('window')

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }

    componentDidMount() {
        this.props.getContactList()
    }


    renderEmpty = () => {
        return (
            <View style={style.listEmptyContainer}>
                <Text style={[globalStyles.largeText, style.listEmptyText]}>暂无消息</Text>
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
        Alert.alert("", `确定要取消关注吗？`, [{
            text: "确定", onPress: () => {
                this.props.removeFans(param)
            }
        }, {text: "取消", onPress: () => console.log('Cancel Pressed')}])

    }
    fans = (param) => {
        this.props.fans(param)
    }
    renderItem = (props) => {
        const {item, index} = props
        const detailItem = item.attention_user_detail_info[0]
        const loginItem = item.attention_user_login_info[0]
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={style.content} onPress={() => this.props.navigation.navigate("Space")}>
                    <View style={{width: 8, height: 8, borderRadius: 30, marginRight: 5, backgroundColor: "red"}}></View>
                    {detailItem.avatar ? <Image source={{uri: detailItem.avatar}} style={{width: 50, height: 50}}/> :
                        <Image source={require('../../images/head.png')}
                               style={style.image}/>}
                    <View style={{width: width * 0.4}}>
                        <Text
                            style={globalStyles.largeText}>昵称昵称</Text>
                        <Text
                            style={[globalStyles.smallText, {marginTop: 2}]}>2018-02-15 11:30</Text>
                        <Text
                            style={[globalStyles.smallText, {marginTop: 2}]}>消息内容</Text>

                    </View>
                    <View style={{flexDirection: "row", width: width * 0.3, justifyContent: "space-between"}}>
                        <Button size="small" style={[style.focus, {backgroundColor: "#d7d7d7"}]}> 拒绝</Button>
                        <Button type="primary" size="small"
                                style={[style.focus, {backgroundColor: "#0099db"}]}> 同意</Button>
                    </View>

                </TouchableOpacity>

                <Text style={{backgroundColor: '#d7d7d7', width: width * 0.82, height: 0.2, marginLeft: width * 0.18}}/>
            </View>
        );
    };

    render() {
        const {contactReducer: {contactList, isResultStatus}} = this.props
        console.log(contactList)

        return (
            <Provider>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    keyExtractor={(item, index) => `${index}`}
                    data={contactList}
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
        contactReducer: state.ContactReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    getContactList: () => {
        dispatch(action.ContactAction.getContactList())
    }

})

export default connect(mapStateToProps, mapDispatchProps)(Contact)


const style = StyleSheet.create({
    content: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    focus: {
        width: 50,
        height: 20,
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


