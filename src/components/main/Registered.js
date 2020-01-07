import React, {Component} from 'react'
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native'
import {InputItem, Button, Provider, Toast} from '@ant-design/react-native';
import globalStyles from '../../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as action from '../../action/index'
import * as actionType from '../../actionType/index'


const {width, height} = Dimensions.get('window')

class Registered extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount:60,
            disabled: false,
            hidden: false,
            hiddenA: false
        }
    }

    componentDidMount() {
        this.props.setAccount('');
        this.props.setPassword('');
        this.props.setPass_word('');
    }


    render() {
        const {registerReducer:{account},register, setAccount,setCode,setPassword, setPass_word} = this.props;
        //时间倒计时
        const onCode=()=>{
            if(account==''){
                Toast.info( "请您输入注册手机号")
            } else if(account.length!=11){
                Toast.info( "手机号不足11位，请重新输入")
            }else {
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
        }

        return (
            <Provider>
            <View style={styles.container}>
                <Text style={[globalStyles.xxxlText, styles.title]}>欢迎加入司机部落</Text>
                <View style={styles.lineTopBottom}>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            type='number'
                            extra={
                                <Button type="primary" disabled={this.state.disabled} style={{width: 120, height: 35, marginRight: -10}}
                                onPress={onCode}>
                                    <Text style={{fontSize: 14}}>{this.state.disabled?`重新获取(${this.state.timerCount})`:"获取验证码"}</Text>
                                </Button>}
                            style={styles.textInput}
                            onChange={setAccount}
                            placeholder="输入注册手机号"
                        />
                    </View>
                    {/*输入验证码*/}
                    <View style={styles.input}>
                        <InputItem
                            clear
                            style={styles.textInput}
                            onChange={setCode}
                            placeholder="输入验证码"
                        />

                    </View>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            extra={<FontAwesome name={this.state.hidden ? "eye" : "eye-slash"} size={20}
                                                onPress={() => {
                                                    this.setState({hidden: !this.state.hidden})
                                                }}/>}
                            style={styles.textInput}
                            type={this.state.hidden ? "text" : "password"}
                            onChange={setPassword}
                            placeholder="输入密码"
                        />

                    </View>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            extra={<FontAwesome name={this.state.hiddenA ? "eye" : "eye-slash"} size={20}
                                                onPress={() => {
                                                    this.setState({hiddenA: !this.state.hiddenA})
                                                }}/>}
                            style={styles.textInput}
                            type={this.state.hiddenA ? "text" : "password"}
                            onChange={setPass_word}
                            placeholder="输入确认密码"
                        />

                    </View>
                </View>
                <Button type="primary" style={styles.button} onPress={register}>注册</Button>
            </View>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerReducer: state.RegisterReducer,

    }

}

const mapDispatchProps = (dispatch, props) => ({
    register: () => {
        dispatch(action.RegisterAction.register(props))
    },
    getCode: () => {
        dispatch(action.RegisterAction.getCode(props))
    },
    setAccount: (value) => {
        dispatch(actionType.RegisterActionType.SET_ACCOUNT(value))
    },
    setCode: (value) => {
        dispatch(actionType.RegisterActionType.SET_CODE(value))
    },
    setPassword: (value) => {
        dispatch(actionType.RegisterActionType.SET_PASSWORD(value))
    },
    setPass_word: (value) => {
        dispatch(actionType.RegisterActionType.SET_PASSWORD_TO(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Registered)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        position: 'absolute',
        top: height / 10,

    },
    input: {
        backgroundColor: '#fff',
        width: width * 0.8,
    },
    textInput: {
        height: 40,
    },
    lineTopBottom: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.8,
        height: 200,
    },
    button: {
        justifyContent: 'center',
        marginTop: 40,
        width: width * 0.8,
        height: 40,
        backgroundColor: "#0099db",
    },
    footer: {
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }

})
