import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native'
import {connect} from "react-redux"
import {Button, WingBlank, WhiteSpace, Icon, List} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'


const Item = List.Item
const Message = props => {
    const {navigation} = props
    return (
        <View style={{flex: 1}}>
            <ScrollView style={globalStyles.container}>
                <List>
                    <Item arrow="horizontal"
                          onPress={() => {
                              navigation.navigate('FollowMe')
                          }}
                          // extra={<View style={styles.extra}><Text style={styles.extraText}>1</Text></View>}
                          thumb={<Image source={require('../../images/focus.png')}
                                        style={{width: 25, height: 25, marginRight: 10}}/>}>
                        <Text style={globalStyles.largeText}>关注我</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => {
                              navigation.navigate('EvaluationMe')
                          }}
                          // extra={<View style={styles.extra}><Text style={styles.extraText}>2</Text></View>}
                          thumb={<Image source={require('../../images/tall.png')}
                                        style={{width: 25, height: 25, marginRight: 10}}/>}>
                        <Text style={globalStyles.largeText}>评论我</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => {
                              navigation.navigate('PraiseMe')
                          }}
                          // extra={<View style={styles.extra}><Text style={styles.extraText}>3</Text></View>}
                          thumb={<Image source={require('../../images/praise.png')}
                                        style={{width: 25, height: 25, marginRight: 10}}/>}>
                        <Text style={globalStyles.largeText}>赞我</Text></Item>
                </List>
                <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                {/*<List>*/}
                {/*<Item arrow="horizontal"*/}
                {/*onPress={() => { navigation.navigate('Contact') }}*/}
                {/*extra={<View style={styles.extra}><Text style={styles.extraText}>4</Text></View>}*/}
                {/*thumb={<Image source={require('../../images/ipone.png')} style={{ width: 25, height: 25,marginRight:10 }}/>} >*/}
                {/*<Text style={globalStyles.largeText}>申请联系方式</Text></Item>*/}
                {/*</List>*/}
                {/*<WhiteSpace size='md' style={globalStyles.containerBackgroundColor} />*/}
                {/*<List>*/}
                    {/*<Item arrow="horizontal"*/}
                          {/*onPress={() => {*/}
                              {/*navigation.navigate('VoteRemind')*/}
                          {/*}}*/}
                          {/*extra={<View style={styles.extra}><Text style={styles.extraText}>5</Text></View>}*/}
                          {/*thumb={<Image source={require('../../images/vote.png')}*/}
                                        {/*style={{width: 25, height: 25, marginRight: 10}}/>}>*/}
                        {/*<Text style={globalStyles.largeText}>投票提醒</Text></Item>*/}
                {/*</List>*/}
                {/*<WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>*/}
                <List>
                    <Item arrow="horizontal"
                          onPress={() => {
                              navigation.navigate('SystemMsg')
                          }}
                          thumb={<View style={{flexDirection: "row", alignItems: "center"}}>
                              <View style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: 30,
                                  marginRight: 5,
                                  backgroundColor: "red"
                              }}></View>
                              <Image source={require('../../images/msg.png')}
                                     style={{width: 25, height: 25, marginRight: 10}}/>
                          </View>}>
                        <Text style={globalStyles.largeText}>系统消息</Text></Item>
                    <Item arrow="horizontal"
                          onPress={() => {
                              navigation.navigate('SystemMsg')
                          }}
                          thumb={
                              <View style={{flexDirection: "row", alignItems: "center"}}>
                                  <View style={{
                                      width: 5,
                                      height: 5,
                                      borderRadius: 30,
                                      marginRight: 5,
                                      backgroundColor: "red"
                                  }}></View>
                                  <Image source={require('../../images/comments.png')}
                                         style={{width: 25, height: 25, marginRight: 10}}/>
                              </View>}>
                        <Text style={globalStyles.largeText}>系统消息</Text></Item>
                </List>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Message)

const styles = StyleSheet.create({
    extra: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraText: {
        color: '#fff',
        fontSize: 14,
    },
})

