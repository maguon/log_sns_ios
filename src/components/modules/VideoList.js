import React from 'react';
import {ScrollView, ImageBackground, Text, Image, View, StyleSheet, Dimensions} from 'react-native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import httpRequest from '../../utils/HttpRequest'
import globalStyles from '../../utils/GlobalStyles'

const {width} = Dimensions.get('window')
let focuscolor = "#000"
const title = '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容'
export default class VideoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }

    }


    render() {
        return (
            <ScrollView>
                <View>
                    <ImageBackground source={require('../../images/tall.png')}
                                     style={styles.image}>
                        <View style={{position: 'absolute', right: 10, top: 10}}>
                            <Text style={[styles.focus, {backgroundColor: this.state.focus ? "#000" : "#8a8a8a"}]}
                                  onPress={() => {
                                      this.setState({focus: !this.state.focus})
                                  }}>{this.state.focus ? "关注" : "取消关注"}</Text>
                        </View>
                        <AntDesign name="play" size={50} style={{color: '#cecece'}}></AntDesign>
                        <Text style={styles.text}>
                            {title ? (title.length > 30 ? title.substr(0, 30) + "..." : title) : ""}
                            <Text style={styles.previewText}>全文</Text>
                        </Text>
                    </ImageBackground>

                    <View style={{width: width, height: 60, flexDirection: 'row'}}>
                        <View style={{width: width * 0.4, marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}>

                            <Image source={{uri: "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"}}
                                   style={{width: 40, height: 40, borderRadius: 30}}/>

                            <View style={{marginLeft: 5}}>
                                <Text style={globalStyles.largeText}>昵称昵称</Text>
                                <Text style={[globalStyles.smallText, {marginTop: 2}]}>2019-6-25 11:30</Text>
                            </View>
                        </View>
                        <View style={{
                            width: width * 0.6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 5,
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                onPress={() => {
                                    console.log('0')
                                }}>
                                <AntDesign name="sharealt" size={18}/>
                                <Text>1435</Text>
                            </Text>


                            <Text
                                style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                onPress={() => {
                                    console.log('0')
                                }}>
                                <AntDesign name="message1" size={18}/>
                                <Text>3425</Text>
                            </Text>

                            <Text style={[globalStyles.midText, {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 10
                            }]} onPress={() => {
                                console.log('0')
                            }}>
                                <AntDesign name="like2" size={18}/>
                                <Text>1250</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    focus: {
        overflow: 'hidden',
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        borderRadius: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 0
    },

    image: {
        flex: 1,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292929'
    },
    text: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 15,
        marginRight: 15,
        position: 'absolute',
        bottom: 10
    },
    previewText: {
        fontSize: 14,
        color: '#1598cc'
    },
})
