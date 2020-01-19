import React from 'react'
import {Alert, ScrollView, StyleSheet, Text} from 'react-native'
import {connect} from "react-redux"
import {Provider, Button, WingBlank, WhiteSpace, List, InputItem, Toast} from '@ant-design/react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import * as action from "../../action"
import * as actionType from "../../actionType"


class ForgotPassWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: 60,
            disabled: false,
            hidden: false,
            hiddenA: false,
        }

    }

    componentDidMount() {
        this.props.setAccount('')
        this.props.setPassword('')
        this.props.setPass_word('')
    }

    render() {
        const {registerReducer: {account}, register, setAccount, setCode, setPassword, setPass_word} = this.props;
        const onCode = () => {
            if (account == '') {
                Toast.info("请您输入手机号")
            } else if (account.length != 11) {
                Toast.info("手机号不足11位，请重新输入")
            } else {
                this.props.forgotGetCode()
                const timer = setInterval(() => {
                    const leftTime = this.state.timerCount - 1
                    if (leftTime < 0) {
                        this.setState({
                            timerCount: leftTime,
                            disabled: false,
                        })
                        clearInterval(timer)
                    } else {
                        this.setState({
                            timerCount: leftTime,
                            disabled: true,
                        })
                    }
                }, 1000)
            }
        }
        return (
            <ScrollView
                style={{flex: 1, backgroundColor: '#f5f5f9'}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Provider>
                    <List>
                        <InputItem
                            clear
                            extra={ // 时间倒计时
                                <Button type="primary" disabled={this.state.disabled}
                                        style={{width: 120, height: 35, marginRight: 10}}
                                        onPress={onCode}>
                                    <Text
                                        style={{fontSize: 14}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "获取验证码"}</Text>
                                </Button>}
                            styles={{
                                container: styles.container
                            }}
                            onChange={setAccount}
                            placeholder="请输入手机号"/>
                        <InputItem
                            clear
                            onChange={setCode}
                            placeholder="请输入验证码"/>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            extra={<FontAwesome name={this.state.hidden ? "eye" : "eye-slash"} size={20}
                                                onPress={() => {
                                                    this.setState({hidden: !this.state.hidden})
                                                }}/>}
                            type={this.state.hidden ? "text" : "password"}
                            onChange={setPassword}
                        />
                        <InputItem
                            clear
                            placeholder="请输入确认密码"
                            extra={<FontAwesome name={this.state.hiddenA ? "eye" : "eye-slash"} size={20}
                                                onPress={() => {
                                                    this.setState({hiddenA: !this.state.hiddenA})
                                                }}
                            />}
                            onChange={setPass_word}
                            type={this.state.hiddenA ? "text" : "password"}
                        />
                    </List>
                    <WhiteSpace size='xl'/>
                    <WingBlank size='lg'>
                        <Button type="primary" onPress={register}>确认</Button>
                    </WingBlank>
                </Provider>
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        registerReducer: state.RegisterReducer,

    }

}

const mapDispatchProps = (dispatch, props) => ({
    register: () => {
        dispatch(action.RegisterAction.register(props))
    },
    forgotGetCode: () => {
        dispatch(action.RegisterAction.forgotGetCode(props))
    },
    setAccount: (value) => {
        dispatch(actionType.RegisterActionType.set_Account(value))
    },
    setCode: (value) => {
        dispatch(actionType.RegisterActionType.set_Code(value))
    },
    setPassword: (value) => {
        dispatch(actionType.RegisterActionType.set_Password(value))
    },
    setPass_word: (value) => {
        dispatch(actionType.RegisterActionType.set_Password_TO(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(ForgotPassWord)


const styles = StyleSheet.create({
    container: {
        paddingRight: 0
    },
    input: {
        flex: 1,
        backgroundColor: 'red'
    },
})
