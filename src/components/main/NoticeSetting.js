import React from 'react'
import {View, Text} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import {List, WhiteSpace,Checkbox,Switch} from "@ant-design/react-native";

const Item = List.Item
class NoticeSetting extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            checked: true,
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: true,
            checked5: false,
            checked6: true,

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
    onSwitchChange5 = value => {
        this.setState({
            checked5: value,
        })
    }
    onSwitchChange6 = value => {
        this.setState({
            checked6: value,
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
                        <Text style={globalStyles.largeText}>消息</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked1}
                            onChange={this.onSwitchChange1}
                        />}

                    >
                        <Text style={globalStyles.largeText}>赞</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked2}
                            onChange={this.onSwitchChange2}
                        />} >
                        <Text style={globalStyles.largeText}>评论</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked3}
                            onChange={this.onSwitchChange3}
                        />} >
                        <Text style={globalStyles.largeText}>被关注</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked4}
                            onChange={this.onSwitchChange4}
                        />} >
                        <Text style={globalStyles.largeText}>@</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked5}
                            onChange={this.onSwitchChange5}
                        />} >
                        <Text style={globalStyles.largeText}>关注人发布作品</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={this.state.checked6}
                            onChange={this.onSwitchChange6}
                        />} >
                        <Text style={globalStyles.largeText}>推荐作品</Text></Item>

                </List>
            </View>
        )
    }

}

export default NoticeSetting

