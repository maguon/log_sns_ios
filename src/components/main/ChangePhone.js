import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, InputItem, List, Provider, WhiteSpace, WingBlank} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../utils/GlobalStyles";

class ChangePhone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: "",
            code: "",
            PW: "",
            newPW: "",
        }
    }

    render() {
        return (
            <Provider>
                <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                    <Text style={[globalStyles.midText, {
                        marginLeft: 10,
                        height: 40,
                        lineHeight: 40
                    }]}>当前绑定手机为：13932958920</Text>

                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            placeholder="请输入确认密码"
                            onChange={this.state.newPW}
                            type="text"
                        >
                            <Text style={globalStyles.largeText}>新手机号</Text>
                        </InputItem>
                    </View>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            extra={ // 时间倒计时
                                <Button type="primary" disabled={this.state.disabled}
                                        style={{width: 120, height: 35}}
                                >
                                    <Text
                                        style={{fontSize: 14}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "发送验证码"}</Text>
                                </Button>}
                            onChange={this.state.phone}
                            placeholder="请输入手机号">
                            <Text style={globalStyles.largeText}>验证码</Text>
                        </InputItem>
                    </View>


                    <WhiteSpace size='xl'/>
                    <WingBlank size='lg'>
                        <Button type="primary">确认</Button>
                    </WingBlank>
                </View>
            </Provider>
        )
    }

}


export default ChangePhone


