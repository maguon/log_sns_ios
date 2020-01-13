import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Tabs, WhiteSpace, WingBlank} from "@ant-design/react-native"
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import ImageList from '../modules/ImageList'
import Address from '../modules/Address'
import Vote from '../modules/Vote'

class Article extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tabs = [
            {title: '所有'},
            {title: '文章'},
            {title: '视频'},
            {title: '图片'},
            {title: '求助'},
        ];

        return (

            <Tabs tabs={tabs}
                  tabBarBackgroundColor='#fff'
                  tabBarActiveTextColor='#1598cc'
                  tabBarInactiveTextColor='#414445'
                  tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                  tabBarTextStyle={{fontSize: 14}}
            >
                <ScrollView>
                    <View style={style.content}>
                        <Video>Content of First Tab</Video>
                        <Address>Content of First Tab</Address>
                        <ImageList>Content of four Tab</ImageList>
                        <ImageList>Content of four Tab</ImageList>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <Vote>Content of Second Tab</Vote>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <Video>Content of Third Tab</Video>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <ImageList>Content of four Tab</ImageList>
                    </View>
                </ScrollView>
                <ScrollView>
                    <View style={style.content}>
                        <VideoList>Content of five Tab</VideoList>
                    </View>
                </ScrollView>
            </Tabs>


        )
    }

}

export default Article

const style = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})



