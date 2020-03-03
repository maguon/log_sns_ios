import React from 'react'
import {ScrollView, Text, View, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native'
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import moment from "moment"

const {width} = Dimensions.get('window')
export default class VoteItem extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {item, navigation} = this.props
        return (
                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>

                            <View style={{
                                flexDirection: 'row',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={globalStyles.xlText}>{item.title ? item.title : ""}</Text>
                                <View style={{position: 'absolute', right: 10, bottom: 15}}>
                                    <Text style={{
                                        color: '#414445',
                                        fontSize: 12
                                    }}>{item.status == 0 ? "未开启" : (item.status == 1 ? "进行中" : "已结束")}</Text>
                                </View>
                            </View>

                            <Text style={[globalStyles.midText, {margin: 15}]} onPress={() => {
                                this.props.navigation.navigate('Vote',{item:item})
                            }}>
                                {item.info ? (item.info.length > 60 ? item.info.substr(0, 60) + "..." : item.info) : ""}
                                {item.info.length > 60&&<Text style={globalStyles.previewText}>全文</Text>}
                            </Text>

                            <Text style={{backgroundColor: '#d7d7d7', width: width * 0.9, height: 0.2}}/>

                            <View style={{
                                flexDirection: 'row',
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[globalStyles.midText, {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 15
                                }]}>
                                    <Text>参与人数：</Text>
                                    <Text>{item.participants_num}</Text>
                                </Text>

                                <Text style={[globalStyles.midText, {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: 15,
                                    color: '#1598cc'
                                }]}
                                      onPress={() => {
                                          this.props.navigation.navigate('Vote',{item:item})
                                      }}>
                                    {item.user_votes==""? <Text>点击参与</Text>:<Text style={globalStyles.midText}>已参与</Text>}
                                </Text>

                            </View>
                        </Card>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
                </View>
        )
    }
}
