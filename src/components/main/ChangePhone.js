import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import {Button, InputItem, List, Provider, WhiteSpace, WingBlank} from "@ant-design/react-native"
import globalStyles from "../../utils/GlobalStyles"
import * as actionType from "../../actionType"
import * as action from "../../action"

class ChangePhone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            timerCount: 60,
        }
    }

    componentDidMount() {
        this.props.getChangePassWord()
        this.props.setNewPhone('')
        this.props.setSendCode('')
    }

    render() {
        const {changePassWordReducer: {phone}, setNewPhone, setSendCode, onChangePhone} = this.props
        const onCode = () => {
            this.props.onSendCode();
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
                            placeholder="请输入新手机号"
                            onChange={setNewPhone}
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
                                        onPress={onCode}
                                >
                                    <Text
                                        style={{fontSize: 14}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "发送验证码"}</Text>
                                </Button>}
                            onChange={setSendCode}
                            placeholder="请输入验证码">
                            <Text style={globalStyles.largeText}>验证码</Text>
                        </InputItem>
                    </View>


                    <WhiteSpace size='xl'/>
                    <WingBlank size='lg'>
                        <Button type="primary" onPress={onChangePhone}>确认</Button>
                    </WingBlank>
                </View>
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        changePhoneReducer: state.ChangePhoneReducer,
        changePassWordReducer: state.ChangePassWordReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    setNewPhone: (value) => {
        dispatch(actionType.ChangePhoneType.set_NewPhone(value))
    },
    setSendCode: (value) => {
        dispatch(actionType.ChangePhoneType.set_SendCode(value))
    },
    getChangePassWord: () => {
        dispatch(action.ChangePassWordAction.getChangePassWord())
    },
    onChangePhone: () => {
        dispatch(action.ChangePhoneAction.onChangePhone())
    },
    onSendCode: () => {
        dispatch(action.ChangePhoneAction.onSendCode())
    },

})

export default connect(mapStateToProps, mapDispatchProps)(ChangePhone)



