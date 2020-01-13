import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import * as action from "../../action/index";
import globalStyles,{styleColor} from "../../utils/GlobalStyles"
import AntDesign from "react-native-vector-icons/AntDesign"
import {Card} from "@ant-design/react-native/lib/card"

const {width}=Dimensions.get("window")
class Space extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            focus: false
        }
    }
    componentDidMount() {
        // this.props.getAboutUsInfo()
    }
    render() {

        return (
            <View style={{width:width,backgroundColor:styleColor}}>
                <View style={{height:75,flexDirection:"row" ,alignItems:"flex-end", marginLeft:10}}>
                <AntDesign name="left" size={20} style={{color: '#fff'}} onPress={() => this.props.navigation.goBack()}/>
                </View>

                <View style={{flexDirection:"row" ,alignItems:"center",marginTop:10}}>
                <View style={{ marginLeft: 10, marginRight:10, marginBottom:25}}>
                    <Image source={require('../../images/head.png')} style={{width: 60, height: 60,borderRadius: 30}}/>
                </View>

                <View style={{width:width*0.5}}>
                    <Text style={[globalStyles.largeText,{color:'#fff'}]}>昵称昵称</Text>
                    <Text style={[globalStyles.smallText, {marginTop: 5,color:'#fff'}]}>关注 420 | 粉丝 160万</Text>
                    <View style={{flexDirection: 'row',marginTop: 5}}>
                        <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                        <Text style={[globalStyles.smallText, {marginTop: 2,color:'#fff', marginLeft: 2}]}>大连开发区凯伦国际</Text>
                    </View>
                    <Text style={[globalStyles.smallText,{marginTop: 5, marginBottom:15,color:'#fff'}]}>签名签名签名签名签名签名</Text>
                </View>
                    <View style={{position: 'absolute', right: 10,top:10}}>
                        <Text
                            style={[styles.focus, {backgroundColor: this.state.focus ? "#8a8a8a" : "#ffd000"}]}
                            onPress={() => {
                                this.setState({focus: !this.state.focus})
                            }}>{this.state.focus ? "关注" : "取消关注"}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 10,bottom:20}}>
                        <Text
                            style={[styles.seePhone, {backgroundColor: this.state.focus ? "#8a8a8a" : "#ffd000"}]}
                            onPress={() => {
                                this.setState({focus: !this.state.focus})
                            }}>{this.state.focus ? "申请中" : "申请查看电话"}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // aboutUsReducer:state.AboutUsReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    // getAboutUsInfo: () => {
    //     dispatch(action.AboutUsAction.getAboutUsInfo())
    // },
})
export default connect(mapStateToProps, mapDispatchProps)(Space)


const styles = StyleSheet.create({
    focus: {
        overflow: 'hidden',
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        backgroundColor: '#ffd000',
        borderRadius: 10,
        fontSize: 10,

    },
    seePhone: {
        overflow: 'hidden',
        width: 80,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        backgroundColor: '#ffd000',
        borderRadius: 10,
        fontSize: 10,
    },
})
