import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import {Button, InputItem, Provider, WhiteSpace, WingBlank} from "@ant-design/react-native";
import globalStyles from "../../utils/GlobalStyles"
import * as action from "../../action/index"

class ChangePassWord extends React.Component {
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
                            extra={ // 时间倒计时
                                <Button type="primary" disabled={this.state.disabled}
                                        style={{width: 120, height: 35}}
                                >
                                    <Text style={{fontSize: 14}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "获取验证码"}</Text>
                                </Button>}
                            onChange={this.state.phone}
                            placeholder="请输入手机号">
                            <Text style={globalStyles.largeText}>验证码</Text>
                        </InputItem>
                    </View>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            type="password"
                            onChange={this.state.PW}
                        >
                            <Text style={globalStyles.largeText}>新密码</Text>
                        </InputItem>
                    </View>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            placeholder="请输入确认密码"
                            onChange={this.state.newPW}
                            type="password"
                        >
                            <Text style={globalStyles.largeText}>确认密码</Text>
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
const mapStateToProps = (state) => {
    return {
        changePassWordReducer: state.ChangePassWordReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    // getUserData: () => {
    //     dispatch(action.UserDataAction.getUserData(props))
    // },
})

export default connect(mapStateToProps, mapDispatchProps)(ChangePassWord)


