import React from 'react';
import {FlatList, ScrollView, TouchableOpacity, Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import httpRequest from '../../utils/HttpRequest'
import globalStyles from '../../utils/GlobalStyles'

const {width} = Dimensions.get('window');
let cellWH = (width - 2 * 20 - 15) / 3.3;
let numColumns=3;
const title = '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容'
export default class ImageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            focus: false
        }
    }


    componentDidMount() {
        this.fetchData()
    }

    renderItem({item, index}) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.item}>
                    <Image source={{uri: item.image}}
                           style={{width:cellWH, height: cellWH, borderRadius: 5}}/>
                </View>
            </TouchableOpacity>
        )
    }

    fetchData() {
        httpRequest.get('https://api.douban.com/v2/music/search?q=李志').then((response) => {
            this.setState({
                data: response['musics']
            })
        }, (error) => {

        })

    }

    render() {
        console.log("this.state.data", this.state.data)
        // this.state.data.length=15
        if (this.state.data.length < 2) {
            cellWH=(width - 2 * 20 - 15) / 1.1
        } else if (this.state.data.length < 5) {
            cellWH=(width - 2 * 20 - 15) / 2.1
            numColumns=2
        } else if (this.state.data.length >=5){
            cellWH=(width - 2 * 20 - 15) / 3.3
        }
        return (
            <ScrollView>
                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Header
                                title={
                                    <View style={{width: 280, marginLeft: 5}}>
                                        <Text style={globalStyles.largeText}>昵称昵称</Text>
                                        <Text style={[globalStyles.smallText, {marginTop: 2}]}>2019-6-25 11:30</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>
                                            <Text style={[globalStyles.smallText, {
                                                marginTop: 2,
                                                marginLeft: 2
                                            }]}>大连开发区凯伦国际</Text>
                                        </View>

                                    </View>
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
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]}>
                                    {title ? (title.length > 60 ? title.substr(0, 60) + "..." : title) : ""}
                                    <Text style={styles.previewText}>全文</Text>
                                </Text>
                                <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                    numColumns={numColumns}
                                    keyExtractor={(item, index) => `${index}`}
                                    contentContainerStyle={styles.list_container}
                                />
                            </Card.Body>


                            <Card.Footer
                                content={
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                                        <Text
                                            style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}
                                            onPress={() => {
                                                console.log('0')
                                            }}>
                                            <AntDesign name="like2" size={18}/>
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

    list_container: {
        marginTop: 10,
        marginLeft: -5,
        // 主轴方向
        flexDirection: 'column',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        // flexWrap: 'wrap',
        // 侧轴方向
        // alignContent: 'space-between', // 必须设置,否则换行不起作用
        paddingHorizontal: 20,
    },
    item: {
        marginTop: 5,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 200,
        width: null,
        flex: 1,
    },
    previewText: {
        fontSize: 14,
        color: '#1598cc'
    },
})
