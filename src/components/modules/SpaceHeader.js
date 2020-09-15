import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
} from 'react-native'
import * as action from "../../action/index";
import globalStyles, {styleColor} from "../../utils/GlobalStyles"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Provider} from "@ant-design/react-native"
import * as actionType from "../../actionType";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window')
class SpaceHeader extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {params: {userId}} = this.props.navigation.state
        this.props.getSpaceUser(userId)
        this.props.followStatus(userId)
    }


    render() {
        const {spaceReducer: {spaceUser, spaceHidden} ,navigation: {state: {params: {userId}}},follow,cancelFollow} = this.props

        return (
            <Provider>
                <SafeAreaView style={{flex: 1}}>
                    <View style={{width: width, backgroundColor: styleColor}}>
                        <View style={{height: 50, flexDirection: "row", alignItems: "flex-end", marginLeft: 10}}>
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
                                    关注 {spaceUser.follow_num ? spaceUser.follow_num : 0}|
                                    粉丝 {spaceUser.attention_num ? spaceUser.attention_num :0}</Text>
                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                    <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                    <Text style={[globalStyles.smallText, {
                                        marginTop: 2,
                                        color: '#fff',
                                        marginLeft: 2
                                    }]}>{spaceUser.city_name ? spaceUser.city_name : "暂无地址"}</Text>
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
                                          follow(userId)
                                      }}>关注</Text> : <Text style={[style.focus,{backgroundColor: "#8a8a8a"}]}
                                                           onPress={()=>{
                                                               Alert.alert("", `确定要取消关注吗？`, [ {text: "取消", onPress: () => console.log('Cancel Pressed')},{
                                                                   text: "确定", onPress: () => {
                                                                       cancelFollow(userId)
                                                                   }
                                                               }])
                                                           }}>取消关注</Text>}


                        </View>
                    </View>


                </SafeAreaView>

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
export default connect(mapStateToProps, mapDispatchProps)(SpaceHeader)


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
