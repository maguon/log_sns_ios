import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions,TouchableOpacity, Alert,ScrollView} from 'react-native'
import {Checkbox,InputItem, Button, Provider, Toast, Modal,WhiteSpace} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as action from '../../action/index'
import * as actionType from '../../actionType/index'



const {width, height} = Dimensions.get('window')

class Registered extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBox: false,
            timerCount: 60,
            disabled: false,
            hidden: false,
            hiddenA: false,
            waiting:true
        }
    }

    componentDidMount() {
        this.props.setAccount('')
        this.props.setPassword('')
        this.props.setPass_word('')
    }


    render() {
        const {registerReducer: {account,checked},register, setAccount, setCode, setPassword, setPass_word,setChecked} = this.props;
        //时间倒计时
        const onCode = () => {
            if (account == '') {
                Toast.info("请您输入注册手机号")
            } else if (account.length != 11) {
                Toast.info("手机号不足11位，请重新输入")
            } else {
                this.props.getCode()
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
            <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[globalStyles.xxxlText,styles.title]}>欢迎加入司机部落</Text>
                    <View style={styles.lineTopBottom}>
                        <View style={styles.input}>
                            <InputItem
                                clear
                                type='number'
                                extra={
                                    <Button type="primary" disabled={this.state.disabled}
                                            style={{width: 100, height: 35, marginRight: -10}}
                                            onPress={onCode}>
                                        <Text
                                            style={{fontSize: 12}}>{this.state.disabled ? `重新获取(${this.state.timerCount})` : "获取验证码"}</Text>
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



                    <WhiteSpace />
                    <Checkbox
                        checked={checked}
                        style={{marginTop:10}}
                        onChange={setChecked}
                    >
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('Agreement')}}
                        >
                            <Text style={{marginLeft:5,marginTop:10}}>
                                同意
                                <Text style={{color:'#1598cc'}}>《司聊服务使用协议》</Text>
                            </Text>
                        </TouchableOpacity></Checkbox>
                    <Button type="primary" style={styles.button} onPress={register}>注册</Button>
                    <WhiteSpace />
                    {/*<Button type="primary" style={styles.button} onPress={this.register()}>注册</Button>*/}
                </View>
            </ScrollView>
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
    },
    setChecked: (value) => {
        dispatch(actionType.RegisterActionType.set_Checked(value))
    }

})

export default connect(mapStateToProps, mapDispatchProps)(Registered)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:height,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        marginTop:50

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
        marginTop:50
    },
    button: {
        justifyContent: 'center',
        marginTop: 20,
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
