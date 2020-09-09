import React from 'react'
import {View, Text, ScrollView, StyleSheet,Alert} from 'react-native'
import globalStyles from "../../utils/GlobalStyles"
import {List, WhiteSpace, Provider, Modal, ActivityIndicator} from "@ant-design/react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {CacheHelper, AnimatedCacheImage} from 'react-native-rn-cacheimage';
// import ImageCropPicker from "react-native-image-crop-picker";
// import * as actionType from "../../actionType/index";
import * as action from "../../action/index";
import {connect} from 'react-redux'
const Item = List.Item

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            size:"0kb",
            waiting:false
        }
    }

    componentDidMount() {
        this.props.getSize()
        // const {navigation: {state: {params: {size}}},} = this.props
        // this.setState({
        //     size: size
        // })
    }


    render() {
        const {navigation,SettingsReducer:{size},getSize} = this.props
        return (
            <Provider style={{flex: 1}}>
                <ScrollView style={globalStyles.container}>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('ChangePassWord')
                              }}
                              thumb={<Icon name="lock-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>修改密码</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('ChangePhone')
                              }}
                              thumb={<Icon name="screen-rotation" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>换绑手机</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('PrivacySetting')
                              }}
                              thumb={<Icon name="account-question-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>隐私设置</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('NoticeSetting')
                              }}
                              thumb={<Icon name="bell-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>通知设置</Text></Item>
                    </List>

                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('AboutUs')
                              }}
                              thumb={<Icon name="account-group-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>关于我们</Text></Item>
                        <Item
                            extra={<Text style={globalStyles.midText}>{size}</Text>}
                            onPress={() => {

                                Alert.alert("", "确定要清理缓存吗", [{text: "取消"}, {
                                    text: "确定", onPress: () => {
                                        this.setState({
                                            waiting:true
                                        })
                                        CacheHelper.clearCache().then((err)=>{
                                            getSize()
                                            this._timer=setInterval(()=>{
                                                this.setState({
                                                    waiting:false
                                                })
                                                this._timer&&clearInterval(this._timer);

                                            },1000);
                                        })
                                    }
                                }])
                            }}
                            thumb={<Icon name="cached" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>清理缓存</Text></Item>
                    </List>
                </ScrollView>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.waiting}
                    style={style.modalContainer}>
                    <View style={style.modalItem}>
                        <ActivityIndicator
                            animating={true}
                            style={style.modalActivityIndicator}
                            size="large"
                        />
                        <Text style={style.modalText}>正在清除缓存...</Text>
                    </View>

                </Modal>
            </Provider>
        )
    }

}

const style = StyleSheet.create({
    icon: {
        marginRight: 15,
        color: '#838485',
    },
    modalContainer: {
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})
const mapStateToProps = (state) => {
    return {
        SettingsReducer: state.SettingsReducer
    }
}

const mapDispatchProps = (dispatch) => ({
    getSize: () => {
        dispatch(action.SettingsAction.getSize())
    },


})

export default connect(mapStateToProps, mapDispatchProps)(Setting)


