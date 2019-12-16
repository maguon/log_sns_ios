import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Button, WingBlank, WhiteSpace, List, InputItem} from '@ant-design/react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";


class ForgotPassWord extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: 'eye-slash',
            type: 'password',
            confirmName: 'eye-slash',
            confirmType: 'password',
        }

    }


    render() {
        return (
            <ScrollView
                style={{flex: 1, backgroundColor: '#f5f5f9'}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List>
                    <InputItem
                        clear
                        extra={<Button type="primary" style={{width: 130}}>发送验证码</Button>}
                        styles={{
                            container: styles.container
                        }}
                        placeholder="请输入手机号"></InputItem>
                    <InputItem
                        placeholder="请输入验证码"></InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
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
                        type={this.state.type}
                    ></InputItem>
                    <InputItem
                        clear
                        placeholder="请输入确认密码"
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

                        }}
                        />}
                        type={this.state.confirmType}
                    ></InputItem>
                </List>
                <WhiteSpace size='xl'/>
                <WingBlank size='lg'>
                    <Button type="primary">确认</Button>
                </WingBlank>
            </ScrollView>

        )
    }
}

export default ForgotPassWord


const styles = StyleSheet.create({
    container: {
        paddingRight: 0
    },
    input: {
        flex: 1,
        backgroundColor: 'red'
    },
})
