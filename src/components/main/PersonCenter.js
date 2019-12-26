import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import { Button, WingBlank, WhiteSpace, Icon, List} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'

const Item = List.Item

const PersonCenter = props => {
    const { navigation } = props
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={globalStyles.container}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}
                                  onPress={() => { navigation.navigate('PersonInfo') }} >
                    <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
                        <View style={{ margin: 16 }}>
                            <View style={{width: 60, height: 60, borderRadius: 30 }} >
                            <Image source={require('../../images/head.png')}/>
                        </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', marginRight: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20 }}>昵称</Text>
                                <Text style={{ fontSize: 14 }}>会员</Text>
                            </View>
                            <Text style={{ color: '#777',fontSize: 14 }}>签名签名签名</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                <List>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Article') }}
                          onLongPress={() => { navigation.navigate('Article') }}
                          thumb={<Icon name="file-text" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我的文章(128)</Text></Item>
                </List>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                <List>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Follow') }}
                          onLongPress={() => { navigation.navigate('Follow') }}
                          thumb={<Icon name="heart" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我的关注(128)</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Fans') }}
                          onLongPress={() => { navigation.navigate('Fans') }}
                          thumb={<Icon name="smile" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我的粉丝(128)</Text></Item>
                </List>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                <List>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Collection') }}
                          onLongPress={() => { navigation.navigate('Collection') }}
                          thumb={<Icon name="star" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我的收藏(128)</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Evaluation') }}
                          onLongPress={() => { navigation.navigate('Evaluation') }}
                          thumb={<Icon name="edit" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我的评价</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Vote') }}
                          onLongPress={() => { navigation.navigate('Vote') }}
                          thumb={<Icon name="tag" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我参与的投票</Text></Item>
                </List>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                <List>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('LocationCollection') }}
                          onLongPress={() => { navigation.navigate('LocationCollection') }}
                          thumb={<Icon name="environment" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>我收藏的位置</Text></Item>
                </List>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />
                <List>
                    <Item arrow="horizontal"
                          onPress={() => { navigation.navigate('Settings') }}
                          onLongPress={() => { navigation.navigate('Settings') }}
                          thumb={<Icon name="setting" style={{ marginRight: 15 }} />} >
                        <Text style={globalStyles.largeText}>设置</Text></Item>
                </List>
                <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor} />
                <WingBlank size="lg">
                    <Button type="primary" onPress={() => { }}>退出当前账号</Button>
                </WingBlank>
                <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor} />
            </ScrollView >
        </View>
    )
}

export default PersonCenter
