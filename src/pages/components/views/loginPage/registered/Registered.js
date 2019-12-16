import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {InputItem, Button} from '@ant-design/react-native';
import globalStyles from '../../../../../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const {width, height} = Dimensions.get('window')
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            account: "",
            password: "",
            name: 'eye-slash',
            type: 'password',
            confirmName: 'eye-slash',
            confirmType: 'password',
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={[globalStyles.xxxlText, styles.title]}>欢迎加入司机部落</Text>
                <View style={styles.lineTopBottom}>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            type='number'
                            style={styles.textInput}
                            value={this.state.account}
                            onChange={value => {
                                this.setState({
                                    account: value,
                                });
                            }}
                            placeholder="输入注册手机号"
                        />
                    </View>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            extra={<FontAwesome name={this.state.name} size={20} onPress={() => {
                                if (this.state.name == 'eye-slash') {
                                    this.setState({
                                        name: 'eye',
                                        type: 'text'
                                    })
                                } else {
                                    this.setState({
                                        name: 'eye-slash',
                                        type: 'password'
                                    })
                                }

                            }}/>}
                            style={styles.textInput}
                            type={this.state.type}
                            // value={this.state.password}
                            onChange={value => {
                                this.setState({
                                    password: value,
                                });
                            }}
                            placeholder="输入密码"
                        />

                    </View>
                    <View style={styles.input}>
                        <InputItem
                            clear
                            extra={<FontAwesome name={this.state.confirmName} size={20} onPress={() => {
                                if (this.state.confirmName == 'eye-slash') {
                                    this.setState({
                                        confirmName: 'eye',
                                        confirmType: 'text'
                                    })
                                } else {
                                    this.setState({
                                        confirmName: 'eye-slash',
                                        confirmType: 'password'
                                    })
                                }

                            }}/>}
                            style={styles.textInput}
                            type={this.state.confirmType}
                            // value={this.state.password}
                            onChange={value => {
                                this.setState({
                                    password: value,
                                });
                            }}
                            placeholder="输入确认密码"
                        />

                    </View>
                </View>
                <Button type="primary" style={styles.button} >注册</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        position: 'absolute',
        top: height / 6,

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
        height: 180,
    },
    button: {
        justifyContent: 'center',
        marginTop: 50,
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
