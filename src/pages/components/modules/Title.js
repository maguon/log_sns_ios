import React from 'react';
import {ScrollView, Text, View, Dimensions} from 'react-native';
import {Tabs} from '@ant-design/react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Title = props => {
    const {navigation: {state: {routeName}}} = props
    const tabs = [
        {title: '热门'},
        {title: '关注'},
        {title: '附近'},
    ];
    const style = {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff',
    };
    const {width} = Dimensions.get('window')

    return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: width * 0.2, alignItems: 'center'}}>
                <EvilIcons name='camera' size={35} style={{color: '#fff'}}/>
            </View>

            {routeName == 'Home' && <View style={{width: width * 0.6, height: 45, alignItems: 'center', backgroundColor: '#1598cc'}}>
                <Tabs tabs={tabs}
                      tabBarBackgroundColor='#1598cc'
                      tabBarActiveTextColor='#fff'
                      tabBarInactiveTextColor='#fff'
                      tabBarUnderlineStyle={{backgroundColor: '#fff', borderBottomColor: 'red'}}
                      tabBarTextStyle={{fontSize: 16, fontWeight: 'bold'}}
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
                </Tabs>
            </View>}
            {routeName != 'Home' && <View style={{width: width * 0.6, alignItems: 'center', backgroundColor: '#1598cc'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>社区</Text>
            </View>}

            <View style={{width: width * 0.2, alignItems: 'center'}}>
                <AntDesign name='plus' size={25} style={{color: '#fff'}}/>
            </View>
        </View>
    )
}
export default Title
