import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions, Image, FlatList, ScrollView, ActivityIndicator, Alert} from 'react-native'
import * as action from "../../action/index";
import globalStyles, {styleColor} from "../../utils/GlobalStyles"
import AntDesign from "react-native-vector-icons/AntDesign"
import {Button} from "@ant-design/react-native"
import Item from "../modules/Item";

const {width} = Dimensions.get("window")

class Space extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            focus: false
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
        return (
            <View style={{flex: 1}}>
                <Item item={item} name='Art' navigation={this.props.navigation}/>
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

    render() {
        const {spaceReducer: {spaceData, spaceUser, spaceHidden, isResultStatus}, cancelFollow, follow, navigation: {state: {params: {userId}}}} = this.props
console.log(spaceHidden)
        return (
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
