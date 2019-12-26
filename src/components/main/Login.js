import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {InputItem, Button,Provider} from '@ant-design/react-native';
import globalStyles from '../../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actionType from '../../actionType/index'
import * as action from '../../action/index'


const {width, height} = Dimensions.get('window')
 class Login extends Component {
    constructor() {
        super()
        this.state = {
            hidden:false,
        }
    }


    render() {
        const {setUser,setPassWord,toLogin} =this.props
        return (
            <Provider>
            <View style={styles.container}>
                <Text style={[globalStyles.xxxlText, styles.title]}>欢迎登录司机部落</Text>
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
                            extra={<FontAwesome name={this.state.hidden ? "eye" : "eye-slash"} size={20} onPress={() => {
                                this.setState({hidden: !this.state.hidden})
                            }}/>}
                            style={styles.textInput}
                            type={this.state.hidden ? "text" : "password"}
                            onChange={setPassWord}
                            placeholder="输入密码"
                        />

                    </View>
                </View>
                <Button type="primary" style={styles.button} onPress={toLogin}>登录</Button>

                <View style={styles.footer}>
                    <Text style={globalStyles.fourText} onPress={()=> this.props.navigation.navigate('Registered')}>注册</Text>
                    <Text style={globalStyles.fourText} onPress={()=> this.props.navigation.navigate('ForgotPassWord')}>忘记密码</Text>
                </View>

            </View>
            </Provider>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        loginReducer:state.LoginReducer
    }
}

const mapDispatchProps=(dispatch,props)=>({
    toLogin:()=>{
        dispatch(action.LoginAction.toLogin(props))
    },
    setUser:(value)=>{
        dispatch(actionType.LoginActionType.setUser(value))
    },
    setPassWord:(value)=>{
        dispatch(actionType.LoginActionType.passWord(value))
    }

})

export default connect(mapStateToProps,mapDispatchProps)(Login)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        position: 'absolute',
        top: height / 4,

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
        width: width * 0.9,
        height: 100,
    },
    button: {
        justifyContent: 'center',
        marginTop: 30,
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
