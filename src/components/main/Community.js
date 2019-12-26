import React from 'react'
import { View, Text } from 'react-native'
import {Tabs} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'

const Community = props => {
    const tabs = [
        {title: '最近发布'},
        {title: '视频'},
        {title: '求助'},
        {title: '投票'},
    ];
    const style = {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff',
    };


    return (
                <Tabs tabs={tabs}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize:14}}
                >
                    <View style={style}>
                        <Text>Content of First Tab</Text>
                    </View>
                    <View style={style}>
                        <Text>Content of Second Tab</Text>
                    </View>
                    <View style={style}>
                        <Text>Content of Third Tab</Text>
                    </View>
                    <View style={style}>
                        <Text>Content of four Tab</Text>
                    </View>
                </Tabs>

    )
}

export default Community
