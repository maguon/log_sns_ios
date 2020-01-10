import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import {Button, InputItem, Provider, Toast, WhiteSpace, WingBlank} from "@ant-design/react-native";
import globalStyles from "../../utils/GlobalStyles"
import * as action from "../../action/index"
import * as actionType from '../../actionType/index'

class ChangePassWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            timerCount: 60,
        }
    }

    componentDidMount() {
        this.props.getChangePassWord();
        this.props.setChangeCode('');
        this.props.setChangePassword('');
        this.props.setChangeNewPassword('');

    }

    render() {
        const {changePassWordReducer: {phone}, onChangePassWord, setChangeCode, setChangePassword, setChangeNewPassword} = this.props
        const onCode = () => {
            this.props.getCode();
            const timer = setInterval(() => {
                const leftTime = this.state.timerCount - 1
                if (leftTime < 0) {
                    this.setState({
                        timerCount: leftTime,
                        disabled: false,
                    })
                    clearInterval(timer);
                } else {
                    this.setState({
                        timerCount: leftTime,
                        disabled: true,
                    })
                }
            }, 1000)

        }


        return (
            <Provider>
                <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                    <Text style={[globalStyles.midText, {
                        marginLeft: 10,
                        height: 40,
                        lineHeight: 40
                    }]}>当前绑定手机为：{phone ? phone : ""}</Text>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            extra={ // 时间倒计时
                                <Button type="primary" disabled={this.state.disabled}
                                        style={{width: 120, height: 35}} onPress={onCode}
                                >
                                    <Text
                                        style={{fontSize: 14}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "获取验证码"}</Text>
                                </Button>}
                            onChange={setChangeCode}
                            placeholder="请输入验证码">
                            <Text style={globalStyles.largeText}>验证码</Text>
                        </InputItem>
                    </View>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            type="password"
                            onChange={setChangePassword}
                        >
                            <Text style={globalStyles.largeText}>新密码</Text>
                        </InputItem>
                    </View>
                    <View style={{backgroundColor: '#fff'}}>
                        <InputItem
                            clear
                            placeholder="请输入确认密码"
                            onChange={setChangeNewPassword}
                            type="password"
                        >
                            <Text style={globalStyles.largeText}>确认密码</Text>
                        </InputItem>
                    </View>
                    <WhiteSpace size='xl'/>
                    <WingBlank size='lg'>
                        <Button type="primary" onPress={onChangePassWord}>确认</Button>
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
    setChangeCode: (value) => {
        dispatch(actionType.ChangePassWordType.set_Change_Code(value))
    },
    setChangePassword: (value) => {
        dispatch(actionType.ChangePassWordType.set_Change_Password(value))
    },
    setChangeNewPassword: (value) => {
        dispatch(actionType.ChangePassWordType.set_Change_NewPassword(value))
    },

    getChangePassWord: () => {
        dispatch(action.ChangePassWordAction.getChangePassWord())
    },
    getCode: () => {
        dispatch(action.ChangePassWordAction.getCode())
    },
    onChangePassWord: () => {
        dispatch(action.ChangePassWordAction.onChangePassWord(props))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(ChangePassWord)


