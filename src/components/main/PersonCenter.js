import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Button, WingBlank, WhiteSpace, List} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import AntDesign from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"
import * as action from "../../action/index"

const Item = List.Item

class PersonCenter extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const {navigation, personCenterReducer: {userInfo: {nick_name, intro, avatar}}} = this.props
        return (
            <View style={{flex: 1}}>
                <ScrollView style={globalStyles.container}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}
                                      onPress={() => {
                                          navigation.navigate('UserData')
                                      }}>
                        <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
                            <View style={{margin: 16}}>
                                <View style={{width: 60, height: 60, borderRadius: 30}}>
                                    {avatar ? <Image source={{uri: avatar}}/> :
                                        <Image source={require('../../images/head.png')}/>}
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', marginRight: 16}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 20}}>{nick_name ? nick_name : "暂无昵称"}</Text>
                                    {/*<Text style={{fontSize: 14}}>会员</Text>*/}
                                </View>
                                <Text
                                    style={{color: '#777', fontSize: 14, marginTop: 5}}>{intro ? intro : "暂无签名"}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Article')
                              }}
                              thumb={<AntDesign name="filetext1" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我的文章</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Follow',{otherParam: ''})
                              }}
                              thumb={<AntDesign name="hearto" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我的关注</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Fans',{otherParam: ''})
                              }}
                              thumb={<AntDesign name="team" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我的粉丝</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Collection')
                              }}
                              thumb={<AntDesign name="staro" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我的收藏</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Evaluation')
                              }}
                              thumb={<AntDesign name="edit" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我的评价</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('ToVote')
                              }}
                              thumb={<AntDesign name="like2" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我参与的投票</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('LocationCollection')
                              }}
                              thumb={<AntDesign name="enviromento" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>我收藏的位置</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => {
                                  navigation.navigate('Settings')
                              }}
                              thumb={<AntDesign name="setting" size={20} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>设置</Text></Item>
                    </List>
                    <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor}/>
                    <WingBlank size="lg">
                        <Button type="primary" onPress={() => {
                        }}>退出当前账号</Button>
                    </WingBlank>
                    <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor}/>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        personCenterReducer: state.PersonCenterReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getUserInfo: () => {
        dispatch(action.PersonCenterAction.getUserInfo(props))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(PersonCenter)


const style = StyleSheet.create({
    icon: {
        marginRight: 15,
        color: '#838485'
    },
})
