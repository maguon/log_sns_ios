import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'


const title = '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容内容文章内容文章内容文章内容'
export default class Vote extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
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
                                    </View>
                                }
                                thumbStyle={{width: 40, height: 40, borderRadius: 30}}
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                extra={
                                    <View style={{position: 'absolute', right: 0, bottom: 0}}>
                                        <Text style={{color: '#414445', fontSize: 12}}>进行中</Text>
                                    </View>
                                }
                            />
                            <Card.Body>
                                <Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]}>
                                    {title ? (title.length > 60 ? title.substr(0, 60) + "..." : title) : ""}
                                    <Text style={{fontSize: 14, color: '#1598cc'}}>全文</Text>
                                </Text>
                            </Card.Body>


                            <Card.Footer
                                content={
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={[globalStyles.midText, {
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }]}>
                                            <Text>参与人数：</Text>
                                            <Text>1435</Text>
                                        </Text>


                                        <Text style={[globalStyles.midText, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            color: '#1598cc'
                                        }]}>
                                            <Text>点击参与</Text>
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


