import React from 'react';
import {ScrollView, ImageBackground, Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {Card, Toast, WhiteSpace, WingBlank} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import httpRequest from '../../utils/HttpRequest'
import globalStyles from '../../utils/GlobalStyles'


const title = '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容'
export default class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false,
            praise: false,
            star: false
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Header
                                title={
                                    <TouchableOpacity style={{width: 280, marginLeft: 5}} onPress={() => {
                                        this.props.navigation.navigate('Space')
                                    }}>
                                        <Text style={globalStyles.largeText}>昵称昵称</Text>
                                        <Text style={[globalStyles.smallText, {marginTop: 2}]}>2019-6-25 11:30</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                            <Text style={[globalStyles.smallText, {
                                                marginTop: 2,
                                                marginLeft: 2
                                            }]}>大连开发区凯伦国际</Text>
                                        </View>

                                    </TouchableOpacity>
                                }
                                thumbStyle={{width: 40, height: 40, borderRadius: 30}}
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                extra={
                                    <View style={{position: 'absolute', right: 0, bottom: 0}}>
                                        <Text
                                            style={[styles.focus, {backgroundColor: this.state.focus ? "#000" : "#8a8a8a"}]}
                                            onPress={() => {
                                                this.setState({focus: !this.state.focus})
                                            }}>{this.state.focus ? "关注" : "取消关注"}</Text>
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {
                                    this.props.navigation.navigate('Detail')
                                }}>
                                    {title ? (title.length > 60 ? title.substr(0, 60) + "..." : title) : ""}
                                    <Text style={styles.previewText}>全文</Text>
                                </Text>

                                <ImageBackground source={require('../../images/u422.png')}
                                                 style={styles.image}></ImageBackground>

                            </Card.Body>


                            <Card.Footer
                                content={
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.setState({
                                                    star: !this.state.star
                                                })
                                                if (this.state.star) {
                                                    Toast.success('取消收藏', 1, () => {
                                                        console.log('111')
                                                    })
                                                } else {
                                                    Toast.success('收藏成功', 1, () => {
                                                        console.log('000')
                                                    })
                                                }

                                            }}>
                                            <AntDesign name={this.state.star ? "star" : "staro"} size={18}
                                                       style={{color: this.state.star ? '#ffa600' : '#838485'}}/>
                                            <Text>1435</Text>
                                        </Text>


                                        <Text
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                this.props.navigation.navigate('Comment')
                                            }}>
                                            <AntDesign name="message1" size={18}/>
                                            <Text>3425</Text>
                                        </Text>

                                        <Text style={[globalStyles.midText, {
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }]} onPress={() => {
                                            this.setState({
                                                praise: !this.state.praise
                                            })
                                        }}>
                                            <AntDesign name={this.state.praise ? "like1" : "like2"} size={18}
                                                       style={{color: this.state.praise ? '#ffa600' : '#838485'}}/>
                                            <Text>1250</Text>
                                        </Text>
                                    </View>

                                }

                            />
                        </Card>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
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
        backgroundColor: '#000',
        borderRadius: 10,
        color: '#fff',
        fontSize: 12,
        marginRight: 0
    },
    image: {
        flex: 1,
        height: 150,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    previewText: {
        fontSize: 14,
        color: '#1598cc'
    },
})