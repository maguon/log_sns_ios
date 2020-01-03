import React from 'react'
import {View, Text} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import {List, WhiteSpace,Checkbox,Switch} from "@ant-design/react-native";

const Item = List.Item
class PrivacySetting extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            checked: false,
            checked1: true,
            checked2: false,
            checked3: true,
            checked4: false,

        }
    }
    onSwitchChange = value => {
        this.setState({
            checked: value,
        })
    }
    onSwitchChange1 = value => {
        this.setState({
            checked1: value,
        })
    }
    onSwitchChange2 = value => {
        this.setState({
            checked2: value,
        })
    }
    onSwitchChange3 = value => {
        this.setState({
            checked3: value,
        })
    }
    onSwitchChange4 = value => {
        this.setState({
            checked4: value,
        })
    }

    render(){
        return (
            <View style={{ flex: 1 }}>

                    <List >
                        <Item
                              extra={<Switch
                                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                                  color="#333333"
                                  checked={this.state.checked}
                                  onChange={this.onSwitchChange}
                              />} >
                            <Text style={globalStyles.largeText}>显示姓氏</Text></Item>

                        <Item
                              extra={<Switch
                                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                                  color="#333333"
                                  checked={this.state.checked1}
                                  onChange={this.onSwitchChange1}
                              />}

                        >
                            <Text style={globalStyles.largeText}>显示电话</Text></Item>
                        <Item
                              extra={<Switch
                                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                                  color="#333333"
                                  checked={this.state.checked2}
                                  onChange={this.onSwitchChange2}
                              />} >
                            <Text style={globalStyles.largeText}>显示城市</Text></Item>

                        <Item
                              extra={<Switch
                                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                                  color="#333333"
                                  checked={this.state.checked3}
                                  onChange={this.onSwitchChange3}
                              />} >
                            <Text style={globalStyles.largeText}>显示车辆资料</Text></Item>

                        <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                        <Item
                              extra={<Switch
                                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                                  color="#333333"
                                  checked={this.state.checked4}
                                  onChange={this.onSwitchChange4}
                              />} >
                            <Text style={globalStyles.largeText}>允许将我推荐给好友</Text></Item>
                        <Item arrow="horizontal"
                              extra={<Text style={globalStyles.largeText}>所有人</Text>} >
                            <Text style={globalStyles.largeText}>谁可以发消息给我</Text></Item>
                    </List>
            </View>
        )
    }

}

export default PrivacySetting

