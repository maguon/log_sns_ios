import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Provider, Tabs} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import ImageList from '../modules/ImageList'
import Address from '../modules/Address'
import VoteItem from '../modules/VoteItem'

class Community extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tabs = [
            {title: '最近发布'},
            {title: '视频'},
            {title: '求助'},
            {title: '投票'},
        ];


        return (
            <Provider>
            <Tabs tabs={tabs}
                  tabBarBackgroundColor='#fff'
                  tabBarActiveTextColor='#1598cc'
                  tabBarInactiveTextColor='#414445'
                  tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                  tabBarTextStyle={{fontSize: 14}}
            >
                <ScrollView>
                    <View style={style.content}>
                        <ImageList navigation={this.props.navigation}>Content of First Tab</ImageList>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <VideoList navigation={this.props.navigation}>Content of Second Tab</VideoList>
                        <VideoList navigation={this.props.navigation}>Content of Second Tab</VideoList>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <Address navigation={this.props.navigation}>Content of Third Tab</Address>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <VoteItem navigation={this.props.navigation}>Content of four Tab</VoteItem>
                    </View>
                </ScrollView>
            </Tabs>
            </Provider>
        )
    }
}


export default Community



const style = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})
