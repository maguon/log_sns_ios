import React from 'react'
import {View, Text, ScrollView,StyleSheet} from 'react-native'
import globalStyles from "../../utils/GlobalStyles"
import { List, WhiteSpace} from "@ant-design/react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Item = List.Item
class Setting extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { navigation } =this.props
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={globalStyles.container}>
                    <List >
                        <Item arrow="horizontal"
                              onPress={() => { navigation.navigate('ChangePassWord') }}
                              thumb={<Icon name="lock-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>修改密码</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => { navigation.navigate('ChangePhone') }}
                              thumb={<Icon name="screen-rotation" size={25} style={style.icon}/>} >
                            <Text style={globalStyles.largeText}>换绑手机</Text></Item>
                    </List>
                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => { navigation.navigate('PrivacySetting') }}
                              thumb={<Icon name="account-question-outline" size={25} style={style.icon}/>} >
                            <Text style={globalStyles.largeText}>隐私设置</Text></Item>
                        <Item arrow="horizontal"
                              onPress={() => { navigation.navigate('NoticeSetting') }}
                              thumb={<Icon name="bell-outline" size={25} style={style.icon}/>} >
                            <Text style={globalStyles.largeText}>通知设置</Text></Item>
                    </List>

                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                    <List>
                        <Item arrow="horizontal"
                              onPress={() => { navigation.navigate('AboutUs') }}
                              thumb={<Icon name="account-group-outline" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>关于我们</Text></Item>
                        <Item
                            extra={<Text style={globalStyles.midText}>323M</Text>}
                              onPress={() => { navigation.navigate('ClearCache') }}
                              thumb={<Icon name="cached" size={25} style={style.icon}/>}>
                            <Text style={globalStyles.largeText}>清理缓存</Text></Item>
                    </List>
                </ScrollView >
            </View>
        )
    }

}

const style = StyleSheet.create({
    icon: {
        marginRight: 15,
        color:'#838485',
    }
})


export default Setting
