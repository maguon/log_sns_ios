import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, TouchableOpacity,Text, StyleSheet, Dimensions,ScrollView} from 'react-native'
import {InputItem, Button, Provider, Checkbox} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actionType from '../../actionType/index'
import * as action from '../../action/index'


const {width, height} = Dimensions.get('window')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false,
        }
    }


    render() {
        const {setUser, setPassWord, toLogin} = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[globalStyles.xxxlText]}>欢迎登录司机部落</Text>
                    <View style={styles.lineTopBottom}>
                        <View style={styles.input}>
                            <InputItem
                                clear
                                type='number'
                                style={styles.textInput}
                                onChange={setUser}
                                placeholder="输入注册手机号"
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
                                onChange={setPassWord}
                                placeholder="输入密码"
                            />

                        </View>
                    </View>

                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center', marginTop:10}}
                            onPress={()=>{this.props.navigation.navigate('Agreement')}}
                        >
                            <Checkbox checked disabled />
                                <Text style={{color:'#1598cc'}}>《司聊服务使用协议》</Text>

                        </TouchableOpacity>


                    <Button type="primary" style={styles.button} onPress={toLogin}>登录</Button>

                    <View style={styles.footer}>
                        <TouchableOpacity style={globalStyles.fourText}
                              onPress={() => this.props.navigation.navigate('Registered')}>
                            <Text>注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.fourText}
                              onPress={() => this.props.navigation.navigate('ForgotPassWord')}>
                            <Text>忘记密码</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.LoginReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    toLogin: () => {
        dispatch(action.LoginAction.toLogin(props))
    },
    setUser: (value) => {
        dispatch(actionType.LoginActionType.set_User(value))
    },
    setPassWord: (value) => {
        dispatch(actionType.LoginActionType.pass_Word(value))
    }

})

export default connect(mapStateToProps, mapDispatchProps)(Login)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },

    input: {
        backgroundColor: '#fff',
        width: width * 0.8,
    },
    textInput: {
        height: 40,
    },
    lineTopBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        height: 100,
        marginTop:80
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
